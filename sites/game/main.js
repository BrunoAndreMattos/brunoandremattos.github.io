const display = document.getElementById('display');
const progress = document.getElementById('progress');
const button = document.getElementById('button');
const usdSec = document.getElementById('usd');
const totalLoad = 10;
                          
class Computer {
    constructor(isMining, coins, miningSpeed) {
        this.isMining = isMining;
        this.coins = coins;
        this.miningSpeed = miningSpeed;
        this.loadStatus = 0;
    }

    getCoins() {
        return this.coins;
    }
    
    displayCoins() {
        document.getElementById('display').textContent = `You have ${this.getCoins()} Satoshis in this machine!`;
    }

    getMiningSpeed() {
        return this.miningSpeed;
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
    
    setCoins(num) {
        this.coins = num;
    }
    
    mine() {
        if (this.isMining === false) {

            let loading = setInterval(() => {
                this.loadStatus++;
                progress.textContent += '░';
                this.isMining = true;
                
                if(this.loadStatus === totalLoad) {
                    this.coins++;
                    
                    clearInterval(loading);
                    
                    this.loadStatus = 0;
                    this.isMining = false;
                    
                    progress.textContent = '';
                    this.displayCoins();
                }
            }, this.miningSpeed);
        }
    }
    
}

const myComp = new Computer(false, 0, 400);

button.addEventListener('click', () => {
    myComp.mine();
    myComp.displayCoins();
});

var json = new XMLHttpRequest(); // start a new variable to store the JSON in
json.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok
    var object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays

    object.forEach(function(currency) { // for each of those arrays, split it into chunks called 'currency'
        if(currency.name === 'Bitcoin') {
            usdSec.textContent =  $" + currency.price_usd + " USD"; // get the array keys from the API
        }
    });
  }
};
json.open(
  "GET", // method
  "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10", // url
  true // async
); // initialise the request
json.send(); //send request