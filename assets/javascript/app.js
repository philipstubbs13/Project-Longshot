//Define variables

//Initialize Firebase here.

//Create database variable to create reference to firebase.database().
	//var database = firebase.database();


//Click event for find/submit button.
$("#submit").on("click", function() {
	//Prevent form from submitting
	event.preventDefault();
	console.log("Submit button clicked");
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