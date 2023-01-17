import { getRecepies } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";


// function displayIngredients(data) {
//     const select = document.querySelector("#ingredients");
//     data.forEach(ingrediant => {
//         var option = document.createElement("option");
//         option.value = ingrediant.value;
//         option.text = ingrediant.text;
//         select.appendChild(option);
//       });
// }
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


// // Create the select element
// const select = document.createElement("select");

// // Fetch data from API
// fetch('data/recepies.json')
//   .then(response => response.json())
//   .then(data => {
//     // Loop through the data and create options for the select element
//     data.forEach(recepie => {
//       var option = document.createElement("option");
//       option.innerHTML = recepie.name;
//       select.appendChild(option);
//     });
//   });

// // Append the select element to the body
// document.body.appendChild(select);
// select.size = select.options.length;


init();