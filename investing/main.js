document.getElementById('people-hyped').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Sell";
    this.children[1].checked = true;
});

document.getElementById('people-fearful').addEventListener('click', function() {
    document.getElementById('result').innerHTML = "Buy";
    this.children[1].checked = true;
});
