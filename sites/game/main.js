const display = document.getElementById('display');
const progress = document.getElementById('progress');
const button = document.getElementById('button');
const totalLoad = 10;

// types:
// Cents

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
        document.getElementById('display').textContent = `You have ${this.getCoins()} Bitcoins in this machine!`;
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