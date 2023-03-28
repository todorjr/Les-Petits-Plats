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
// export function createSearchInputElement(data) {
//     const userInput = document.querySelector("#userInput");
//     const resultsContainer = document.querySelector(".container");

//     userInput.addEventListener("input", () => {
//         if (userInput.value.length >= 3) {
//             const recipes = searchAllRecipes(userInput.value, data);
//             if (recipes.length === 0) {
//                 resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
//             } else {
//                 renderRecipes(recipes);
//             }
//         } else {
//             if (userInput.value.length < 1) {
//                 renderRecipes(data.map(recipe => recipe.recipe))
//             }
//         }
//     });
// }


/**
 * Given an array of recipe objects, returns an array of unique ingredients
 * @param {Array} recipes An array of recipe objects
 * @returns {Array} An array of unique ingredients
 */
export function getUniqueIngredients(recipes) {
    const ingredientsSet = new Set();

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsSet.add(ingredient.ingredient.toLowerCase());
        });
    });

    const uniqueIngredients = Array.from(ingredientsSet);
    return uniqueIngredients;
}

/**
* Given an array of options, updates the corresponding dropdown menu with the new options
* @param {string} dropdownType The type of dropdown to update (appliance, utensil or ingredient)
* @param {Array} options An array of strings representing the options to display in the dropdown
*/
export function updateOptions(type, options) {
    const dropdownContent = document.querySelectorAll(`.${type}-dropdown-content`);
    // Add new options
    options.forEach((option) => {
        const optionElement = document.createElement('a');
        optionElement.textContent = option;
        dropdownContent.appendChild(optionElement);
    });
}


/**
 * createSearchInputElement() creates a search input element and attaches an event listener that listens to input changes. 
 * If the input value is 3 or more characters long, it searches through the given data for matching recipes and renders them. 
 * If the input value is less than 3 characters long, it renders all the recipes from the given data. 
 * If no matching recipes are found, it renders a message indicating that no results were found.
 * @param {Array} data An array of recipe objects to search through and render.
 */

export function createSearchInputElement(data) {
    const userInput = document.querySelector("#userInput");
    const resultsContainer = document.querySelector(".container");

    // Define empty arrays for the filtered recipes and their respective ingredients, utensils, and appliances
    let filteredRecipes = [];
    let filteredIngredients = [];


    // Update the dropdowns with the ingredients, utensils, and appliances for the filtered recipes
    const updateDropdowns = () => {
        // Get the unique ingredients, utensils, and appliances for the filtered recipes
        filteredIngredients = getUniqueIngredients(filteredRecipes);

        // Update the dropdowns with the new options
        updateOptions("ingredient", filteredIngredients);
    };

    userInput.addEventListener("input", () => {
        if (userInput.value.length >= 3) {
            // Filter the recipes based on the user input
            filteredRecipes = searchAllRecipes(userInput.value, data);

            if (filteredRecipes.length === 0) {
                resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
            } else {
                // Update the dropdowns with the ingredients, utensils, and appliances for the filtered recipes
                updateDropdowns();
                // Render the filtered recipes
                renderRecipes(filteredRecipes.map(recipe => recipe.recipe));
            }
        } else {
            if (userInput.value.length < 1) {
                // If the user input is empty, render all the recipes and update the dropdowns
                filteredRecipes = data;
                updateDropdowns();
                renderRecipes(data.map(recipe => recipe.recipe));
            }
        }
    });
}
