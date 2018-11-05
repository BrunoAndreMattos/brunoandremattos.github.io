const display = document.getElementById('display');
const progress = document.getElementById('progress');
const button = document.getElementById('button');
let coins = 0;
let mining = false;
let counter = 0;
let miningSpeed = 1000;



button.addEventListener('click', () => {
    document.getElementById('display').textContent = `You have ${coins} Bitcoins!`;
    if (mining === false) {
        mining = true;
        
        let a = setInterval(() => {
            counter++;
            progress.textContent += '░';
            
            if(counter === 10) {
                coins++;
                clearInterval(a);
                counter = 0;
                mining = false;
                document.getElementById('display').textContent = `You have ${coins} Bitcoins!`;
            }
        }, miningSpeed);
        
    } else {
        console.log('mining in progress');
    }

});