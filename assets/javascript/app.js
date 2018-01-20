var queryURLbase = "https://api.edamam.com/search?&app_id=efd1d3e6&app_key=07c695393fe37a410def005f964d5e50&from=0&to9&q=";
var userInput;


function testAjax(queryURL) {
   $.ajax({
       url: queryURL,
       method: 'GET'
   }).done(function(data) {
       console.log(data);
       console.log(queryURL);
       for(var i = 0; i<9; i++){
var card = $("<div>");
card.addClass("card");
var cardImg =$("<div>");
cardImg.addClass("card-image");
var img = $("<img>");
img.attr("src",data.hits[i].recipe.image);
cardImg.append(img);
card.append(cardImg);
var cardContent = $("<div>");
cardContent.addClass("card-content");
var spanTitle = $("<span>");
spanTitle.addClass("card-title");
spanTitle.text(data.hits[i].recipe.label);
var pRecipe = $("<p>");
var recipe =data.hits[i].recipe.ingredients[0].text;
console.log(recipe);
pRecipe.text(recipe);
cardContent.append(spanTitle,pRecipe);
cardImg.after(cardContent);
var cardAction = $("<div>");
cardAction.addClass("card-action");
var link = $("<a>");
link.text("Link to recipe");
link.attr("href",data.hits[i].recipe.url);
cardAction.append(link);
cardContent.after(cardAction);
$("#recipe1").append(card);
var n = $(".card-image").length;
console.log(n);
if(n>3){
	$("#recipe2").append(card);
}
if(n>6){
	$("#recipe3").append(card);
}
}

})
}

$("#submit").on("click",function(e){
	e.preventDefault();
   userInput = $("#user-input").val().trim().toLowerCase();
   var searchURL = queryURLbase + userInput;
   console.log(userInput);
   testAjax(searchURL);

});


//Click event for sign in.
$("#authentication-btn").on("click", function() {
	console.log ("Sign in button clicked");
})


//Initialize slide out menu
$('#saved-recipes').sideNav({
  menuWidth: 300,
  edge: 'left',
  closeOnClick: true
}
);
