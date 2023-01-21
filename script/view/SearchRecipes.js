import { displayData } from "../pages/index.js";

export function searchRecipes(userInput, recipes) {
    return recipes.filter(recipe => {
        const recipeProperties = Object.values(recipe);
        return recipeProperties.some(property => {
            if(typeof property === "string"){
                return property.toUpperCase().includes(userInput.toUpperCase())
            }
        });
    });
}

export function acceptInput(data) {
    const userInput = document.querySelector("#userInput");
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