import { getMembers, displayMembersInGrid, displayMembersInList } from './members.js';
const directory = document.querySelector('#directory');
const gridButton = document.querySelector('#gridButton');
const listButton = document.querySelector('#listButton');

// Setup Buttons
gridButton.addEventListener('click', () => {
    displayMembersInGrid(directory, members);
});
listButton.addEventListener('click', () => {
    displayMembersInList(directory, members);
});

// Load Members
loadMembers();

// Function Definitions
let members = [];
async function loadMembers() {
    members = await getMembers();
    displayMembersInGrid(directory, members);
}