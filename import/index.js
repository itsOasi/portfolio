// page enter
$(function(){
  console.log("hello world");
  
  // get the url
  let url = document.location.pathname.slice(1)

  // if no url, load the home page
  if (url == ""){
    url = "home"
  }

  // load the exhibit corresponding to the url
  exhibit.load("static/import/exhibits/"+url, $("#exb"));
  // make sure your exhibit names ^^^ match the url names

});
