import { getRandomFeaturedMembers, displayMembersInGrid } from './members.js';
import { getWeatherData } from './weather.js';
const directory = document.querySelector('#directory');
const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const currentConditions = document.querySelector('#current-conditions');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const threeHourForecast = document.querySelector('#three-hour-forecast');


// Load Members
loadFeaturedMembers();
loadWeather();

// Function Definitions
let members = [];
async function loadFeaturedMembers() {
    members = await getRandomFeaturedMembers();
    displayMembersInGrid(directory, members);
}
async function loadWeather() {
    const weather_data = await getWeatherData();
    console.log(weather_data);
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

    // Three Hour Forecast
    threeHourForecast.innerHTML = '';
    data.forecast.list.forEach(forecast => {
        const div = document.createElement('div');

        const strong = document.createElement('strong');
        strong.innerHTML = `${new Intl.DateTimeFormat('en', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(forecast.dt * 1000))}:`;
        div.appendChild(strong);

        const span = document.createElement('span');
        span.innerHTML = ` ${forecast.main.temp}&deg;C`;
        div.appendChild(span);

        threeHourForecast.appendChild(div);
    })

}
