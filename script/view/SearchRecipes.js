import { displayData } from "../pages/index.js";

export function searchRecipes(userInput, recipes) {
    return recipes.filter(recipe => {
        const recipeProperties = Object.values(recipe);
        return recipeProperties.some(property => {
            if (typeof property === "string") {
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
        if (recipes.length === 0) {
            resultsContainer.innerHTML = "No results found.";
        } else {
            displayData(recipes);
        }
    });
}





export function ingrediantsOptions(data) {
    const userInput = document.querySelector(".list-ingrediant-item");
    const resultsContainer = document.querySelector(".container");
    userInput.addEventListener("click", () => {
        const recipes = searchRecipesByIngredient(userInput, data.recipes);
        console.log(userInput, 'userInput');
        if (recipes.length === 0) {
            resultsContainer.innerHTML = "No results found.";
        } else {
            displayData(recipes);
        }
    })
}
export function applianceOptions(data) {
    const userInput = document.querySelector(".list-appliance-item");
    const resultsContainer = document.querySelector(".container");
    userInput.addEventListener("click", () => {
        const recipes = searchRecipesByAppliance(userInput, data.recipes);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = "No results found.";
        } else {
            displayData(recipes);
        }
    })
}
export function ustensilOptions(data) {
    const userInput = document.querySelector(".list-ustensil-item");
    const resultsContainer = document.querySelector(".container");
    userInput.addEventListener("click", () => {
        const recipes = searchRecipesByUstensil(userInput, data.recipes);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = "No results found.";
        } else {
            displayData(recipes);
        }
    })
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