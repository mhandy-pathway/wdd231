// import { getRandomFeaturedMembers, displayMembersInGrid } from './members.js';
import { getWeatherData } from './weather.js';
import { getAFeaturedRecipe, createRecipeCard, displayRecipeDialog } from './recipes.js';
import { cartItems, loadCart } from './cart.js';
import { findProductById } from './products.js';
// const directory = document.querySelector('#directory');
const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const currentConditions = document.querySelector('#current-conditions');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const eventsAndWeather = document.querySelector('.events-and-weather');
const cartStats = document.querySelector('#cart-stats');


// Load Members
// loadFeaturedMembers();
loadWeather();
loadFeaturedRecipe();
loadCartStats();

// Function Definitions
// let members = [];
// async function loadFeaturedMembers() {
//     members = await getRandomFeaturedMembers();
//     displayMembersInGrid(directory, members);
// }
async function loadWeather() {
    const weather_data = await getWeatherData();
    displayWeather(weather_data);
}

async function displayWeather(data) {
    // Current Weather
    currentTemp.innerHTML = `<strong>Temperature:</strong> ${data.main.temp}&deg;C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    currentConditions.innerHTML = `<strong>Conditions:</strong> ${data.weather[0].description}`;
    humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;
    wind.innerHTML = `<strong>Wind:</strong> ${data.wind.speed} kph`;
    sunrise.innerHTML = `<strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.innerHTML = `<strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

}
async function loadFeaturedRecipe() {
    const recipe = await getAFeaturedRecipe();
    createRecipeCard(eventsAndWeather, recipe);
}
async function loadCartStats() {
    await loadCart();
    if (cartItems.length > 0) {
        let items = 0;
        let total = 0;
        for (const i in cartItems) {
            const product = await findProductById(cartItems[i].id);
            items += cartItems[i].qty;
            total += cartItems[i].qty * product.price;
        }
        cartStats.innerHTML = `
            <p>
                <strong>Items in Shopping Cart:</strong> ${items}<br>
                <strong>Grand Total:</strong> $${total.toFixed(2)}
            </p>
            <a href="products.html" class="main">Purchase Products</a>
        `;
    } else {
        cartStats.innerHTML = `
            <div class="center">Your Shopping Cart is Empty</div>
            <a href="products.html" class="main">Purchase Products</a>
        `
    }
}
