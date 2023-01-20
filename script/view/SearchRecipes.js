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
    submitBtn.addEventListener("click", () => {
        const recipes = searchRecipes(userInput.value, data.recipes);

        displayData(recipes);
    });
}