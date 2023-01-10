import { getRecepies } from "../api/index.js"

function displayData(recepies) {
    const section = document.querySelector(".container");
    const recepiesSection = document.createElement("div")

    recepies.forEach((recepie) => {
        const title = document.createElement("h2")
        title.setAttribute("tabindex", 0)
        title.classList.add("title-recepies")
        title.setAttribute("id", "title");
        title.innerHTML = recepie.name

        const description = document.createElement("p")
        description.setAttribute("tabindex", 0)
        description.classList.add("description-recepies")
        description.setAttribute("id", "description");
        description.innerHTML = recepie.description
    });


    recepiesSection.appendChild(description)
    recepiesSection.appendChild(title)
    section.appendChild(recepiesSection)
}

async function init() {
    const recepies = await getRecepies();
    console.log(recepies, 'data');
    displayData(recepies);
}

init();