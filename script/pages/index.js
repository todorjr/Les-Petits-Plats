import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";

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

async function init() {
    const recepies = await getRecepies();
    console.log(recepies, 'data');
    displayData(recepies.recipes)
}

init();