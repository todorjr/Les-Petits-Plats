import { displayData } from "../pages/index.js";

export function searchRecipes(userInput, recipes) {
    return recipes.filter(recipe => hasIngredient(recipe, userInput));
}

function hasIngredient(recipe, ingredientName) {
    return recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient.toUpperCase() === ingredientName.toUpperCase()
    });
}

export function acceptInput(data) {
    const userInput = document.querySelector("#userInput");
    const submitBtn = document.querySelector(".submit-btn")
    const resultsContainer = document.querySelector(".container");

    userInput.addEventListener("blur", () => {
        const recipes = searchRecipes(userInput.value, data.recipes);
        if(recipes.length === 0) {
            resultsContainer.innerHTML = "No results found.";
        } else {
            displayData(recipes);
        }
    });
}