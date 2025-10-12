// Recipes JS File
import { getRecipes, createRecipeCard } from './recipes.js';
const recipeList = document.querySelector('#recipe-list');
loadRecipes();

async function loadRecipes() {
    const recipes = await getRecipes();
    recipes.sort(() => Math.random() - 0.5);
    for (const i in recipes) {
        createRecipeCard(recipeList, recipes[i]);
    }
}