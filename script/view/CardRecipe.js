/**
 * Format quantity depending on unit.
 * @param {string|number} quantity
 * @param {string|undefined} unit
 * @returns {string}
 */
export function quantityUnitFormatter (quantity, unit) {
    switch (unit) {
        case 'ml':
            return `${quantity}${unit}`
        default:
            return unit
                ? `${quantity} ${unit}`
                : `${quantity}`
    }
}

/**
 * Format an ingredient to a item of a list.
 * @param {object} ingredient Ingredient to be formatted
 * @returns {HTMLLIElement}
 */
export function getIngredientItem (ingredient) {
    const item = document.createElement('li')
    const quantityText = quantityUnitFormatter(ingredient.quantity, ingredient.unit)
    const message = `${ingredient.ingredient}: ${quantityText}`

    item.innerText = message
    return item
}

/**
 * Creates and returns a recipe card element based on the provided recipe object. The recipe card includes the recipe name, preparation time, list of ingredients, and description.
 * @param {Object} recipe The recipe object to generate the card for.
 * @param {string} recipe.name The name of the recipe.
 * @param {number} recipe.time The preparation time of the recipe in minutes.
 * @param {Array<Object>} recipe.ingredients The array of ingredient objects for the recipe.
 * @param {string} recipe.description The description of the recipe.
 * @returns {HTMLElement} The recipe card element.
 */
export function getCard(recipe) {
    const cardElement = document.createElement('article')
    const titleContainer = document.createElement('div')
    const contentContainer = document.createElement('div')
    const titleElement = document.createElement('h2')
    const timeElement = document.createElement('p')
    const listElement = document.createElement('ul')
    const descriptionElement = document.createElement('p')
    const listItemsElement = recipe.ingredients.map(getIngredientItem)
    listElement.append(...listItemsElement)

    timeElement.classList.add('time')
    timeElement.innerHTML = `<i class="fa-regular fa-clock"></i> ${recipe.time} min`
    
    contentContainer.classList.add('content-section')
    contentContainer.appendChild(listElement)
    contentContainer.appendChild(descriptionElement)

    descriptionElement.classList.add('description')
    descriptionElement.innerText = recipe.description

    titleElement.classList.add('title-recipe')
    titleElement.innerText = recipe.name
    
    titleContainer.classList.add('title-content')
    titleContainer.appendChild(titleElement)
    titleContainer.appendChild(timeElement)

    cardElement.append(titleContainer)
    cardElement.appendChild(contentContainer)
    
    cardElement.classList.add('title-section')

    return cardElement
}
