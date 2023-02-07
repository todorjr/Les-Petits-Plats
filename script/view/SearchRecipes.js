import { displayData } from "../pages/index.js";

export function searchAllRecipes(userInput, recipes) {
    const filteredRecipes = recipes.filter(recipe => {
      return recipe.searchText && recipe.searchText.includes(userInput);
    });
    return filteredRecipes.map(recipe => {
      return recipe.recipe;
    });
  }

export function acceptInput(data) {
    const userInput = document.querySelector("#userInput");
    const resultsContainer = document.querySelector(".container");

    userInput.addEventListener("input", () => {
        const recipes = searchAllRecipes(userInput.value, data);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
            if( userInput.value.length < 3) {
                displayData(data.map(recipe => recipe.recipe))
            }
        } else if (userInput.value.length >= 3) {
            displayData(recipes);
        }
    });
}


export function searchOptions(data, type) {
    const userInput = document.querySelector(`.list-${type}-item`);
    const resultsContainer = document.querySelector(".container");
    userInput.addEventListener("click", () => {
        let recipes;
        if (type === "ingrediant") {
            recipes = searchRecipesByIngredient(userInput, data.recipes);
        } else if (type === "appliance") {
            recipes = searchRecipesByAppliance(userInput, data.recipes);
        } else if (type === "ustensil") {
            recipes = searchRecipesByUstensil(userInput, data.recipes);
        }
        if (recipes.length === 0) {
            resultsContainer.innerHTML = `<p class="no-results">No results found for "${userInput.value}" ! 🚫</p>`;
        } else {
            displayData(recipes);
        }
    });
}