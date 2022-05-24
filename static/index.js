// page enter
$(function(){
  console.log("hello world");
  // get the container that holds the exhibits
  // load the exhibit based on the url
  let url = document.location.pathname.slice(1)
  if (url == ""){
    url = "home"
  }
  load_exhibit("static/exhibits/"+url, $("#exb"));

});
