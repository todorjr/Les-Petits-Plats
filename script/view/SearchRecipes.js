import { renderRecipes } from "../pages/index.js";

/**
 * Searches through the given array of recipe objects for matching recipes based on the given user input. Each recipe object must have a searchText property  which contains a string of keywords that can be used for searching. Returns an array of recipe objects that match the given user input.
@param {string} userInput The user input to search for.
@param {Array} recipes An array of recipe objects to search through.
@returns {Array} An array of recipe objects that match the given user input.
*/

export function searchAllRecipes(userInput, recipes) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.searchText && recipe.searchText.includes(userInput);
    });
    return filteredRecipes.map(recipe => {
        return recipe.recipe;
    });
}

/** 
 * createSearchInputElement() creates a search input element and attaches an event listener that listens to input changes. If the input value is 3 or more characters long, it searches through the given data for matching recipes and renders them. If the input value is less than 3 characters long, it renders all the recipes from the given data. If no matching recipes are found, it renders a message indicating that no results were found.
@param {Array} data An array of recipe objects to search through and render.
*/
export function createSearchInputElement(data) {
    const userInput = document.querySelector("#userInput");
    const resultsContainer = document.querySelector(".container");

    userInput.addEventListener("input", () => {
        if (userInput.value.length >= 3) {
            const recipes = searchAllRecipes(userInput.value, data);
            if (recipes.length === 0) {
                resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
            } else {
                renderRecipes(recipes);
            }
        } else {
            if (userInput.value.length < 1) {
                renderRecipes(data.map(recipe => recipe.recipe))
            }
        }
    });
}