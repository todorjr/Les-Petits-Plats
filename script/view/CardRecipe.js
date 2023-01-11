// function getCard

/**
 * Format quantity depending on unit.
 * 
 * @param {string|number} quantity
 * @param {string|undefined} unit
 * 
 * @returns {string}
 */
function quantityUnitFormatter (quantity, unit) {
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
 * 
 * @param {object} ingredient Ingredient to be formatted
 * @returns {HTMLLIElement}
 */
function getIngredientItem (ingredient) {
    const item = document.createElement('li')

    const quantityText = quantityUnitFormatter(ingredient.quantity, ingredient.unit)
    const message = `${ingredient.ingredient}: ${quantityText}`

    item.innerText = message

    return item
}

export function getCard(recipe) {
    const cardElement = document.createElement('article')
    const titleElement = document.createElement('h2')
    const listElement = document.createElement('ul')
    const listItemsElement = recipe.ingredients.map(getIngredientItem)
    
    listElement.append(...listItemsElement)

    titleElement.classList.add('title-recipe')
    titleElement.innerText = recipe.name

    cardElement.append(titleElement)
    cardElement.appendChild(listElement)
    
    cardElement.classList.add('title-section')

    return cardElement
    
 return` <div class=title-section>
                <h2 class="title-recipe">${recipe.name}</h2>
                <p class="time"><i class="fa-regular fa-clock"></i> ${recipe.time} min </p>
            </div>
            <div class="content-section">
                <div class="ingrediants-section">
                    <ul>
                    
                    </ul>
                </div>
                <div class="description-section">
                    <p class="description">${recipe.description}</p>
                </div>
        </div>`
}
