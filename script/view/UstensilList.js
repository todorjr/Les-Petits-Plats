export function getUstensilListItem(ustensil) {
    const item = document.createElement('a')
    const message = `${ustensil}`
    item.innerHTML = message.charAt(0).toUpperCase() + message.slice(1)
    item.classList.add('list-ustensil-item')
    return item
}

export function getUstensil(ustensil) {

    const listElement = document.createElement('div')
    listElement.classList.add('ustensils-dropdown-content')
    listElement.classList.add(`dropdown-content`)


    const listItemsElement = [...new Set(ustensil.map(getUstensilListItem))]
    const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(ustensil => {
        return listItemsElement.find(a => a.innerHTML === ustensil)

    })
    listElement.append(...uniqueElementList)

    const button = document.createElement('button');
    button.classList.add('ustensil-button')
    button.innerHTML = '<input type="text" class="input-ustensil" placeholder="Ustensil"><i class="fa-solid fa-chevron-down"></i>';
    const ustensilsBtn = document.querySelector('#ustensils')
    ustensilsBtn.appendChild(button);

    button.addEventListener('click', function() {
        const listElementContent = document.querySelector('.ustensils-dropdown-content')
        const allDropdownContent = document.querySelectorAll('.dropdown-content');
        Array.from(allDropdownContent).forEach(content => { content.classList.remove('show')})
        listElementContent.classList.toggle('show')
    });

    return listElement
}