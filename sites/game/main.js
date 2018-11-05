// HTML Sections
const display = document.getElementById('display');
const progress = document.getElementById('progress');
const button = document.getElementById('button');
const usdSec = document.getElementById('usd');

// Constants
const totalLoad = 10;
const satoshiNumber = 100000000;
                          
class Computer {
    constructor(isMining, coins, miningSpeed, miningPower) {
        this.isMining = isMining;
        this.coins = coins;
        this.miningSpeed = miningSpeed;
        this.miningPower = miningPower;
        this.loadStatus = 0;
    }

    getSatoshis() {
        return this.coins;
    }

    getBitcoins() {
        return (this.getSatoshis()/satoshiNumber).toFixed(8);
    }

    // Changes the display from satoshis to bitcoin according to how much the player has
    displayCoins() {
        if(this.getSatoshis() >= satoshiNumber) {
            document.getElementById('display').textContent = `You have ${this.getBitcoins()} Bitcoins in this machine!`;
        } else {
            document.getElementById('display').textContent = `You have ${this.getSatoshis()} Satoshis in this machine!`;
        }
    }

    getMiningSpeed() {
        return this.miningSpeed;
    }
    
    getMiningPower() {
        return this.miningPower;
    }

    getIsMining() {
        return this.isMining;
    }
    
    setIsMining(bool) {
        this.isMining = bool;
    }
    
    setMiningSpeed(speed) {
        this.miningSpeed = speed;
    }

    setMiningPower(power) {
        this.miningPower = power;
    }
    
    setCoins(num) {
        this.coins = num;
    }
    
    mine() {
        // Prevents player from mining more than one button click at a time
        if (this.isMining === false) {

            // Starts mining animation part 1 using miningSpeed as animation speed
            let loading = setInterval(() => {

                // Counts how many bars are displayed and displays bars
                this.loadStatus++;
                progress.textContent += '░';

                // Set Computer to be mining
                this.isMining = true;
                
                // When the mining animation ends
                if(this.loadStatus === totalLoad) {
                    
                    // Add the acquired amout to machine total coins
                    this.coins += this.miningPower;
                    
                    // Requests Bitcoin Dollar price from Coinmarketcap using their API
                    json.open(
                        "GET", // method
                        "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10", // url
                        true // async
                    ); // initialise the request

                    json.send(); //send request
                    
                    // Reset animation counter and set Computer state to not mining
                    this.loadStatus = 0;
                    this.isMining = false;
                    
                    // Clear animation and display the updated coins value
                    progress.textContent = '';
                    this.displayCoins();
                    
                    // Ends mining animation loop
                    clearInterval(loading);
                }
            }, this.miningSpeed);
        }
    }
    
}

// Creates the default player's computer
const defaultComp = new Computer(false, 0, 100, 1);

button.addEventListener('click', () => {
    defaultComp.mine();
    defaultComp.displayCoins();
});

var json = new XMLHttpRequest(); // start a new variable to store the JSON in
json.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok
    var object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays

    object.forEach(function(currency) { // for each of those arrays, split it into chunks called 'currency'
        if(currency.name === 'Bitcoin') {
            let dolar = (currency.price_usd * defaultComp.getBitcoins()).toFixed(4);

            usdSec.textContent =  `You Bitcoin in Dollars: ${dolar}\$`; // get the array keys from the API
        }
    });
  }
};