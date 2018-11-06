// HTML Sections
const displays = document.getElementsByClassName('display');
const progressBars = document.getElementsByClassName('progress');
const machinesHTML = document.getElementsByClassName('machine');
const usdSec = document.getElementById('usd');
const btcSec = document.getElementById('btc');
const listOfMachines = [];

// Constants
const totalLoad = 21;
const satoshiNumber = 100000000;

let totalBitcoins = 0;
                          
class Computer {
    constructor( maId, isMining, coins, miningSpeed, miningPower) {
        this.maId = maId;
        this.isMining = isMining;
        this.coins = coins;
        this.miningSpeed = miningSpeed;
        this.miningPower = miningPower;
        this.loadStatus = 0;
    }

    getMachineId() {
        return this.maId;
    }

    getSatoshis() {
        return this.coins;
    }

    getBitcoins() {
        return (this.getSatoshis()/satoshiNumber);
    }

    // Changes the display from satoshis to bitcoin according to how much the player has
    displayCoins() {
        if(this.getSatoshis() >= satoshiNumber) {
            for(let display of displays) {
                if(this.maId === parseInt(display.parentElement.id)) {
                    display.textContent = `you have ${this.getBitcoins()} bitcoins in this machine`;
                }
            }
        } else {
            for(let display of displays) {
                if(this.maId === parseInt(display.parentElement.id)) {
                    display.textContent = `you have ${this.getSatoshis()} satoshis in this machine`;
                }
            }
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

    setMachineId(id) {
        this.maId = id;
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

            for(let progress of progressBars) {
                if(this.maId === parseInt(progress.parentElement.id)) {
                    var maProgress = progress;
                }
            }
            
            // Starts mining animation part 1 using miningSpeed as animation speed
            let loading = setInterval(() => {
                // Counts how many bars are displayed and displays bars
                this.loadStatus++;
                maProgress.textContent += '░';
                
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
                    maProgress.textContent = '';

                    this.displayCoins();
                    
                    // Ends mining animation loop
                    clearInterval(loading);
                }
            }, this.miningSpeed);
        }
    }  
}

// Creates the default player's computer
const defaultComp = new Computer(1, false, 0, 100, 1);

listOfMachines.push(defaultComp);
listOfMachines.push(new Computer(2, false, 0, 100, 1));

for(let machine of machinesHTML) {

    machine.addEventListener('click', () => {
        switch (machine.id){
            case '1':
                listOfMachines[0].mine()
                listOfMachines[0].displayCoins();
            break
            case '2':
                listOfMachines[1].mine()
                listOfMachines[1].displayCoins();
            break;
        }
    });
}

let json = new XMLHttpRequest(); // start a new variable to store the JSON in

json.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { // if HTTP header 200 - ok

    let object = JSON.parse(this.responseText); // set the variable 'object' to whatever we get back, in our case it is an array of 10 different arrays

    object.forEach(function(currency) { // for each of those arrays, split it into chunks called 'currency'
        if(currency.name === 'Bitcoin') {
            totalBitcoins = 0;
            for(let machine of listOfMachines) {
                totalBitcoins += machine.getBitcoins();
            }

            totalBitcoins = totalBitcoins.toFixed(8);
            
            let dolar = (currency.price_usd * totalBitcoins).toFixed(2);

            usdSec.textContent =  `your bitcoin in dollars: ${dolar}\$`; // get the array keys from the API
            btcSec.textContent =  `your bitcoin: ${totalBitcoins}`;
        }
    });
  }
};