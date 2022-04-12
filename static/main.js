

// page enter
$(function(){
  $(document).scroll(function(event){
    
  });

  console.log("hello world");
  // get the container that holds the exhibits
  let body = $("#exbs");

  // get exhibits.json
  let exbs = $.get("static/exhibits.json", function(data){
    console.log(data);
    // create exhibits
    for (_exb in data){
      let exb = load_exb(data[_exb]);
      body.append(exb);
    }
  });

  let links = $(".interactive");
  links.attr("target", "_blank");
  links.attr("rel", "noopener noreferrer")


});
