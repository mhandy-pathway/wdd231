// Recipes JS File
const recipes_url = 'data/recipes.json';
let recipes = [];

// Functions
export async function getRecipes() {
    if (recipes.length === 0) {
        try {
            const response = await fetch(recipes_url);
            if (response.ok) {
                recipes = await response.json();
            } else {
                throw Error(await response.text());
            }
        } catch (err) {
            console.log(`An Error Occurred: ${err}`);
        }
    }
    return recipes;
}
export async function getAFeaturedRecipe() {
    const recipes = await getRecipes();
    const randomized_featured_recipes = recipes.filter(recipe => recipe.featured).sort(() => Math.random() - 0.5);
    return randomized_featured_recipes[0];
}
export async function createRecipeCard(parentElement, recipe) {
    const section = document.createElement('section');
    section.classList.add('box', 'recipe')
    section.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" width="340" height="200" alt="${recipe.name}" loading="lazy">
        <p>${recipe.description}</p>
        <button class="main">View Recipe</button>
    `;
    const button = section.querySelector('button');
    button.addEventListener('click', () => { displayRecipeDialog(recipe) })
    parentElement.appendChild(section);
}
export async function displayRecipeDialog(recipe) {
    // Get Dialog
    let dialog = document.querySelector('#recipe_dialog');
    if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'recipe_dialog');
        dialog.classList.add('recipe');
        document.body.appendChild(dialog);
    }
    dialog.innerHTML = `
        <h2>Recipe for ${recipe.name}</h2>
        <img src="${recipe.image}" width="340" height="200" alt="${recipe.name}" loading="lazy">
        <p>${recipe.description}</p>
        <strong>Ingredients:</strong>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('\n')}
        </ul>
        <strong>Instructions:</strong>
        <ol>
            ${recipe.steps.map(step => `<li>${step}</li>`).join('\n')}
        </ol>
        <button class="main">Close Recipe</button>
    `;
    const button = dialog.querySelector('button');
    button.addEventListener('click', () => { dialog.close(); })
    dialog.showModal();
}