// HTML Sections
const usdSec = document.getElementById('usd');
const btcSec = document.getElementById('btc');
const row = document.getElementById('row');

// Machines HTML
const displaysHTML = document.getElementsByClassName('display');
const machinesHTML = document.getElementsByClassName('machine');
const verifyHTML = document.getElementsByClassName('verify');
const createBlockHTML = document.getElementsByClassName('create-block');
const solveProofOfWorkHTML = document.getElementsByClassName('solve-pow');
const proofOfWorkHTML = document.getElementsByClassName('pow');
const addToBlockChainHTML = document.getElementsByClassName('add');


// Constants
const totalLoad = 21;
const satoshiNumber = 100000000;
const listOfMachines = [];

let totalBitcoins = 0;
let numberOfMachines = 0;
                          
class Computer {
    constructor( machineId, isMining, coins, miningSpeed, miningPower) {
        this.machineId = machineId;
        this.isMining = isMining;
        this.coins = coins;
        this.miningSpeed = miningSpeed;
        this.miningPower = miningPower;
        this.loadStatus = 0;
    }

    getMachineId() {
        return this.machineId;
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
            for(let display of displaysHTML) {
                if(this.machineId === parseInt(display.parentElement.id)) {
                    display.textContent = `you have ${this.getBitcoins()} bitcoins in this machine`;
                }
            }
        } else {
            for(let display of displaysHTML) {
                if(this.machineId === parseInt(display.parentElement.id)) {
                    display.textContent = `you have ${this.getSatoshis()} satoshis in this machine`;
                }
            }
        }
    }

    updateCoins() {
        json.open(
            "GET", // method
            "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10", // url
            true // async
        ); // initialise the request

        json.send(); //send request

        this.displayCoins();
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
        this.machineId = id;
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

    makeBin() {
        let text = "";
        let possible = "01";
      
        for (let i = 0; i < 20; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    
    verifyTransaction() {
        this.isMining = true;

        for(let verify of verifyHTML) {
            if(this.machineId === parseInt(verify.parentElement.id)) {
                let maVerify = verify;

                let timer = 0;
                //Testing out 
                let verifyLoop = setInterval(() => {
                    timer++
                    timer == 10 ? maVerify.textContent += `ok!` : maVerify.textContent = `verifying transactions...`;
                    if (timer == 10) {
                        clearInterval(verifyLoop);
                        this.createBlock();
                    }
                }, this.miningSpeed);
            }
        }
    }

    createBlock() {
        for(let block of createBlockHTML) {
            if(this.machineId === parseInt(block.parentElement.id)) {
                let maBlock = block;

                maBlock.innerHTML = `creating block<br>`

                let timer = 0;
                let createBlockLoop = setInterval(() => {
                    timer++

                    if((timer % 10) === 0) {
                        maBlock.innerHTML += '░<br>';
                    } else {
                        maBlock.innerHTML += '░';
                    }

                    if (timer == 50) {
                        clearInterval(createBlockLoop);
                        this.solveProofOfWork();
                    } 
                }, this.miningSpeed);
            }
        }
    }

    solveProofOfWork() {
        for(let pow of proofOfWorkHTML) {
            if(this.machineId === parseInt(pow.parentElement.id)) {
                var maPow = pow;
            }
        }

        for(let powMessage of solveProofOfWorkHTML) {
            if(this.machineId === parseInt(powMessage.parentElement.id)) {
                let maPowM = powMessage;

                let timer = 0;
                //Testing out 
                let powMsg = setInterval(() => {
                    timer++
                    maPowM.textContent = `solving proof of work`;
                    maPow.textContent = this.makeBin();
                    if (timer == 30) {
                        clearInterval(powMsg);
                        this.addToBlockChain();
                    }
                }, this.miningSpeed);
            }
        }
    }
    
    addToBlockChain() {
        for(let add of addToBlockChainHTML) {
            if(this.machineId === parseInt(add.parentElement.id)) {
                let maAdd = add;

                let timer = 0;
                //Testing out 
                let addBlockLoop = setInterval(() => {
                    timer++
                    timer >= 10 ? maAdd.textContent = `adding to block-chain...ok!` : maAdd.textContent = `adding to block-chain...`;
                    if (timer == 10) {
                        this.coins += this.miningPower*Math.ceil(Math.random() * 50);
                        this.updateCoins();                        
                    } 
                    if (timer == 15) {
                        clearInterval(addBlockLoop);
                        this.isMining = false;
                        this.clearAll();
                    }
                }, this.miningSpeed);
            }
        }
    }
    
    clearAll() {

        for(let verify of verifyHTML) {
            if(this.machineId === parseInt(verify.parentElement.id)) {
                verify.textContent = ``;
            }
        }
        
        for(let block of createBlockHTML) {
            if(this.machineId === parseInt(block.parentElement.id)) {
                block.textContent = ``;
            }
        }

        for(let solvePow of solveProofOfWorkHTML) {
            if(this.machineId === parseInt(solvePow.parentElement.id)) {
                solvePow.textContent = ``;
            }
        }
        
        for(let pow of proofOfWorkHTML) {
            if(this.machineId === parseInt(pow.parentElement.id)) {
                pow.textContent = ``;
            }
        }
        
        for(let add of addToBlockChainHTML) {
            if(this.machineId === parseInt(add.parentElement.id)) {
                add.textContent = ``;
            }
        }
    }
    
    mine() {
        // Prevents player from mining more than one button click at a time
        if (this.isMining === false) {
            this.verifyTransaction();
        }
    }  
}

function createMachine() {
    // Increment the number of machines
    numberOfMachines++;

    // Make a new machine object
    const comp = new Computer(numberOfMachines, false, 0, 500, 1);
    // Add it to list of machines
    listOfMachines.push(comp);

    // Create the machine in HTML
    row.innerHTML +=
    `<div class="machine" id="${numberOfMachines}">
        <pre>
         _________
        / ======= \\
       / __________\\
      | ___________ |
      | |         | |
      | |         | |
      | |_________| |
      \\_____________/
      / """"""""""" \\
     / ::::::::::::: \\
    (_________________)
        </pre>
        <div class="display">you have 0 satoshis in this machine</div>
        <div class="verify"></div>
        <div class="create-block"></div>
        <div class="solve-pow"></div>
        <div class="pow"></div>
        <div class="add"></div>
    </div>`;
}

createMachine();
createMachine();

// Make every machine clickable
for(let i = 0; i < numberOfMachines; i++) {

    machinesHTML[i].addEventListener('click', () => {
        listOfMachines[i].mine()
        listOfMachines[i].displayCoins();
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

            usdSec.textContent = `your bitcoin in dollars: ${dolar}\$`; // get the array keys from the API
            btcSec.textContent = `your bitcoin: ${totalBitcoins}`;
        }
    });
  }
};