let coins = 0;
const button = document.getElementById('button');


button.addEventListener('click', () => {
    coins++;
    document.getElementById('display').textContent = `You have ${coins} coins!`;
});

// setInterval(() => {button.click();}, 500);