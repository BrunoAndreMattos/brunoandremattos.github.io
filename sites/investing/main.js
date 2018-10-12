// Last edit 06/09/2018
document.getElementById('people-hyped').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Sell";

    this.children[0].checked = true;
    this.nextElementSibling.children[0].checked = false;
});

document.getElementById('people-fearful').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Buy";
    
    this.children[0].checked = true;
    this.previousElementSibling.children[0].checked = false;
});

