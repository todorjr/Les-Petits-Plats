// function getCard

export function getCard(recipe) {
 return` <div class=title-section>
                <h2 class="title-recipe">${recipe.name}</h2>
                <p class="time">${recipe.time}</p>
            </div>
            <div class="content-section">
                <div class="ingrediants-section">
                    <ul>
                        <li>${recipe.ingredients[1].ingredient}</li>
                        <li>${recipe.ingredients[2].quantity}</li>
                        <li>${recipe.ingredients[3].unit}</li>
                    </ul>
                </div>
                <div class="description-section">
                    <p class="description">${recipe.description}</p>
                </div>
        </div>`
}
