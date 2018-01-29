// Hide app features when user is logged out.
$(".loggedin-content").hide();

// Show start screen when user is logged out.
$("#start-screen").show();

// Hide logout button when user is logged out.
$("#logout-btn").hide();

// Add disclaimer to Recipe box that user needs to be logged in to use this feature.
$("#disclaimer").show();

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCOVL51USj4HE7VfyPOI21R3uZT8yTa10c",
	authDomain: "longshotauth.firebaseapp.com",
	databaseURL: "https://longshotauth.firebaseio.com",
	projectId: "longshotauth",
	storageBucket: "",
	messagingSenderId: "783961136211"
};

firebase.initializeApp(config);

//Create variable to reference firebase database.
var database = firebase.database();

// ========================================================
//Define variables. Construct query URL to get recipe data.
// ========================================================
var queryURLbase = "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&from=0&to=9&q=";

var userInput;
var from=0;
var to=9;

var imgAPI;
var label;
var recipe;
var sourceLink;
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
var userId;
var newNote;
var key;
var recipeKeyNote;
var queryURLbase5;


// ===========================================================================
// This AJAX method performs a GET request to the queryURL to get recipe data.
// After the data comes back, search results are displayed on cards.
// ===========================================================================
function testAjax(queryURL) {
	fetch(queryURL)
	.then((resp) => resp.json())
	.then(function (data) {
		//console.log(queryURL);
		for (var i = 0; i < 9; i++) {

			//create recipe card.
			var card = $("<div>");
			card.addClass("card col s4");

			var cardImg = $("<div>");
			cardImg.addClass("card-image recipe-image");

			//Create variable for recipe image and append to card.
			var img = $("<img>");
			imgAPI = data.hits[i].recipe.image;
			img.attr("src", imgAPI);
			cardImg.append(img);
			card.append(cardImg);

			var cardContent = $("<div>");
			cardContent.addClass("card-content");

			//Variable for the recipe title/label.
			var spanTitle = $("<span>");
			spanTitle.addClass("card-title");
			label = data.hits[i].recipe.label;
			spanTitle.text(label);
			//This appends the recipe title/label to the recipe image.
			cardImg.append(spanTitle);

			var pRecipe = $("<p>");
			for (var j = 0; j < 20; j++) {
				var recipeUgly = data.hits[i].recipe.ingredientLines[j];
				var newIng = $("<p>");
				newIng.text(recipeUgly)
				pRecipe.append(newIng);
			};
			cardImg.after(cardContent);

			// Use Materialize css card reveal feature to reveal ingredients upon button click.
			// Add the class activator to an element inside the card to allow it to open the card reveal.
			img.addClass("activator");
		
			// Create span element to hold the button that opens the card reveal.
			activateIngredients = $("<span>");
		
			// Add the class activator and add "Ingredients" text.
			activateIngredients.addClass("card-title activator").text("Ingredients");
		
			// Create button that will open the card reveal and show the ingredients.
			revealIngredientsIcon = $("<i>");
		
			// Add data attributes to display tooltip text. data-position=top shows tooltip text above button.
			// data-tooltip is the tooltip text that appears when user hovers over button.
			revealIngredientsIcon.addClass("material-icons right tooltipped").text("more_vert").attr("data-position", "top").attr("data-tooltip", "Click to view ingredients.");
		
			// Initialize tooltip for show Ingredients button.
			$('.tooltipped').tooltip({ delay: 30 });
			activateIngredients.append(revealIngredientsIcon);
		
			// Append the card reveal button to the card.
			cardContent.append(activateIngredients);
		
			// Create div for card reveal.
			var cardReveal = $("<div>");
			cardReveal.addClass("card-reveal");
		
			// Create title for card reveal.
			var cardRevealTitle = $("<span>");
			cardRevealTitle.addClass("card-title").text("Ingredients");
		
			// Create icon that allows users to close card reveal and return to cardContent.
			var closeRevealIcon = $("<i>");
			closeRevealIcon.addClass("material-icons right").text("close");
			cardRevealTitle.append(closeRevealIcon);
		
			// Append the title of card reveal to card reveal div.
			cardReveal.append(cardRevealTitle);
		
			// Append the card reveal div to the card.
			card.append(cardReveal);
		
			// Append the ingredients to the card reveal.
			cardReveal.append(pRecipe);


			var cardAction = $("<div>");
			cardAction.addClass("card-action");

			// Dynamically create external recipe link and open the link in a new tab.
			var link = $("<a>");
			link.text("More info");
			sourceLink = data.hits[i].recipe.url;
			link.attr("href", sourceLink);
			// Adding attribute to link so that recipe link opens in a new tab window.
			link.attr("target", "_blank");

			// Dynamically create button for saving recipes to recipe box.
			var saveBtn = $("<i>");
			saveBtn.addClass("small fa fa-cutlery tooltipped");

			// Add data attributes to display tooltip text. data-position=top shows tooltip text above button.
			// data-tooltip is the tooltip text that appears when user hovers over button.
			saveBtn.attr("data-name", [i]).attr("data-position", "top").attr("data-tooltip", "Click to save recipe to Recipe box.");
			
			// Initialize tooltip for save recipe button.
			$('.tooltipped').tooltip({ delay: 30 });

			cardAction.append(link, saveBtn);
			cardContent.after(cardAction);
			$("#recipe-list").append(card);

			// When the save recipe button is clicked...
			saveBtn.on("click", function (e) {
				// Display toast message that indicates recipe was added to Recipe box successfully.
				Materialize.toast('Recipe added to Recipe box.', 3000, 'rounded'); // 3000 is the duration of the toast
				var name = $(e.target).data("name");
				var newRecipe = {
					name: data.hits[name].recipe.label,
					ingredients: data.hits[name].recipe.ingredientLines,
					link: data.hits[name].recipe.url,
					img: data.hits[name].recipe.image,
					notes: {}
				};
				database.ref('/users/' + uid).push(newRecipe);
				console.log("label : " + newRecipe.name + " recipe : " + newRecipe.ingredients + " sourceLink : " + newRecipe.link);
			});
		};
	});
};


