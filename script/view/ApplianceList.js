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
    button.classList.add('appliance-button')
    button.innerHTML = '<input type="text" class="input-appliance" placeholder="Appliance"><i class="fa-solid fa-chevron-down"></i>';
    const applianceBtn = document.querySelector('#appareils')
    applianceBtn.appendChild(button);
    
    button.addEventListener('click', function() {
        listElement.classList.toggle('show');
  
    });

    listElement.append(...uniqueElementList)

    return listElement
}


//TODO: Simplify the code to achieve the same result and to be able to open and close the dropdowns and only have one in a given time

// export function getItemListItem(item, className) {
//     const listItem = document.createElement('a');
//     const message = `${item}`;
//     listItem.innerHTML = message;
//     listItem.classList.add(`list-${className}-item`);
//     return listItem;
// }

// export function getListElement(className, items) {
//     const listElement = document.createElement('div');
//     listElement.classList.add(`${className}-dropdown-content`);

//     const listItems = [...new Set(items.map(item => getItemListItem(item, className)))];
//     const uniqueElementList = [...new Set(listItems.map(item => item.innerHTML))].map(item => {
//         return listItems.find(a => a.innerHTML === item);
//     });

//     const button = document.createElement('button');
//     button.classList.add(`${className}-button`);
//     button.innerHTML = `<input type="text" class="input-${className}" placeholder="${className}"><i class="fa-solid fa-chevron-down"></i>`;
//     const parent = document.querySelector(`#${className}`);
//     parent.appendChild(button);

//     button.addEventListener('click', function() {
//         listElement.classList.toggle('show');
//     });

//     listElement.append(...uniqueElementList);
//     return listElement;
// }

// export function getDropdownContent(data, className, placeholderText) {

//     const listElement = document.createElement('div')
//     listElement.classList.add(className)

//     const listItemsElement = [...new Set(data.map(item => item.toLowerCase()))].map(item => {
//         const listItemElement = document.createElement('a')
//         listItemElement.innerHTML = item.charAt(0).toUpperCase() + item.slice(1)
//         listItemElement.classList.add(`list-${className}-item`)
//         return listItemElement
//     })

//     const uniqueElementList = [...new Set(listItemsElement.map(item => item.innerHTML))].map(item => {
//         return listItemsElement.find(a => a.innerHTML === item)
//     })

//     const button = document.createElement('button')
//     button.classList.add(`${className}-button`)
//     button.innerHTML = `<input type="text" class="input-${className}" placeholder="${placeholderText}"><i class="fa-solid fa-chevron-down"></i>`

//     const dropdownContainer = document.querySelector(`#${className}`)
//     dropdownContainer.appendChild(button)

//     const closeDropdowns = () => {
//         const dropdowns = document.querySelectorAll('.dropdown-content')
//         dropdowns.forEach(dropdown => {
//             if (dropdown !== listElement) {
//                 dropdown.classList.remove('show')
//             }
//         })
//     }

//     button.addEventListener('click', () => {
//         listElement.classList.toggle('show')
//         closeDropdowns()
//     })

//     listElement.append(...uniqueElementList)

//     return listElement
// }

// const ingredients = ['Salt', 'Pepper', 'Tomato', 'Onion', 'Garlic', 'Basil']
// const appliances = ['Blender', 'Oven', 'Stove', 'Microwave', 'Toaster']
// const ustensils = ['Knife', 'Pan', 'Spoon', 'Spatula', 'Grater']

// const ingredientsDropdown = getDropdownContent(ingredients, 'ingredients-dropdown-content', 'Ingredients')
// const appliancesDropdown = getDropdownContent(appliances, 'appliance-dropdown-content', 'Appliances')
// const ustensilsDropdown = getDropdownContent(ustensils, 'ustensils-dropdown-content', 'Ustensils')

// const ingredientsContainer = document.querySelector('#ingredients')
// ingredientsContainer.appendChild(ingredientsDropdown)

// const appliancesContainer = document.querySelector('#appareils')
// appliancesContainer.appendChild(appliancesDropdown)

// const ustensilsContainer = document.querySelector('#ustensils')
// ustensilsContainer.appendChild(ustensilsDropdown)
