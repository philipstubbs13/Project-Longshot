// Initialize Firebase
 var config = {
	 apiKey: "AIzaSyCC1t5np8kPEV2yC0heaC4z0l6JtYNEMhY",
	 authDomain: "projectlongshot-469ee.firebaseapp.com",
	 databaseURL: "https://projectlongshot-469ee.firebaseio.com",
	 projectId: "projectlongshot-469ee",
	 storageBucket: "",
	 messagingSenderId: "333236357647"
 };

firebase.initializeApp(config);
database = firebase.database();

var queryURLbase = "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&from=0&to9&q=";
var userInput;

var imgAPI;
var label;
var recipe;
var sourceLink;

function testAjax(queryURL) {
   $.ajax({
       url: queryURL,
       method: 'GET'
   }).done(function(data) {
       console.log(data);
       // console.log(queryURL);
       for(var i = 0; i < 9; i++){

			var card = $("<div>");
			card.addClass("card");

			var cardImg =$("<div>");
			cardImg.addClass("card-image");

			var img = $("<img>");
			imgAPI = data.hits[i].recipe.image;
			img.attr("src", imgAPI);
			cardImg.append(img);
			card.append(cardImg);

			var cardContent = $("<div>");
			cardContent.addClass("card-content");

			var spanTitle = $("<span>");
			spanTitle.addClass("card-title");
			label = data.hits[i].recipe.label;
			spanTitle.text(label);

			var pRecipe = $("<p>");
			recipe =data.hits[i].recipe.ingredients[0].text;
			// console.log(recipe);
			pRecipe.text(recipe);
			cardContent.append(spanTitle, pRecipe);
			cardImg.after(cardContent);

			var cardAction = $("<div>");
			cardAction.addClass("card-action");

			var link = $("<a>");
			link.text("Link to recipe");
			sourceLink = data.hits[i].recipe.url;
			link.attr("href", sourceLink);

			var saveBtn = $("<button>");
			saveBtn.addClass("btn btn-default save");
			saveBtn.attr("data-name", [i]);

			cardAction.append(link, saveBtn);
			cardContent.after(cardAction);
			$("#recipe1").append(card);

			var n = $(".card-image").length;
			// console.log(n);
			if(n > 3) {
				$("#recipe2").append(card);
			};

			if(n > 6) {
				$("#recipe3").append(card);
			};

		};
	});
};

$("#submit").on("click",function(e){
	e.preventDefault();
	// $("#recipe-list").empty();
   userInput = $("#user-input").val().trim().toLowerCase();
   var searchURL = queryURLbase + userInput;
   console.log(userInput);
   testAjax(searchURL);

});


//Click event for sign in.
$("#authentication-btn").on("click", function() {
	console.log("Sign in button clicked");
});


//Initialize slide out menu
$('#saved-recipes').sideNav({
  menuWidth: 300,
  edge: 'left',
  closeOnClick: true
});

//Trigger bottom sheet to open recipe box.
$(document).ready(function(){
    $('.modal').modal();
});

$(document).on("click",".save",function(e) {

	name = $(e.target).data("name");
	userInput = $("#user-input").val().trim().toLowerCase();
	var searchURL = queryURLbase + userInput;
	console.log(userInput);
	saveRecipe(searchURL);

	console.log("name : "+name);
});

var name;
function saveRecipe(queryURL) {
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(data) {
		console.log(data);
		console.log(queryURL);

		imgAPI = data.hits[name].recipe.image;
		label = data.hits[name].recipe.label;
		recipe =data.hits[name].recipe.ingredients[0].text;
		sourceLink = data.hits[name].recipe.url;
		imgAPI = data.hits[name].recipe.image;

		var newRecipe = {
			name:label,
			ingredients: recipe,
			link: sourceLink,
			img: imgAPI
		};

		database.ref().push(newRecipe);
		console.log("label : "+ label + " recipe : "+ recipe + " sourceLink : "+ sourceLink);

	});

};
database.ref().on("child_added", function(childSnapshot) {

	var name = childSnapshot.val().name;
	var ingredients = childSnapshot.val().ingredients;
	var link = childSnapshot.val().link;
	var img = childSnapshot.val().img;
	var key = childSnapshot.key;
	console.log("link " + link);

	var newList = $("<li>");
	newList.attr("id",key);

	var newSpan = $("<span>");
	var linkA = $("<a>");
	linkA.text(name);
	linkA.attr("href",link);

	var trash = $("<i>");
	var pencil = $("<i>");
	trash.attr("aria-hidden",true);
	trash.addClass("fa fa-trash remove");
	trash.attr("data-key",key);
	pencil.attr("aria-hidden",true);
	pencil.addClass("fa fa-pencil");
	newList.append(newSpan);
	newSpan.append(linkA,trash,pencil);
	$("#recipeBox").append(newList);

});

$(document).on("click",".remove",function(e) {
	var key = $(e.target).data("key");
	var list =  document.getElementById(key);
	list.remove();
	console.log(key);
	var updates ={};
	var removeData ={};

	database.ref().on("child_added",function(snapshot) {
		var snap = snapshot.key;
		console.log(snap);
		if (key == snap){
			console.log("working");
			updates[snap]=removeData;
			return database.ref().update(updates);
		};
	});

});
