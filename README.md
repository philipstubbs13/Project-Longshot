# Recipe Search App
<p>Are you having guests over for dinner tonight and don't know what to make? Are you tired of having the same meals over and over and want to try something new?</p>
<p>The recipe search app is a search engine that returns the most relevant recipes from the most popular sites on the web.</p>
<p>With this app, you can</p>
  <ul>
    <li>Search for recipes from one of the largest recipe databases.</li>
    <li>Find out what ingredients you need to make a recipe.</li>
    <li>Favorite a recipe so that you can view it later.</li>
    <li>Unfavorite a recipe.</li>
    <li>Add your own personal notes to a recipe.</li>
  </ul>
</p>

## Table of contents
  * [About this project](#about-this-project)
  * [Live](#live)
  * [Structure of the project](#structure-of-project)
  * [Screenshots](#screenshots)
  * [Technologies used to create app](#technologies-used)
  * [How to use the Firebase API](#firebase-api)
  * [How to use the app](#how-to-use-app)
  	* [Entering or calculating train information](#train-info)
  	* [Adding a train to the schedule](#add-train)
  * [Form input validation](#form-validation)
  * [Future code development](#feature-enhancements)
  * [Known issues](#known-issues)
  * [Icons](#icons)
  * [Feedback](#feedback)
  * [How to contribute to this project](#contribute)

## <a name="about-this-project"></a> About this project
This app uses the Edamam Recipe Search API to return the most relevant recipes from the most popular sites on the web.

## <a name="live"></a> Live
<p>App is available live through Firebase:</p>

## <a name="contributors"></a> Contributors
<li>Back end developer: Jon Moore</li>
<li>Back end developer: Ida Jensen</li>
<li>Front end developer: Maiyer Thao</li>
<li>Front end developer/Project Manager: Phil Stubbs</li>

## <a name="structure-of-project"></a> Structure of the project
<p>The GitHub repository for this project is structured as follows:</p>
<ul>
	<li> <b>/public/assets/javascript</b>: This directory contains the Javascript to:
		<ul>
			<li>Initialize the Firebase database.</li>
			<li>Grab the user input from the search field when a user starts a recipe search.</li> 
      <li>Perform a jQuery AJAX GET request to retrieve the relevant recipe data using the Edamam API, including the recipe name, the list of ingredients, an external link to more information, and an image of the recipe.</li>
      <li>Display the recipe data in the search results section after the AJAX request is complete.</li>
      <li>Save recipes so that they can be viewed later.</li>
      <li>Remove saved recipes.</li>
      <li>Add notes to recipes.</li>
      <li>Trigger modals that are used in the app.</li>
		</ul>
	</li>
	<li><b>/public/assets/css</b>: This directory contains the external stylesheet used for the app. Materialize is the css framework used for this project. </li>
	<li><b>/public/index.html</b>: This file contains the code for the HTML and Materialize css markup.</li>
	<li><b>firebase.json</b>: This file located in the root directory is the Firebase configuration file that gets created when you deploy a project to Firebase.</li>
	<li><b>readme_images</b>: This directory contains images used in the README file.</li>
	<li><b>database.rules.json</b>:This file contains the database rules that grant permissions to users who are logged into the app.</li>
</ul>

## <a name="screenshots"></a> Screenshots
![Image of start screen](readme_images/start-screen.png)
![Image of login screen](readme_images/login-screen.png)
![Image of login screen](readme_images/search-screen.png)
![Image of login screen](readme_images/search-results.png)

## <a name="technologies-used"></a> Technologies used to create app
<li>HTML5</li>
<li>CSS</li>
<li>Materialize (http://materializecss.com/)</li>
<li>Javascript</li>
<li>JQuery (https://jquery.com/)</li>
<li>Firebase API for database hosting and authentication (https://firebase.google.com/)</li>
<li>Edamam Recipe Search API (https://developer.edamam.com/edamam-recipe-api)</li>

## <a name="firebase-api"></a> How to use the Edamam Recipe Search API

## <a name="how-to-use-app"></a> How to use the app

## <a name="feature-enhancements"></a> Future code development
<p>The following is a list of user stories that we plan to implement in a future development cycle:</p>
  <ul>
    <li>Add a feature to the app that allows users to import their own recipes. For example, if a user has a hand written recipe, they can import their recipe into the app to save it in case the hand written one gets thrown away or lost.</li>
    <li>Add additional search parameters that allows users to search for recipes based on the ingredients they already have in their homes.</li>
    <li>Add Facebook and other social authentication options to allow users to log in with their social media accounts and easily share recipes with friends and family.</li>
    <li>Integrate the Edamam Nutrition Analysis API to show users the nutritional content of meals and recipes.</li>
  </ul

## <a name ="known-issues"></a> Known issues
<p>The following are known issues to be addressed in a future code update.</p>

<p>If you find an issue while using the app, <a href="https://github.com/philipstubbs13/Project-Longshot/issues/" target="_blank">file an issue</a> on GitHub.</p>

## <a name="icons"></a> Icons
All icons used for this project can be obtained from <a href="http://fontawesome.io/icons/" target="_blank">Font Awesome</a> or <a href="https://www.iconfinder.com/" target="_blank">Iconfinder</a>.

## <a name="feedback"></a> Feedback

## <a name="contribute"></a> How to contribute to this project.

