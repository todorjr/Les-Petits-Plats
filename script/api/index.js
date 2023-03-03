/** 
 * Retrieves a JSON object containing recipe data from the specified URL. Returns a Promise that resolves with the recipe data, or rejects with an error if the network response is not ok.
@returns {Promise} A Promise that resolves with the recipe data, or rejects with an error if the network response is not ok.
*/

export async function getRecipes() {
    return fetch('data/recepies.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            return data;
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}

