import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { getIngrediants } from "../view/IngrediantList.js";

function displayData(data) {
    data.forEach((recepie) => {
        const section = document.querySelector(".container");
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

function dropdownIngredients(data) {
   // Get the ingredients from the data and flatten the array of arrays into a single array 
    const ingredients = data.flatMap(r => r.ingredients)
    const ingredientList = getIngrediants(ingredients)
   // Get a reference to the element where you want to display the list
    const container = document.querySelector('.list')
    // Append the ingredient list to the container
    container.append(ingredientList)

    };


async function init() {
    const recepies = await getRecepies();
    displayData(recepies.recipes)
    dropdownIngredients(recepies.recipes)
}

init();