import { getRecipes } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { createSearchInputElement, searchAllRecipes } from "../view/SearchRecipes.js";

// let tagsArray = ['ail','tomate','pomme de terre', 'poivron'];  // Create an array to store tags
let tagsArray = [];

/**
 *  renderRecipes() takes an array of recipes and renders them to the DOM.
 * @param {[ string ]} recipes 
 * @returns {HTMLDivElement}
 */
export function renderRecipes(recipes) {
    const section = document.querySelector(".container");
    section.innerHTML = ''
    if (recipes.length === 0) {
        section.innerHTML = `<p class="no-results"> Aucune recette ne correspond à votre critère… Vous pouvez
chercher "tarte aux pommes", "poisson", ...</p>`;
    }
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
    // render filters
    createDropdownElement(recipes, 'ingredients', recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    createDropdownElement(recipes, "appliance")
    createDropdownElement(recipes, "ustensils")

    tagItems('ingredients-dropdown-content', 'tag', recipes);
    tagItems('appliance-dropdown-content', 'tag1', recipes);
    tagItems('ustensils-dropdown-content', 'tag2', recipes);
}

/**
 * mapRecipesWithSearchText uses the map() method to loop through the array of recipes and returns an array of objects with the recipe and the search text. The search text is a combination of the recipe name, ingredients and description.
 * @param {[ string ]} recipes 
 * @param {[ string ]} tags 
 * @returns 
 */
export function mapRecipesWithSearchText(recipes, tags) {
    return recipes.map(recipe => {
        const ingredients = recipe.ingredients.reduce((acc, val) => acc + ' ' + val.ingredient, '');
        const searchText = recipe.name + " " + ingredients + " " + recipe.description;

        return {
            searchText: searchText,
            recipe,
        };
    });
}



/**
* Creates a string of HTML unordered list elements with dropdown content for a specified type.
* @param {string[]} items An array of strings to be displayed as dropdown items.
* @param {string} type A string representing the type of dropdown menu, which is used to set the class name for the dropdown content.
* @returns {string} - A string of HTML elements representing the dropdown menu items.
*/
export function createDropdownItems(items, type) {
    return `<ul class="${type}-dropdown-content dropdown-content ">
    ${items.map(item => `<li class="list-${type}-item"><a data-type="${type}">${item.charAt(0).toUpperCase() + item.slice(1)}</a></li>`).join(' ')}
    </ul>`
}
/**
 * getListElement() takes an array of items and returns a div element with the class 'dropdown-content' and the class '${type}-dropdown-content' depending on the type parameter.
 * @param {*} items 
 * @param {*} type 
 * @returns {HTMLDivElement}
 */
export function getListElement(items, type) {
    const listElement = document.createElement('div');
    listElement.setAttribute('data-family', type)

    // Create a new Set with unique items
    const uniqueItems = new Set(items);

    // Convert the Set back to an array
    const uniqueArray = [...uniqueItems];
    listElement.innerHTML = createDropdownItems(uniqueArray, type)
    return listElement;
}

/**
 * It takes an array of data and flattens it to a single array of items using the flatMap() method. Then it calls the function getIngrediants() passing the ingredients array and appends the returned result to the element with the class '.list-content' using container.append().
 * 
 * @param {Array<{ appliance: string, ustensil: string, ingredients: { ingredient: string } }>} data 
 * @param {'appliance' | 'ustensil' | 'ingredients'} type 
 * @param {(recepie: object) => string[]} itemsResolver 
 */
function createDropdownElement(data, type, itemsResolver = recepie => recepie[type]) {
    const container = document.querySelector('.list-content');
    const items = data.flatMap(itemsResolver)
    const dropdownList = getListElement(items, type)
    const list = container.querySelector(`[data-family=${type}]`)
    if (list) {
        list.remove()
    }
    container.appendChild(dropdownList)
}

/**
 * searchOptions() takes an input element, an array of data and a type and adds an event listener to the input element. The event listener calls the function getListElement() passing the filtered data and the type. Then it replaces the old dropdown list with the new one.
 * @param {HTMLInputElement} inputElement
 * @param {string[]} data 
 * @param {*} type 
 * @returns 
 */
export function searchOptions(inputElement, data, type) {
    inputElement.addEventListener("input", function (e) {
        // current dropdown list to replace with matched ingredients
        const dropdownLists = document.querySelector(`.${type}-dropdown-content`);
        console.log(dropdownLists);

        //  filter recipes matching ingredient, appliance or ustensil (searchText)
        const itemsMatchingQuery = data.filter(ingredient => ingredient.toLowerCase().includes(e.target.value.toLowerCase()))
        //! e.target corresponds to the input element

        // render recipes matching user input
        const dropdownElements = getListElement(itemsMatchingQuery, type)

        //  if no recipes match, display message
        if (itemsMatchingQuery.length === 0) {
            dropdownElements.innerHTML = `<a class="list-${type}-item">Aucun ${type} ne correspond à votre critère...</a>`
        }
        // replace old dropdown with new one
        dropdownLists.innerHTML = '';
        dropdownLists.append(...dropdownElements.childNodes);
    });
}

function filterByTags(tag, recipes) {
    switch (tag.type) {
        case 'ingredients':
            return recipes.filter(recipe => recipe.ingredients.some(ing => ing.ingredient === tag.value))
        case 'ustensils':
            return recipes.filter(recipe => recipe.ustensils.includes(tag.value))
        case 'appliances':
            return recipes.filter(recipe => recipe.appliance.inlcudes(tag.value))
        default:
            return recipes;
    }
}

/**
 * Sets up a dropdown content element with a click event listener that updates a tag element with the selected content.
 * @param {string} dropdownContentClass The class name of the dropdown content element.
 * @param {string} tagContainerClass The class name of the tag container element.
 * @param {string} tagClass The class name of the tag element.
 * @returns {void}
 */
export function tagItems(dropdownContentClass, tagContainerClass, recipes) {
    const dropdownContent = document.querySelector(`.${dropdownContentClass}`);
    const tagContainer = document.querySelector(`.${tagContainerClass}`);

    dropdownContent.addEventListener('click', (e) => {
        const mainText = document.querySelector('#userInput').value
        if (e.target.hasAttribute('data-type')) {
            const tagText = e.target.textContent;
            const type = e.target.dataset.type
            const existingTag = Array.from(tagContainer.children).find((tag) => tag.textContent.includes(tagText));
            if (!existingTag) {
                const tag = document.createElement('p');
                tag.classList.add(`show-tag_${dropdownContentClass}`, `tags`);
                tag.innerHTML = `${tagText}  <i class="far fa-times-circle close-icon"></i>`;
                tagContainer.appendChild(tag);
                tagsArray.push({ value: tagText, type: type }); // Add tag text to the array

                let results = searchAllRecipes(mainText, mapRecipesWithSearchText(recipes));
                tagsArray.forEach(tag => {
                    results = filterByTags(tag, results);
                });
                renderRecipes(results);
            }
        }
    });


    tagContainer.addEventListener('click', (e) => {
        const mainText = document.querySelector('#userInput').value
        if (e.target.classList.contains('close-icon')) {
            const tagText = e.target.parentNode.textContent.trim();
            const tagIndex = tagsArray.findIndex(tag => tag.value === tagText);
            if (tagIndex !== -1) {
                tagsArray.splice(tagIndex, 1); // Remove tag text from the array    
                let results = searchAllRecipes(mainText, mapRecipesWithSearchText(recipes));
                tagsArray.forEach(tag => {
                    results = filterByTags(tag, results);
                });

                renderRecipes(results);
            }
            e.target.parentNode.remove();
        }
    });

}

function initDropdownEvent() {
    const buttons = document.querySelectorAll('.btn-dropDown');

    const inputs = {
        'ustensils': document.querySelector('#input-ustensils'),
        'ingredients': document.querySelector('#input-ingredients'),
        'appliance': document.querySelector('#input-appliance')
    };
    const originalPlaceholders = {
        'ustensils': inputs.ustensils.getAttribute('placeholder'),
        'ingredients': inputs.ingredients.getAttribute('placeholder'),
        'appliance': inputs.appliance.getAttribute('placeholder')
    };

    buttons.forEach(button => {
        const type = button.dataset.type;

        button.addEventListener('click', (e) => {
            // set the width of the button to the width of the dropdown
            setTimeout(() => {
                const initialDropdownWidth = document.querySelector(`.${type}-dropdown-content`).offsetWidth;
                button.style.width = initialDropdownWidth + 'px';
            }, 0);

            // dropdownContent is the list of ingredients, appliances or ustensils
            const dropdownContent = document.querySelector(`.${type}-dropdown-content`);
            // allDropdownContent is an array of all dropdowns
            const allDropdownContent = document.querySelectorAll('.dropdown-content');

            // reset all placeholders
            Object.values(inputs).forEach(input => input.setAttribute('placeholder', originalPlaceholders[input.id]));

            // change the placeholder for the clicked button
            inputs[type].setAttribute('placeholder', `Rechercher un ${type}`);

            // close the dropdown if it is already open
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
                dropdownContent.classList.add('hide'); /* Add hide class */
                inputs[type].setAttribute('placeholder', originalPlaceholders[type]);
                setTimeout(() => {
                    button.style.width = '200px';
                }, 0);

                return;
            }

            // remove the 'show' class from all dropdowns and add it to the current dropdown
            allDropdownContent.forEach(e => e.classList.remove('show'));
            dropdownContent.classList.toggle('show');
            dropdownContent.classList.remove('hide'); /* Remove hide class */

        });

        // close dropdown when user clicks outside
        document.addEventListener('click', (e) => {
            if (!button.contains(e.target)) {
                const type = button.dataset.type;
                const dropdownContent = document.querySelector(`.${type}-dropdown-content`);
                dropdownContent.classList.remove('show');
                dropdownContent.classList.add('hide');

                // reset the placeholder for the clicked button
                inputs[type].setAttribute('placeholder', originalPlaceholders[type]);
                button.style.width = '200px';
            }
        });
    });
    
}

async function init() {
    const { recipes } = await getRecipes();
    const recipesForSearch = mapRecipesWithSearchText(recipes)
    // render list of recepies
    renderRecipes(recipes)
    initDropdownEvent()

    createSearchInputElement(recipesForSearch)

    searchOptions(
        document.querySelector('#input-ingredients'),
        recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)),
        "ingredients"
    )
    searchOptions(
        document.querySelector('#input-appliance'),
        recipes.flatMap(recipe => recipe.appliance),
        "appliance"
    )
    searchOptions(
        document.querySelector('#input-ustensils'),
        recipes.flatMap(recipe => recipe.ustensils),
        "ustensils"
    )

}

document.addEventListener('DOMContentLoaded', function () {
    init();
})