// =========================
// Find button functionality
// =========================
$("#submit").on("click", function (e) {

	// Prevent form from submitting
	e.preventDefault();

	//Grab the user input from the main word search text box.
	userInput = $("#user-input").val().trim().toLowerCase();

	// Integrate user input into our ajax request
	var searchURL = queryURLbase + userInput;
	testAjax(searchURL);

	// Clear previous search
	$("#recipe-list").empty();

	// Reset the display of the load more button to its initial state
	$("#load-more").css("display","initial");
});

// ================================
// "Load More" button functionality
// ================================
$("#load-more").on("click", function (e) {

	// Prevent form from submitting
	e.preventDefault();

	//Grab the user input from the main word search text box.
	from+=10;
	to+=10;

	// URL restatement
	var queryURLbase2= "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&q="
	var queryURLbase3 = queryURLbase2+userInput;
	var queryURLbase4= queryURLbase3+"&from="+from;
	queryURLbase5 = queryURLbase4 +"&to="+to;
	testAjax(queryURLbase5);
});


// ===========================================
//Function detects authentication state change
// ===========================================
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {

		//Trigger modal
		$(".modal").modal();

		//Open logged in confirmation screen.
		$("#login-confirm-modal").modal("open");
		
		//Show app features when user is logged in.
		$(".loggedin-content").show();

		//Hide start screen bg image when user logged in.
		$(".bg").css('background-image', 'none');
		
		//Hide start screen when user is logged in.
		$("#start-screen").hide();
		$("#logout-btn").show();
		$("#login-btn").hide();
		$("#signup-btn").hide();
		$("#open-login-btn").hide();

		//Close login screen
		$("#login-modal").modal('close');

		//Show member info
		$("#member-info").show();

		//Hide disclaimer in Recipe box that user needs to be logged in to use this feature.
		$("#disclaimer").hide();

		//Empty out login form fields and get rid of error message.
		$("#email-input").val("");
		$("#password-input").val("");
		$("#error").empty()

		if (user != null) {
			var email_id = user.email;
			$("#member-info").text("User: " + email_id);
			email = user.email;
			photoUrl = user.photoURL;
			emailVerified = user.emailVerified;
			uid = user.uid;

			//Add saved recipe to recipe box modal.
			database.ref('/users/' + uid).on("child_added", function (childSnapshot) {

				var name = childSnapshot.val().name;
				var ingredients = childSnapshot.val().ingredients;
				var link = childSnapshot.val().link;
				var img = childSnapshot.val().img;
				key = childSnapshot.key;
				var notes = childSnapshot.val().notes;

				var newList = $("<p>");
				newList.attr("id", key);
				var newSpan = $("<span>");
				var linkA = $("<a>");
				linkA.text(name);
				linkA.attr("href", link);
				linkA.addClass("recipe-box-link");

				//Add attribute to recipe box link to open external recipe link in a new tab window.
				linkA.attr("target", "_blank");

				//Create trash (remove) and pencil (add notes) icons for recipe box.
				var trash = $("<i>");
				var pencil = $("<i>");
				newSpan.addClass("activator");
				trash.attr("aria-hidden", true).attr("data-position", "top");
				trash.addClass("fa fa-trash remove");
				trash.attr("data-key", key);
				
				//Add data-target with id of the remove recipe modal to trigger confirmation dialog.
				trash.attr("data-target", "removeRecipeModal");

				//Add data attributes to display tooltip text. "data-position=top" shows tooltip text above button.
				//Data-tooltip is the tooltip text that appears when user hovers over button.
				pencil.attr("aria-hidden", true).attr("data-position", "top").attr("data-tooltip", "Click to add notes to recipe.").attr("href", "#notes-modal");
				
				// Add key to pencil for note updates
				pencil.attr("data-key", key);
				pencil.addClass("fa fa-pencil tooltipped modal-trigger pencil");
				newList.append(newSpan);
				newSpan.append(linkA, trash, pencil);
				$("#recipeBox").append(newList);

				// =======================================================
				// On-click event on trash icon removes data from Firebase
				// =======================================================
				trash.on("click", function (e) {
					var recipeKey = $(e.target).data("key");
					console.log("working");
					var updates = {};
					var removeData = {};
					updates[recipeKey] = removeData;
					return database.ref('/users/' + uid).update(updates);
				});


				// =====================================================================================
				// Clicking the pencil icon dynamically creates our notes modal design and functionality
				// =====================================================================================
				pencil.on("click", function (e) {
	
					// Remove the previous created modal content
					$(".pencilRm").remove();
					recipeKey = $(e.target).data("key");

					// Create modal content
					var notesModal = $("<div>").addClass("modal").attr("id", key);
					var modalContent = $("<div>").addClass("modal-content pencilRm").attr("data-key", key);
					var notesHeader = $("<h4>").text(name);
					var notesInput = $("<div>").addClass("input-field recipe-notes").attr("data-key", key);
					var inputField = $("<input>").attr("id", "notes-input").attr("type", "text").attr("placeholder", "Add some notes...").val(notes);
					
					// Create a save button to save notes
					var saveNotesBtn = $("<button>").text("Save");
					saveNotesBtn.addClass("btn waves-effect waves-light modal-trigger noteSave").attr("href", "#notes-modal").attr("data-key", key).attr("type", "submit");

					// Create a delete button
					var deleteNotesBtn = $("<button>").text("Delete");
					deleteNotesBtn.addClass("btn waves-effect waves-light modal-trigger notesSave ").attr("href", "#notes-modal").attr("data-key", key).attr("type", "submit");

					// Add all ingredients and mix until thick and frothy
					notesInput.append(notesHeader, inputField, saveNotesBtn, deleteNotesBtn);
					modalContent.append(notesInput);
					$("#notes-modal").append(modalContent);
					$("main").after(notesModal);
					
					// ==================================
					// On-click event for the save button
					// ==================================
					saveNotesBtn.on("click", function (e) {
						notesKey = $(e.target).data("key");
						var notesFind = notesInput.data("key");
						console.log("notesKey " + notesKey + " notesFind " + notesFind);
						if (notesKey === notesFind) {
							var notesValue = inputField.val();
							var updates = {};
							var addNotes = {
								name: name,
								ingredients: ingredients,
								link: link,
								img: img,
								notes: notesValue
							};
	
							notesHeader.text(addNotes.name);
							updates[recipeKey] = addNotes;
							return database.ref('/users/' + uid).update(updates);
						};
					});
					deleteNotesBtn.on("click", function (e) {
						notesKey = $(e.target).data("key");
						var notesFind = notesInput.data("key");
						console.log("notesKey " + notesKey + " notesFind " + notesFind);
						if (notesKey === notesFind) {
							//console.log("notes button working");
							var notesValue = inputField.val("");
							console.log("var notesValue: " + notesValue);
							var updates = {};
							var delNotes = {
								name: name,
								ingredients: ingredients,
								link: link,
								img: img,
								notes: null
							};
							updates[recipeKey] = delNotes;
							notesHeader.text("Write a note about this recipe")
							//notesValue = false;
							return database.ref('/users/' + uid).update(updates);
						};
					});
				});
			});
		} 
		else {
			// No user is signed in.
			$("#logout-btn").hide();
			$("#login-btn").show();
			$("#signup-btn").show();
			$("#open-login-btn").show();
		};
	};
});

