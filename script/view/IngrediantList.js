export function getIngredientListItem(ingredient) {
    const item = document.createElement('a')
    const message = `${ingredient.ingredient}`
    item.innerHTML = message
    item.classList.add('list-ingrediant-item')
    return item
}

export function getIngrediants(ingredients) {

    const listElement = document.createElement('div')
    listElement.classList.add('ingrediants-dropdown-content')
    listElement.classList.add(`dropdown-content`)

    const listItemsElement = ingredients.map(getIngredientListItem)

    // creating a new Set from the innerHTML property of each element in the listItemsElement array
    // mapping over each item in the new Set and returning the corresponding element from the listItemsElement array that has the same innerHTML value
    const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(ingredient => {
        return listItemsElement.find(a => a.innerHTML === ingredient)
    })

    const button = document.createElement('button');
    button.innerHTML = '<input type="text" class="input-ingrediants" placeholder="Ingrediants"> <i class="fa-solid fa-chevron-down"></i>';
    button.classList.add('ingredients-button')


    const ingredientsBtn = document.querySelector('#ingredients')
    ingredientsBtn.appendChild(button);
    button.addEventListener('click', function() {
        const listElementContent = document.querySelector('.ingrediants-dropdown-content')
        const allDropdownContent = document.querySelectorAll('.dropdown-content');
        Array.from(allDropdownContent).forEach(content => { content.classList.remove('show')})
        listElementContent.classList.toggle('show')
    });

    listElement.append(...uniqueElementList)

    return listElement
}




