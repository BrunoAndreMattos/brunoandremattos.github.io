// Closes the hamburger after clicked on a menu item
Array.from(document.getElementsByClassName('item-menu')).forEach((e) => {
    e.addEventListener('click', () => {
        document.getElementById('check-burger').click();
    });
});

// Changes the hambuger color after clicking according to the background
document.getElementById('check-burger').addEventListener('click', function() {
    const header = document.getElementById("header");
    if(this.checked == false && window.scrollY < (header.offsetTop + header.offsetHeight)) {
        Array.from(document.getElementsByTagName('span')).forEach((e) => {
            e.style.backgroundColor = '#f4f4f4';
        });
    } else {
        Array.from(document.getElementsByTagName('span')).forEach((e) => {
            e.style.backgroundColor = '#233D4D';
        });
    }
});

// Changes the hambuger color according to the background
window.addEventListener('scroll', () => {
    Array.from(document.getElementsByTagName("header")).forEach((e) => {
        if (
            window.scrollY < (e.offsetTop + e.offsetHeight) &&
            document.getElementById("check-burger").checked == false
            ) {
            Array.from(document.getElementsByTagName("span")).forEach((e) => {
                e.style.backgroundColor = '#f4f4f4';
            });
        } else {
            Array.from(document.getElementsByTagName("span")).forEach((e) => {
                e.style.backgroundColor = '#233D4D';
            });
        }
    });
});