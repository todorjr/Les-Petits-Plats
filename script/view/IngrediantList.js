export function getIngredientListItem (ingredient) {
    const item = document.createElement('a')
    const message = `${ingredient.ingredient}`
    item.innerHTML = message
    item.classList.add('list-ingrediant-item')
    return item
}

export function getIngrediants(ingredients) {

const listElement = document.createElement('div')
listElement.classList.add('dropdown-content')

const listItemsElement = ingredients.map(getIngredientListItem) 
const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(ingredient => {
    return listItemsElement.find(a => a.innerHTML === ingredient)
})

listElement.append(...uniqueElementList)

return listElement
}




