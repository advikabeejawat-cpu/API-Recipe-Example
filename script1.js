// Get references to HTML elements
const searchButton = document.getElementById('searchButton'); 
const ingredientsInput = document.getElementById('ingredients'); 
const recipeResults = document.getElementById('recipeResults'); // Container where recipe results will appear

// API_KEY: A unique key that gives you permission to access Spoonacular's data
// BASE_URL: The main link (endpoint) for the recipe search feature
const API_KEY = 'c581f8adff3b4fddacc342116fbb8aa3'; 
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';


searchButton.addEventListener('click', () => {
  // Get the value the user typed in (and remove any extra spaces)
  const ingredients = ingredientsInput.value.trim();
  if (!ingredients) {
    alert('Please enter some ingredients!');
    return;
  }
  fetchRecipes(ingredients);
});

// This function calls the API using the "fetch" command
// It sends a request to the Spoonacular server and asks for recipes that match the ingredients
function fetchRecipes(ingredients) {
  // Construct the full API URL with parameters
  // - ingredients: what the user typed in
  // - number=5: only return 5 recipes
  // - apiKey: your unique Spoonacular key
  const url = `${BASE_URL}?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`;

  // Use fetch() to make the API call
  fetch(url)
    // The API responds with data, but it’s in JSON (a structured text format)
    .then(response => response.json())
    // Once we have the data, pass it to the display function
    .then(data => {
      displayRecipes(data);
    })

    .catch(error => {
      console.error('Error fetching recipes:', error);
      recipeResults.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    });
}

// This function displays the recipes returned from the API on the webpage
function displayRecipes(recipes) {
  // Clear any old search results first
  recipeResults.innerHTML = '';

  // If no recipes were found, show a message
  if (recipes.length === 0) {
    recipeResults.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
    return;
  }

  // Loop through each recipe object in the array returned by the API
  recipes.forEach(recipe => {
    // Create a new <div> element for each recipe
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe');

    // Fill the recipe card with data:
    // - image of the dish
    // - title of the recipe
    // - link to the full recipe on Spoonacular
    recipeCard.innerHTML = `
      <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p><a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a></p>
    `;

    // Add the card to the recipe results container on the webpage
    recipeResults.appendChild(recipeCard);
  });
}