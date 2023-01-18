export function getIngredientListItem (ingredient) {
    const item = document.createElement('a')
    const message = `${ingredient.ingredient}<br>`
    item.innerHTML = message
    item.classList.add('list-ingrediant-item')
    return item
}

export function getIngrediants(ingredients) {

const listElement = document.createElement('div')
listElement.classList.add('dropdown-content')

const listItemsElement = ingredients.map(getIngredientListItem)
listElement.append(...listItemsElement)

return listElement
}




