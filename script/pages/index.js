import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { getIngrediants } from "../view/IngrediantList.js";
import { getAppliance } from "../view/ApplianceList.js";
import { getUstensil } from "../view/UstensilList.js";

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
    const container = document.querySelector('.list-content')
    // Append the ingredient list to the container
    container.append(ingredientList)

};

function dropdownAppliance(data) {
    // Get the ingredients from the data and flatten the array of arrays into a single array 
    const appliances = data.flatMap(r => r.appliance)
    const applianceList = getAppliance(appliances)
    // Get a reference to the element where you want to display the list
    const container = document.querySelector('.list-content')
    // Append the ingredient list to the container
    container.append(applianceList)
     
};

function dropdownUstensil(data) {
    // Get the ingredients from the data and flatten the array of arrays into a single array 
     const ustensil = data.flatMap(r => r.ustensils)
     const ustensilList = getUstensil(ustensil)
    // Get a reference to the element where you want to display the list
     const container = document.querySelector('.list-content')
     // Append the ingredient list to the container
     container.append(ustensilList)
 
    };
    
export function acceptInput() {
        const userInput = document.querySelector("#userInput");
        const submitBtn = document.querySelector(".submit-btn")
        submitBtn.addEventListener("click", () => {
        console.log(`You entered: ${userInput.value}`);
      })
    }

async function init() {
    const recepies = await getRecepies();
    displayData(recepies.recipes)
    dropdownIngredients(recepies.recipes)
    dropdownAppliance(recepies.recipes)
    dropdownUstensil(recepies.recipes)
}

init();
acceptInput();