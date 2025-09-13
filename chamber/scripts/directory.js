const url = './data/members.json';
const directory = document.querySelector('#directory');
const gridButton = document.querySelector('#gridButton');
const listButton = document.querySelector('#listButton');

// Setup Buttons
gridButton.addEventListener('click', () => {
    displayMembersInGrid();
});
listButton.addEventListener('click', () => {
    displayMembersInList();
});

// Member Functions
let members = [];
async function getMembers() {
    const response = await fetch(url);
    members = await response.json();
    displayMembersInGrid();
}
function displayMembersInGrid() {
    directory.innerHTML = '';

    const grid_div = document.createElement('div');
    grid_div.classList.add('grid');
    directory.appendChild(grid_div);

    members.forEach((member) => {
        const section = document.createElement('section');
        section.classList.add('member');
        grid_div.appendChild(section);

        const img = document.createElement('img');
        img.setAttribute('src', member.image);
        img.setAttribute('alt', `Image of ${member.name}`);
        section.appendChild(img);

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.innerHTML = member.name;
        section.appendChild(nameDiv);

        const addressDiv = document.createElement('div');
        addressDiv.innerHTML = member.address;
        section.appendChild(addressDiv);

        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = member.phone;
        section.appendChild(phoneDiv);

        const websiteDiv = document.createElement('div');
        websiteDiv.innerHTML = `<a href="${member.website}" target="_blank">🔍 View Website</a>`;
        section.appendChild(websiteDiv);
    })

}
function displayMembersInList() {
    directory.innerHTML = '';

    const table = document.createElement('table');
    table.setAttribute('cellSpacing', 0);
    table.setAttribute('cellPadding', 0);
    table.classList.add('directory')
    directory.appendChild(table);

    const thead = document.createElement('thead');
    table.appendChild(thead);

    const tr = document.createElement('tr');
    thead.appendChild(tr);

    const nameTh = document.createElement('th');
    nameTh.innerHTML = 'Name';
    tr.appendChild(nameTh);

    const addressTh = document.createElement('th');
    addressTh.innerHTML = 'Address';
    tr.appendChild(addressTh);

    const phoneTh = document.createElement('th');
    phoneTh.innerHTML = 'Phone';
    tr.appendChild(phoneTh);

    const websiteTh = document.createElement('th');
    websiteTh.innerHTML = 'Website';
    tr.appendChild(websiteTh);

    const smallListTh = document.createElement('th');
    smallListTh.innerHTML = '&nbsp;';
    tr.appendChild(smallListTh);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    members.forEach((member) => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        const nameTd = document.createElement('td');
        nameTd.classList.add('large');
        nameTd.innerHTML = member.name;
        tr.appendChild(nameTd);

        const addressTd = document.createElement('td');
        addressTd.classList.add('large');
        addressTd.innerHTML = member.address;
        tr.appendChild(addressTd);

        const phoneTd = document.createElement('td');
        phoneTd.classList.add('large');
        phoneTd.innerHTML = member.phone;
        tr.appendChild(phoneTd);

        const websiteTd = document.createElement('td');
        websiteTd.classList.add('large');
        websiteTd.innerHTML = `<a href="${member.website}" target="_blank">🔍 View Website</a>`;
        tr.appendChild(websiteTd);

        const smallListTd = document.createElement('td');
        smallListTd.classList.add('small');
        smallListTd.innerHTML = `
            <span class="label">Name:</span><span>${member.name}</span>
            <span class="label">Address:</span><span>${member.address}</span>
            <span class="label">Phone:</span><span>${member.phone}</span>
            <span class="label">Website:</span><span><a href="${member.website}" target="_blank">🔍 View Website</a></span>
        `;
        tr.appendChild(smallListTd);
    })
}
getMembers();