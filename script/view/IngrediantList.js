export function getIngredientListItem (ingredient) {
    const item = document.createElement('a')
    const message = `${ingredient.ingredient}`
    item.innerHTML = message
    console.log('item', item);
    return item
}

export function getIngrediants(recipe) {

const listElement = document.createElement('div')

const listItemsElement = recipe.ingredients.map(getIngredientListItem)
listElement.append(...listItemsElement)

return listElement
}




