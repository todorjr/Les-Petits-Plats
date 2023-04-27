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
 * Given an array of recipe objects, returns an array of unique ingredients
 * @param {Array} recipes An array of recipe objects
 * @returns {Array} An array of unique ingredients
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
    const resultsContainer = document.querySelector(".container");
    const ingredientDropdown = document.querySelector(".ingredients-dropdown-content");
    const applianceDropdown = document.querySelector(".appliance-dropdown-content");
    const ustensilDropdown = document.querySelector(".ustensils-dropdown-content");

    // Define empty arrays for the filtered recipes and their respective ingredients, utensils, and appliances
    let filteredRecipes = [];
    let filteredIngredients = [];
    let filteredUtensils = [];
    let filteredAppliances = [];

    // Update the dropdowns with the ingredients, utensils, and appliances for the filtered recipes
    function updateDropdowns() {
        if (filteredRecipes.length === 0) {
            // If there are no filtered recipes, populate the dropdowns with all the options
            updateOptions("ingredients", getUniqueIngredients(data));
            updateOptions("ustensils", getUniqueUstensils(data));
            updateOptions("appliance", getUniqueAppliances(data));
        } else {
            // Get the unique ingredients, utensils, and appliances for the filtered recipes
            filteredIngredients = getUniqueIngredients(filteredRecipes);
            filteredUtensils = getUniqueUstensils(filteredRecipes);
            filteredAppliances = getUniqueAppliances(filteredRecipes);

            // Update the dropdowns with the new options
            updateOptions("ingredients", filteredIngredients);
            updateOptions("ustensils", filteredUtensils);
            updateOptions("appliance", filteredAppliances);
        }
    }
    userInput.addEventListener("input", () => {
        if (userInput.value.length >= 3) {
            // Filter the recipes based on the user input and the selected tags
            filteredRecipes = searchAllRecipes(userInput.value, data);

            if (filteredRecipes.length === 0) {
                resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
                ingredientDropdown.innerHTML = `<a class="list-item">Aucun item ne correspond à votre critère...</a>`
                applianceDropdown.innerHTML = `<a class="list-item">Aucun item ne correspond à votre critère...</a>`
                ustensilDropdown.innerHTML = `<a class="list-item">Aucun item ne correspond à votre critère...</a>`
            } else {
                // Update the dropdowns with the ingredients, utensils, and appliances for the filtered recipes
                //updateDropdowns();
                //renderRecipes(filteredRecipes)
            }
            renderRecipes(filteredRecipes)
        } else {
            renderRecipes(data.map(recipe => recipe.recipe));
            //if (userInput.value.length < 1) {
            // If the user input is empty, render all the recipes and update the dropdowns
            //  filteredRecipes = data;
            //  renderRecipes(data.map(recipe => recipe.recipe));
            // updateDropdowns();

            // }
        }
    });

}
