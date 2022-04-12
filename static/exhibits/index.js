$(function(){
    $("#footerlinks").show(100);
    setTimeout(()=>{$("#footerlinks").hide(500);}, 3000);
    $.post(location.href, {type:"is_logged"}, function(data){
        if (data["is_logged"]){
            $("#feed").show();
            $("#createpost").show();
            $.post(
                location.href,
                {type:"has_skills"},
                function(data){
                    if (data["has_skills"] == true){
                        $.post(location.href, {type:"send_projects", use_skills:true, get_boosted:true}, function(data){sort_posts(data, $("#boosted_feed"), false);});
                        $.post(location.href, {type:"send_projects", use_skills:true}, function(data){sort_posts(data, $("#main_feed"), false);});
                    }else{
                        $("#update_skills").show();
                        $.post(location.href, {type:"send_projects", get_boosted:true}, function(data){sort_posts(data, $("#boosted_feed"), false);});
                        $.post(location.href, {type:"send_projects"}, function(data){sort_posts(data, $("#main_feed"), false);});
                    }
                    setTimeout(() => {$("#global").show();popup_load(location.href+"/user");}, 3000);
                    $.post(location.href, {type:"send_user_projects", role:"created"}, function(data){sort_posts(data, $("#created"), "created");});
                    $.post(location.href, {type:"send_user_projects", role:"accepted"}, function(data){sort_posts(data, $("#accepted"), "accepted");});    
                    $("#infobody").hide();
                    show_note("Welcome back! It's great to see you again 😊")
                }
                );
            }else{
                $("#header").hide();
                $("#landing").load(location.href+"/welcome");
                $("#landing").show();
            }
            $("#loading").hide();
        });
        
        $(".feed_switch").hover(function(){
            console.log("hovering over feed switch");
            if($("#global").is(":visible")){
                show_note("View projects you created or accepted👻")
                $.post(location.href, {type:"send_user_projects", role:"created"}, function(data){sort_posts(data, $("#created"), "created");});
                $.post(location.href, {type:"send_user_projects", role:"accepted"}, function(data){sort_posts(data, $("#accepted"), "accepted");});    
            }
            if($("#user").is(":visible")){
                show_note("Find projects tailored to your skills👻")
                $.post(location.href, {type:"send_projects", use_skills:true, get_boosted:true}, function(data){sort_posts(data, $("#boosted_feed"), false);});
                $.post(location.href, {type:"send_projects", use_skills:true}, function(data){sort_posts(data, $("#main_feed"), false);});
            }
        });

        $(".feed_switch").click(function(){
            $("#feed_switch").toggle();
            $("#global").toggle(200);
            $("#user").toggle(200);
        });
        

    function sort_posts(jobs, _obj,feed_type){
        let obj = _obj
        for (let j in jobs){
            let post = $("<div class='post' hidden></div>").load("static/post.html", function(){
                $(this).find("#title").prepend(jobs[j]["title"]);
                $(this).find("#desc").text(jobs[j]["desc"]);
                $(this).find("#price").append(jobs[j]["price"]);
                $(this).find("#tags").text(jobs[j]["tags"]);
                $(this).find("#status").text(jobs[j]["status"]);
                $(this).find("#email").text(jobs[j]["email"]);
                $(this).find(".accept_project").click(function(){
                    popup_load(location.href+"acceptpost/"+jobs[j]["key"]);
                });
                switch (feed_type){
                    case "created":
                        $(this).find("#status_body").show();
                        $(this).find(".accept_project").hide();
                        if (jobs[j]["status"] == "submitted"){
                            let pay_button = $(this).find("#pay_for_project")
                            pay_button.show();
                            pay_button.click(function(){
                                popup_load(location.href+"payment/"+jobs[j]["key"]);
                            });
                        }
                        break;
                    case "accepted":
                        $(this).find("#status_body").show();
                        $(this).find(".accept_project").hide();
                        let upload_button = $(this).find("#upload_project");
                        upload_button.show();
                        upload_button.click(function(){
                            popup_load(location.href+"submitproject/"+jobs[j]["key"]);
                        });
                        break;
                    default:
                        break;
                }
                if (jobs[j]["email"] == "ghostpenorg@gmail.com"){
                    $(this).find("#official").show();
                }else{
                    $(this).find("#official").hide(); 
                }
                $("#official").click(function(event){
                    show_info("<p>This is a GhostPen official project!</p><p>These projects usually offer more earning potential💰</p>", event);
                });
                $("#boosted").click(function(event){
                    show_info("<p>This is a boosted project!</p><p>They appear at the top of your feed</p>", event);
                });
                if("boosted" in jobs[j] && jobs[j]["boosted"] == true){
                    $(this).find("#boosted").show();
                }
                if (jobs[j]["status"] == "paid"){
                    $(this).find("#feedback").show();
                }
                $(this).find(".rate").click(function(){
                    $.post(location.href, {type:"rate_user", key:jobs[j]['key'], rating:$("input[name='rating']:checked").val(), details:$("#details").val()});
                    show_note("Thank you for your feedback!", true);
                });
            }).mouseenter(function(){$(this).find("#desc_body").show(300);}).mouseleave(function(){$(this).find("#desc_body").hide(100);});
            obj.append(post);
            post.show(300)
        }

    };
});