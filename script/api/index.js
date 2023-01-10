const recepies = [];

fetch('recepies.json')
.then(response => response.json())
.then(data => {
    recepies.push(data);
    console.log('data',recepies);
});