$(".open_nav").click(function(){
    if ($("#nav").css("display") == "none"){
        $("#nav").slideToggle(200);
        $("#nav").css("display", "flex");
        $("#nav").css("flex-direction", "column");
    }else{
        $("#nav").slideToggle(200);
    }
});

$(".close_nav").not("#footer").click(function(){
    $("#nav").slideUp(200);
})