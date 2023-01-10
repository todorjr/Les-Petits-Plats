export async function getRecepies() {
    return fetch('data/recepies.json')
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
        })
        .then(data => {
            console.log(data);
          })
        .catch((error) => console.error("FETCH ERROR:", error));
}

