export function getUstensilListItem(ustensil) {
    const item = document.createElement('a')
    const message = `${ustensil}`
    item.innerHTML = message.charAt(0).toUpperCase() + message.slice(1)
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

    const button = document.createElement('button');
    button.classList.add('ustensil-button')
    button.innerHTML = 'Ustensils';
    const ustensilsBtn = document.querySelector('#ustensils')
    ustensilsBtn.appendChild(button);

    button.addEventListener('click', function() {
        listElement.classList.toggle('show');
    });

    return listElement
}