import { getRecepies } from "../api/index.js"
 
function displayData(recepie) {
    const section= document.querySelector(".container");
    const recepies = document.querySelector("#recepies");

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
  

    recepies.appendChild(description)
    recepies.appendChild(title)
    section.appendChild(recepies)
  }

async function init() {
    const recepies = await getRecepies();
    console.log(recepies,'data');
    displayData(recepies);
  }
  
  init();