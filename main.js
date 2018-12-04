// Closes the hamburger after clicked on a menu item
Array.from(document.getElementsByClassName('item-menu')).forEach((e) => {
    e.addEventListener('click', () => {
        document.getElementById('check-burger').click();
    });
});

// Smooth scrolling
function myScroll(elem) {
    window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': elem.offsetTop
    });
}

document.querySelector('#m-header').addEventListener('click', () => {
    const elem = document.querySelector('body');

    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

document.querySelector('#m-projects').addEventListener('click', () => {
    const elem = document.querySelector('main');

    myScroll(elem);
});

document.querySelector('#m-what-i-know').addEventListener('click', () => {
    const elem = document.querySelector('#what-i-know');

    myScroll(elem);
});

document.querySelector('#m-contact').addEventListener('click', () => {
    const elem = document.querySelector('#contact');

    myScroll(elem);
});

// Close the menu by clicking out
document.getElementById('click-aux').addEventListener('click', () => {
    const menu = document.getElementById('check-burger');

    if(menu.checked == true) {
        menu.click();
    }
});

document.querySelector('main').addEventListener('click', () => {
    const menu = document.getElementById('check-burger');

    if(menu.checked == true) {
        menu.click();
    }
});

document.querySelector('footer').addEventListener('click', () => {
    const menu = document.getElementById('check-burger');

    if(menu.checked == true) {
        menu.click();
    }
});