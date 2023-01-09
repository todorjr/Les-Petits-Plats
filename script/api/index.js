fetch('recepies.json')
.then(response => response.json())
.then(data => {
    console.log(data);
});
    // we are now have access to all data from data.json file   
