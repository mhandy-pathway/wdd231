import { places } from '../data/places.js';
const discoverPlaces = document.querySelector("#discover-places");
places.sort(() => Math.random() - 0.5).forEach(place => {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2>${place.name}</h2>
        <figure><img src="images/${place.image}.webp" alt="${place.name}" loading="lazy"></figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
    `;
    discoverPlaces.appendChild(section);
});
const lastVisitText = document.querySelector('#last-visit');
const lastVisit = parseInt(localStorage.getItem('lastVisitTimestamp'));
if (lastVisit > 0 && (Date.now() / 1000) - lastVisit > 86400) {
    const days_ago = Math.floor(((Date.now() / 1000) - lastVisit) / 86400);
    lastVisitText.innerHTML = `You last visited ${days_ago} day${ days_ago > 1 ? "s" : "" } ago.`;
} else if (lastVisit > 0) {
    lastVisitText.innerHTML = "Back so soon! Awesome!";
} else {
    lastVisitText.innerHTML = "Welcome! Let us know if you have any questions.";
}
localStorage.setItem('lastVisitTimestamp', Date.now() / 1000);