// ========================================
// On-click event triggers sign-up function
// ========================================
function signUp() {
	var userEmail = $("#email-input").val().trim();
	var userPass = $("#password-input").val().trim();
	firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
		//Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		  $('#error').html(errorMessage);
	});
};

// ========================================
// On-click event triggers log-out function
// ========================================
function logOut() {
  firebase.auth().signOut();

  // Trigger modal
  $(".modal").modal();

  // Open logged out confirmation modal
  $("logout-confirm-modal").modal('open');

  // Hide app features when user is logged out.
  $(".loggedin-content").hide();
  
  // Show start screen when user is logged out.
  $("#start-screen").show();
 
  // Hide logout button.
  $("#logout-btn").hide();
 
  // Show login button on start screen.
  $("#open-login-btn").show();
 
  // Show log in button and sign up button in login screen.
  $("#login-btn").show();
  $("#signup-btn").show();
 
  // Remove items in recipe box.
  $("#recipeBox").empty();
 
  // Add disclaimer to Recipe box that user needs to be logged in to use this feature.
  $("#disclaimer").show();
 
  // Remove member info from navbar
  $("#member-info").hide();
 
  // When user logs out, clear any existing search results.
  $("#recipe1").empty();
  $("#recipe2").empty();
  $("#recipe3").empty();

  //Hide load more button
  $("#load-more").hide();

  //Add app bg image back in on logout
  $(".bg").css('background-image', 'url("../public/assets/images/login-bg.png")');
};

// ===================================
// On-click event for sign-in function
// ===================================
function login() {
	var userEmail = $("#email-input").val().trim();
	var userPass = $("#password-input").val().trim();
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
		//Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		$('#error').html(errorMessage);

	});
};

// =======================================
// Trigger bottom sheet to open recipe box
// =======================================
$(document).ready(function () {
	// The "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
});

// ==========================================
// Remove recipe from HTML in user recipe box
// ==========================================
$(document).on("click", ".remove", function (e) {
	var key = $(e.target).data("key");
	var list = document.getElementById(key);
	list.remove();
});

// ========================================================
// When Help link in the Footer is clicked, open help page.
// ========================================================
$("#help-link").on("click", function () {
	$("#help-modal").modal('open');
});

// ==========================================================
// When About link in the Footer is clicked, open about page.
// ==========================================================
$("#about-link").on("click", function () {
	$("#about-modal").modal('open');
});
