export function getUstensilListItem(ustensil) {
    const item = document.createElement('a')
    const message = `${ustensil}`
    item.innerHTML = message
    item.classList.add('list-ustensil-item')
    return item
}

export function getUstensil(ustensil) {

    const listElement = document.createElement('div')
    listElement.classList.add('ustensil-dropdown-content')

    const listItemsElement = [...new Set(ustensil.map(getUstensilListItem))]
    const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(ustensil => {
        return listItemsElement.find(a => a.innerHTML === ustensil)
    })
    

    listElement.append(...uniqueElementList)

    return listElement
}