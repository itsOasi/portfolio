// page enter
$(function(){
  console.log("hello world");
  // get the container that holds the exhibits
  // load the exhibit based on the url
  load_exhibit(document.location.pathname.slice(1));
});
