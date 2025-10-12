const navbutton = document.querySelector('#ham-btn');
const navelement = document.querySelector('#nav');
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navelement.classList.toggle('show');
})