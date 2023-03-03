import { getRecipes } from "../api/index.js"
import { getCard } from "../view/CardRecipe.js";
import { createSearchInputElement } from "../view/SearchRecipes.js";

// displayData: It takes an array of data and loops through it. For each element it creates a div element and appends it to the element with the class '.container' using section.appendChild()
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

// searchByText uses the map() method to loop through the array of recipes and returns an array of objects with the recipe and the search text. The search text is a combination of the recipe name, ingredients and description.
export function mapRecipesWithSearchText (recipes) {
    return recipes.map(recipe => {
        const ingredients = recipe.ingredients.reduce((acc, val) => acc + ' ' + val.ingredient, '');
        const searchText = recipe.name + " " + ingredients + " " + recipe.description;

        return {
            searchText: searchText,
            recipe,
        };
    });
}

export function getListItem(item, className) {
    const listItem = document.createElement('a');
    listItem.innerHTML = item;
    listItem.classList.add(`list-${className}-item`);
    return listItem;
}

/**
 * @param {*} items 
 * @param {*} className 
 * @returns {HTMLDivElement}
 */
export function getListElement(items, className) {
    const listElement = document.createElement('div');
    listElement.classList.add(`${className}-dropdown-content`);
    listElement.classList.add(`dropdown-content`)

    const listItemsElement = items.map(item => getListItem(item, className));
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
        const dropdownContent = document.querySelector(`.${type}-dropdown-content`);
        const allDropdownContent = document.querySelectorAll('.dropdown-content');
        allDropdownContent.forEach(e => e.classList.remove('show'));
        dropdownContent.classList.toggle('show');
    });
}

/**
 * @param {HTMLInputElement} inputElement
 * @param {string[]} data Values to search in
 * @param {*} type 
 * @returns 
 */
export function searchOptions(inputElement, data, type) {
    inputElement.addEventListener("input", function () {
        // current dropdown list to replace with matched ingredients
        const ingredientsList = document.querySelector(`.${type}-dropdown-content`);
        
        // 1. filter recipes matching ingredient, appliance or ustensil (searchText)
        const ingredientsMatchingQuery = data.filter(ingredient => ingredient.toLowerCase().includes(this.value.toLowerCase()))
        // 2. render recipes matching user input
        const ingredientsElements = getListElement(ingredientsMatchingQuery, type)

        // add show to class to display dropdown
        ingredientsElements.classList.add('show')
        // replace old dropdown with new one
        ingredientsList.parentNode.replaceChild(ingredientsElements, ingredientsList);
    });
}

async function init() {
    const { recipes } = await getRecipes();
    const recipesForSearch = mapRecipesWithSearchText(recipes)

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
    // searchOptions(recepies, "appliance")
    // searchOptions(recepies, "ustensil")
}

document.addEventListener('DOMContentLoaded', function () {
    init();
})
