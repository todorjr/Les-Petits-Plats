import { renderRecipes } from "../pages/index.js";

/**
 * Searches through the given array of recipe objects for matching recipes based on the given user input. Each recipe object must have a searchText property  which contains a string of keywords that can be used for searching. Returns an array of recipe objects that match the given user input.
@param {string} userInput The user input to search for.
@param {Array} recipes An array of recipe objects to search through.
@returns {Array} An array of recipe objects that match the given user input.
*/
export function searchAllRecipes(userInput, recipes) {
    const matchingRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.searchText && recipe.searchText.includes(userInput)) {
        matchingRecipes.push(recipe.recipe);
        }
    }
    return matchingRecipes;
}  

/**
 * Given an array of recipe objects, returns an array of unique ingredients, appliances and ustensils.
 * @param {Array} recipes An array of recipe objects, each of which must have an ingredients, appliance and ustensils property
 * @returns {Array} An array of unique ingredients, appliances and ustensils
 */
export function getUniqueIngredients(recipes) {
    if (!Array.isArray(recipes)) {
        throw new Error("Expected an array of recipes");
    }
    const ingredientsSet = new Set();

    recipes.forEach((recipe) => {
        if (recipe && recipe.ingredients) {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient && ingredient.ingredient) {
                    ingredientsSet.add(ingredient.ingredient.toLowerCase());
                }
            });
        }
    });

    const uniqueIngredients = Array.from(ingredientsSet);
    return uniqueIngredients;
}

export function getUniqueAppliances(recipes) {
    const appliancesSet = new Set();

    recipes.forEach((recipe) => {
        if (recipe && recipe.appliance) {
            appliancesSet.add(recipe.appliance.toLowerCase());
        }
    });

    const uniqueAppliances = Array.from(appliancesSet);
    return uniqueAppliances;
}

export function getUniqueUstensils(recipes) {
    const ustensilsSet = new Set();

    recipes.forEach((recipe) => {
        if (recipe && recipe.ustensils) {
            recipe.ustensils.forEach((ustensil) => {
                ustensilsSet.add(ustensil.toLowerCase());
            });
        }
    });
    const uniqueUstensils = Array.from(ustensilsSet);
    return uniqueUstensils;
}

/**
* Given an array of options, updates the corresponding dropdown menu with the new options
* @param {string} type The type of dropdown to update (appliance, ustensil or ingredient)
* @param {Array} options An array of strings representing the options to display in the dropdown
*/
export function updateOptions(type, options) {
    const dropdownContents = document.querySelectorAll(`.${type}-dropdown-content`);
    dropdownContents.forEach((dropdownContent) => {
        // Clear old options
        dropdownContent.innerHTML = '';
        // Add new options
        options.forEach((option) => {
            const optionElement = document.createElement('a');
            optionElement.innerHTML = option;
            dropdownContent.append(optionElement);
        });
    });
}

/** 
 * createSearchInputElement() creates a search input element and attaches an event listener that listens to input changes. If the input value is 3 or more characters long, it searches through the given data for matching recipes and renders them. If the input value is less than 3 characters long, it renders all the recipes from the given data. If no matching recipes are found, it renders a message indicating that no results were found.
@param {Array} data An array of recipe objects to search through and render.
*/
export function createSearchInputElement(data) {
    // Define empty arrays for the filtered recipes and their respective ingredients, utensils, and appliances
    let filteredRecipes = [];

    // Update the dropdowns with the ingredients, utensils, and appliances for the filtered recipes
    userInput.addEventListener("input", () => {
        if (userInput.value.length >= 3) {
            // Filter the recipes based on the user input and the selected tags
            filteredRecipes = searchAllRecipes(userInput.value, data);
            renderRecipes(filteredRecipes)
        } else {
            renderRecipes(data.map(recipe => recipe.recipe));
        }
    });
}
