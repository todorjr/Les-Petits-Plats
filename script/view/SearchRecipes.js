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

    userInput.addEventListener("input", () => {
        const recipes = searchRecipes(userInput.value, data.recipes);
        if (recipes.length === 0) {
            resultsContainer.innerHTML = `<p class="no-results">No results found for " ${userInput.value} " ! 🚫 <br> Try again, good luck !</p>`;
            userInput.value = ""
            setInterval(() => {
                displayData(data.recipes)
            }, 5000);
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
            resultsContainer.innerHTML = `<p class="no-results">No results found for " ${userInput.value} " ! 🚫 <br> Try again, good luck !</p>`;
        } else {
            displayData(recipes);
        }
    });
}


// function hasIngredient(recipe, ingredientName) {
//     return recipe.ingredients.find((ingredient) => {
//         return ingredient.ingredient === ingredientName
//     })
// }
// function hasAppliance(recipe, applianceName) {
//     return recipe.appliance.find((appliance) => {
//         return appliance.appliance === applianceName
//     })
// }
// function hasUstensil(recipe, ustensilName) {
//     return recipe.ustensils.find((ustensil) => {
//         return ustensil.ustensil === ustensilName
//     })
// }


// function searchRecipesByIngredient(userInput, recipes) {
//     return recipes.filter(recipe => hasIngredient(recipe, userInput));
// }
// function searchRecipesByAppliance(userInput, recipes) {
//     return recipes.filter(recipe => hasAppliance(recipe, userInput));
// }
// function searchRecipesByUstensil(userInput, recipes) {
//     return recipes.filter(recipe => hasUstensil(recipe, userInput));
// }