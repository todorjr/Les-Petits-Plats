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
    console.log(data, 'data');
    data.forEach((recepie) => {
        const header = document.querySelector('.list')
        
        const dropdownSection = document.createElement("div")
        const button = document.createElement("button")
        button.classList.add("dropdown-button")
        const dropdownContent = document.createElement("div")
        dropdownContent.classList.add("dropdown-content")

        const dropdown = getIngrediants(recepie)
        console.log(dropdown, 'dropdown');

        dropdownSection.classList.add("dropdown")
        dropdownSection.innerHTML = "Ingredients"
        dropdownSection.append(dropdown)
        header.appendChild(dropdownSection)


    }
  
)}

async function init() {
    const recepies = await getRecepies();
    displayData(recepies.recipes)
    dropdownIngredients(recepies.recipes)
}

init();

const dropdownButton = document.querySelectorAll(".dropdown-button");
console.log(dropdownButton, 'dropdownButton');
const dropdownCnt = document.querySelectorAll(".dropdown-content");

dropdownButton.addEventListener("click", function() {
dropdownCnt.classList.toggle("show");
});