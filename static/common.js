function load_exb(_exb){
    // create exhibit container
    let exb = $("<div class='exb'></div>");
    exb.css("background-color", _exb["bg_color"]);
    exb.css("color", _exb["txt_color"]);

    // get exhibit title
    let title = $("<div id='title'></div>")
    let _title = $("<img>").attr("src", _exb["folder"]+"/"+_exb["title"]);
    title.append(_title);

    // create body div
    let body = $("<div class='exb_body'>");

    // get description
    let desc = $("<p class='desc'></p>").text(_exb["desc"]);
    
    // get media
    let media = $("<div class='media'></div>");
    for (m in _exb["media"]){
        let img = $("<img>").attr("src", _exb["folder"]+"/"+_exb["media"][m]);
        media.append(img);
    }
    // track whether the exhibit is in focus
    let tracker = $("<hr class='tracker'>");
    tracker.scroll(function(event){
        if (this.offset().top < screenY * .9 && this.offset().top > screenY * .6){
            console.log("in view");
        }
    });
    // put it all together
    exb.append(title);
    body.append(desc);
    body.append("<hr>");
    body.append(media);
    exb.append(body);
    return exb;
}

function change_exhibits(exhibits, index){
    let i = 0;
    for (exb in exhibits){
        if (i == index){
            exb.show(300);
        }
        else{
            exb.hide(300)
        }
        i++
    }
}