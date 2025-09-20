const url = './data/members.json';
let members = [];
let loaded_members = false;
const membershipSilver = 2;
const membershipGold = 3;
export async function getMembers() {
    if (loaded_members) {
        return members;
    } else {
        const response = await fetch(url);
        members = await response.json();
        return members;
    }
}
export async function getRandomFeaturedMembers(max_results = 3) {
    const featured_members = (await getMembers()).filter(member => member.membershipLevel === membershipSilver || member.membershipLevel === membershipGold);
    const random_featured_members = featured_members.sort(element => Math.random() - 0.5);
    return random_featured_members.slice(0, max_results);
}
export function displayMembersInGrid(parent_element, members) {
    parent_element.innerHTML = '';

    const grid_div = document.createElement('div');
    grid_div.classList.add('member_grid');
    parent_element.appendChild(grid_div);

    members.forEach((member) => {
        const section = document.createElement('section');
        section.classList.add('member');
        grid_div.appendChild(section);

        const img = document.createElement('img');
        img.setAttribute('src', member.image);
        img.setAttribute('width', 150);
        img.setAttribute('height', 100);
        img.setAttribute('alt', `Image of ${member.name}`);
        img.setAttribute('loading', 'lazy');
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
export function displayMembersInList(parent_element, members) {
    parent_element.innerHTML = '';

    const table = document.createElement('table');
    table.setAttribute('cellSpacing', 0);
    table.setAttribute('cellPadding', 0);
    table.classList.add('directory')
    parent_element.appendChild(table);

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