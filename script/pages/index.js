import { getRecipes } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { createSearchInputElement, searchAllRecipes } from "../view/SearchRecipes.js";

// let tagsArray = ['ail','tomate','pomme de terre', 'poivron'];  // Create an array to store tags
let tagsArray=[];

/**
 *  renderRecipes() takes an array of recipes and renders them to the DOM.
 * @param {[ string ]} recipes 
 * @returns {HTMLDivElement}
 */
export function renderRecipes(recipes) {
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
 * getListItem() takes an item and returns an anchor element with the class 'list-${type}-item' and the text content of the item.
 * @param { string } item
 * @param {'appliance' | 'ustensil' | 'ingredients'} type
 * @returns {HTMLAnchorElement}
 */
export function getListItem(item, type) {
    const listItem = document.createElement('a');
    listItem.innerHTML = item;
    listItem.classList.add(`list-${type}-item`);
    return listItem;
}

/**
 * getListElement() takes an array of items and returns a div element with the class 'dropdown-content' and the class '${type}-dropdown-content' depending on the type parameter.
 * @param {*} items 
 * @param {*} type 
 * @returns {HTMLDivElement}
 */
export function getListElement(items, type) {
    const listElement = document.createElement('div');
    listElement.classList.add(`${type}-dropdown-content`);
    listElement.classList.add(`dropdown-content`)

    const listItemsElement = items.map(item => getListItem(item, type));
    const uniqueElementList = listItemsElement.map(item => item.innerHTML).map(item => {
        return listItemsElement.find(a => a.innerHTML === item)
    })

    listElement.append(...uniqueElementList);

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
    const button = document.querySelector(`.${type}-button`);
    const items = data.flatMap(itemsResolver)
    const dropdownList = getListElement(items, type)

    container.append(dropdownList)

    // close dropdown
    button.addEventListener('click', () => {
        // dropdownContent is the list of ingredients, appliances or ustensils
        const dropdownContent = document.querySelector(`.${type}-dropdown-content`);

        // allDropdownContent is an array of all dropdowns
        const allDropdownContent = document.querySelectorAll('.dropdown-content');

        // close the dropdown if it is already open
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide'); /* Add hide class */

            return;
        }

        // remove the 'show' class from all dropdowns and add it to the current dropdown
        allDropdownContent.forEach(e => e.classList.remove('show'));
        dropdownContent.classList.toggle('show');
        dropdownContent.classList.remove('hide'); /* Remove hide class */
    });
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
        const ingredientsList = document.querySelector(`.${type}-dropdown-content`);

        //  filter recipes matching ingredient, appliance or ustensil (searchText)
        const ingredientsMatchingQuery = data.filter(ingredient => ingredient.toLowerCase().includes(e.target.value.toLowerCase()))
        //! e.target corresponds to the input element

        // render recipes matching user input
        const ingredientsElements = getListElement(ingredientsMatchingQuery, type)

        //  if no recipes match, display message
        if (ingredientsMatchingQuery.length === 0) {
            ingredientsElements.innerHTML = `<a class="list-${type}-item">Aucun ${type} ne correspond à votre critère...</a>`
        }
        // replace old dropdown with new one
        ingredientsList.innerHTML = '';
        ingredientsList.append(...ingredientsElements.childNodes);
    });
}

/**
 * Sets up a dropdown content element with a click event listener that updates a tag element with the selected content.
 *
 * @param {string} dropdownContentClass The class name of the dropdown content element.
 * @param {string} tagContainerClass The class name of the tag container element.
 * @param {string} tagClass The class name of the tag element.
 * @returns {void}
 */


export function tagItems(dropdownContentClass, tagContainerClass) {
    const dropdownContent = document.querySelector(`.${dropdownContentClass}`);
    const tagContainer = document.querySelector(`.${tagContainerClass}`);

    dropdownContent.addEventListener('click', (e) => {
        const tagText = e.target.textContent;
        const existingTag = Array.from(tagContainer.children).find((tag) => tag.textContent.includes(tagText));
        if (!existingTag) {
            const tag = document.createElement('p');
            tag.classList.add(`show-tag_${dropdownContentClass}`, `tags`);
            tag.innerHTML = `${tagText}  <i class="far fa-times-circle close-icon"></i>`;
            tagContainer.appendChild(tag);
            tagsArray.push(tagText); // Add tag text to the array
            
            let filteredRecipes = searchAllRecipes(userInput.value, recipes, tagsArray);

            console.log(tagsArray, 'addedTagsArray');

            renderRecipes(filteredRecipes);
        }
    });

    tagContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-icon')) {
            const tagText = e.target.parentNode.textContent.trim();
            const tagIndex = tagsArray.indexOf(tagText);
            if (tagIndex !== -1) {
                tagsArray.splice(tagIndex, 1); // Remove tag text from the array
                console.log(tagsArray, 'deletedTagsArray');
            }
            e.target.parentNode.remove();
        }
    });
}



async function init() {
    const { recipes } = await getRecipes();
    const recipesForSearch = mapRecipesWithSearchText(recipes)
    const userInput = document.querySelector("#userInput");

    // render list of recepies
    renderRecipes(recipes)

    // render filters
    createDropdownElement(recipes, 'ingredients', recipe => recipe.ingredients.map(ingredient => ingredient.ingredient))
    createDropdownElement(recipes, "appliance")
    createDropdownElement(recipes, "ustensils")

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

    tagItems('ingredients-dropdown-content', 'tag', userInput.value);
    tagItems('appliance-dropdown-content', 'tag1', userInput.value);
    tagItems('ustensils-dropdown-content', 'tag2', userInput.value);
}

document.addEventListener('DOMContentLoaded', function () {
    init();
})
