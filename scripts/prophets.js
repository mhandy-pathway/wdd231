const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);
    displayProphets(data.prophets);
}
function displayProphets(prophets) {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');

        const fullName = document.createElement('h2');
        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`
        card.appendChild(fullName);

        const dateOfBirth = document.createElement('p');
        dateOfBirth.innerHTML = `Date of Birth: ${prophet.birthdate}`
        card.appendChild(dateOfBirth);

        const placeOfBirth = document.createElement('p');
        placeOfBirth.innerHTML = `Place of Birth: ${prophet.birthplace}`
        card.appendChild(placeOfBirth);

        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', 340);
        portrait.setAttribute('width', 440);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}
getProphetData();