export function getIngredientListItem (ingredient) {
    const item = document.createElement('li')
    const message = `${ingredient.ingredient}<br>`
    item.innerHTML = message
    item.classList.add('list-ingrediant-item')
    console.log('item', item);
    return item
}

export function getIngrediants(recipe) {

const listElement = document.createElement('ul')

const listItemsElement = recipe.ingredients.map(getIngredientListItem)
listElement.append(...listItemsElement)

return listElement
}




