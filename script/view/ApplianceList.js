export function getApplianceListItem(appliance) {
    const item = document.createElement('a')
    const message = `${appliance}`
    item.innerHTML = message
    item.classList.add('list-appliance-item')
    return item
}

export function getAppliance(appliance) {

    const listElement = document.createElement('div')
    listElement.classList.add('appliance-dropdown-content')

    const listItemsElement = [...new Set(appliance.map(getApplianceListItem))]
    const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(ingredient => {
        return listItemsElement.find(a => a.innerHTML === ingredient)
    })
    
    const button = document.createElement('button');
    button.innerHTML = 'Appliances';
    const applianceBtn = document.querySelector('#appareils')
    applianceBtn.appendChild(button);
    
    button.addEventListener('click', function() {
        listElement.classList.toggle('show');
    });

    listElement.append(...uniqueElementList)

    return listElement
}