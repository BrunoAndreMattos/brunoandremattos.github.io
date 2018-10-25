let timer = 0;
const button = document.querySelector('p');

button.addEventListener('click', () => {
    timer++;
    button.textContent() = `click me ${timer}!`;
});