document.getElementById('people-hyped').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Sell";
    this.children[0].checked = true;
});

document.getElementById('people-fearful').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Buy";
    this.children[0].checked = true;
});

