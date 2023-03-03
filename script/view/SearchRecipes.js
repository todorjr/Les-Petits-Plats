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

function hasIngredient(recipe, ingredientName) {
    return recipe.ingredients.find((ingredient) => {
        return ingredient.ingredient === ingredientName
    })
}
function hasAppliance(recipe, applianceName) {
    return recipe.appliance.find((appliance) => {
        return appliance.appliance === applianceName
    })
}
function hasUstensil(recipe, ustensilName) {
    return recipe.ustensils.find((ustensil) => {
        return ustensil.ustensil === ustensilName
    })
}


function searchRecipesByIngredient(userInput, recipes) {
    return recipes.filter(recipe => hasIngredient(recipe, userInput));
}
function searchRecipesByAppliance(userInput, recipes) {
    return recipes.filter(recipe => hasAppliance(recipe, userInput));
}
function searchRecipesByUstensil(userInput, recipes) {
    return recipes.filter(recipe => hasUstensil(recipe, userInput));
}