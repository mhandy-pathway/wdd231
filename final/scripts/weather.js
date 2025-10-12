const cityName = 'Asuncion, PY'
const apiKey = 'e93f7c101440586913098cea82d4edf2';
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=24&appid=${apiKey}`;

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (err) {
        console.log(`An Error Occurred: ${err}`);
        return {};
    }
}
let weather_data = {};
let weather_data_loaded = false;
export async function getWeatherData() {
    if (!weather_data_loaded) {
        weather_data = await apiFetch(currentUrl);
        weather_data.forecast = await apiFetch(forecastUrl);
    }
    return weather_data;
}