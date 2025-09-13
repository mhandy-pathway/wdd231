const curyearspan = document.querySelector('#currentyear');
const lastmodifiedspan = document.querySelector('#lastModified');
const today = new Date();
curyearspan.innerHTML = `&copy; ${today.getFullYear()}`;
lastmodifiedspan.textContent = `Last Modified: ${document.lastModified}`;