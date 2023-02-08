import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { getIngrediants } from "../view/IngrediantList.js";
import { getAppliance } from "../view/ApplianceList.js";
import { getUstensil } from "../view/UstensilList.js";
import { acceptInput } from "../view/SearchRecipes.js";
import { searchOptions } from "../view/SearchRecipes.js";


// global variables 
let recepies = []
let allRecepies = []

// displayData: It takes an array of data and loops through it. For each element it creates a div element and appends it to the element with the class '.container' using section.appendChild()
export function displayData(recipes) {
    const section = document.querySelector(".container");
    section.innerHTML = ''
    recipes.forEach((recepie) => {
        const emptyElement = document.createElement('div')
        emptyElement.classList.add('empty')

        const recepiesSection = document.createElement("div")
        const recepieCard = getCard(recepie)

        recepiesSection.classList.add("card")
        recepiesSection.appendChild(emptyElement)
        recepiesSection.append(recepieCard)
        section.appendChild(recepiesSection)
    });
}

// searchByText uses the map() method to loop through the array of recipes and returns an array of objects with the recipe and the search text. The search text is a combination of the recipe name, ingredients and description.
export function searchByText(recipes) {
    return Array.from(recipes).map(recipe => {
      const ingredients = recipe.ingredients.reduce((acc,val)=> acc + ' ' + val.ingredient, '');
      const searchText = recipe.name + " " + ingredients + " " + recipe.description;
      return { 
        searchText: searchText, 
        recipe: {...recipe}
     };
    });
  }

//dropdown: It takes an array of data and flattens it to a single array of items using the flatMap() method. Then it calls the function getIngrediants() passing the ingredients array and appends the returned result to the element with the class '.list-content' using container.append()

function dropdown (data,type) {
    const items = data.flatMap(r => r[type])
    switch (type) {
        case "ingredients":
            const ingredientList = getIngrediants(items)
            // Get a reference to the element where you want to display the list
            const ingrediantContainer = document.querySelector('.list-content')
            // Append the ingredient list to the container
            ingrediantContainer.append(ingredientList)
            break;
        case "appliance":
            const applianceList = getAppliance(items)
            // Get a reference to the element where you want to display the list
            const applianceContainer = document.querySelector('.list-content')
            // Append the ingredient list to the container
            applianceContainer.append(applianceList)
            break;
        case "ustensils":
            const ustensilList = getUstensil(items)
            // Get a reference to the element where you want to display the list
            const ustensilContainer = document.querySelector('.list-content')
            // Append the ingredient list to the container
            ustensilContainer.append(ustensilList)
            break;
        }
    }


async function init() {
    recepies = await getRecepies(); 
    displayData(recepies.recipes)
    dropdown(recepies.recipes, "ingredients")
    dropdown(recepies.recipes, "appliance")
    dropdown(recepies.recipes, "ustensils")

    allRecepies= searchByText(recepies.recipes)
    acceptInput(allRecepies)
    searchOptions(recepies, "ingrediant")
    searchOptions(recepies, "appliance")
    searchOptions(recepies, "ustensil")
}

init();