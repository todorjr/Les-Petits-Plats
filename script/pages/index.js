import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";

function displayData(data) {
    data.forEach((recepie) => {
        const section = document.querySelector(".container");
        const recepiesSection = document.createElement("div")
        recepiesSection.classList.add("card")
        recepiesSection.innerHTML = getCard(recepie)
        section.appendChild(recepiesSection)
    });
}

async function init() {
    const recepies = await getRecepies();
    console.log(recepies, 'data');
    displayData(recepies.recipes)
}

init();