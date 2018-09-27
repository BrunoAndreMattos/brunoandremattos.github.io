Array.from(document.getElementsByClassName('item-menu')).forEach(function(e) {
    e.addEventListener('click', function () {
        document.getElementById('check-burger').click();
    });
});