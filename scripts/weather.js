const locationName = document.querySelector('#location-name');
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');
const lat = -25.38;
const lon = -57.60;
const cityName = 'Ilorin, Nigeria'
const apiKey = 'e93f7c101440586913098cea82d4edf2';
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (err) {
        console.log(`An Error Occurred: ${err}`);
    }
}
function displayResults(data) {
    locationName.innerHTML = `${data.name}, ${data.sys.country}`;
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.innerHTML = data.weather[0].description;
}
apiFetch();