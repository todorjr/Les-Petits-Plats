import { renderRecipes } from "../pages/index.js";

export function searchAllRecipes(userInput, recipes) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.searchText && recipe.searchText.includes(userInput);
    });
    return filteredRecipes.map(recipe => {
        return recipe.recipe;
    });
}

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