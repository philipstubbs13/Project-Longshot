//Define variables
//Create variable to hold user input. This is the search term the user enters in the main recipe search field.
var userInput = "";

//Initialize Firebase here.

//Create database variable to create reference to firebase.database().
	//var database = firebase.database();


//Click event for find/submit button for main recipe search field.
$("#submit").on("click", function() {
	//Prevent form from submitting itself.
	event.preventDefault();

	//Grab the search term that the user enters in the main recipe search field.
	userInput = $("#user-input").val().trim().toLowerCase();
	//print userInput value to console for debugging purposes.
	console.log("User's recipe search term: " + userInput);

	//Construct our query URL here to access and obtain data from the EDAMAM API.
	//var appID = "";
	//var appKey = "";
	//var queryURL = ""
	
	//Our jQuery AJAX method. Perform AJAX GET request to the queryURL to get data from the EDAMAM API.
   	//$.ajax({
        //url: queryURL,
        //method: "GET"
      //})

      //After the data from the AJAX request comes back.
      //.done(function(response) {
      	//log the API response to the console for debugging purposes.
      	//console.log(response);
      	//create variable to hold response data
      	//var results = ;
    //});

})


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