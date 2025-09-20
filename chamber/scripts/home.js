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
const threeDayForecast = document.querySelector('#three-day-forecast');


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

    // Three Day Forecast
    threeDayForecast.innerHTML = '';
    data.forecast.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const today = new Date();
        // Only show the 3 hour forecast from the noon to 2:00pm slots (depending on your time zone) so that only one forecast per day is shown
        if (date.getHours() >= 12 && date.getHours() < 15) {
            const div = document.createElement('div');

            const strong = document.createElement('strong');
            if (date.getDay() === today.getDay()) {
                strong.innerHTML = 'Today:';
            } else {
                strong.innerHTML = `${new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date)}:`;
            }
            div.appendChild(strong);

            const span = document.createElement('span');
            span.innerHTML = ` ${forecast.main.temp}&deg;C`;
            div.appendChild(span);

            threeDayForecast.appendChild(div);
        }
    })

}
