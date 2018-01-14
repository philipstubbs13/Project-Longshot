//Define variables
//Variable to hold user's answer/input.
var userAnswer = "";

// Initialize Firebase here.

//Create database variable to create reference to firebase.database().
	//var database = firebase.database();


//Click event for start game button
$("#start-btn").on("click", function() {
	console.log("Start button clicked");
})


//Click event for sign in.
$("#authentication-btn").on("click", function() {
	console.log ("Sign in button clicked");
})


//Click event for submit answer button.
$("#submit-btn").on("click", function() {
	console.log("Answer submitted");

	//Prevent form from submitting
	event.preventDefault();

	//Grab user's answer from text field.
	userAnswer = $("#color-input").val().trim();
	console.log(userAnswer);

})