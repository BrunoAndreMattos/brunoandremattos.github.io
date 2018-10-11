// Closes the hamburger after clicked on a menu item
Array.from(document.getElementsByClassName('item-menu')).forEach((e) => {
    e.addEventListener('click', () => {
        document.getElementById('check-burger').click();
    });
});

// Changes the hambuger color after clicking according to the background
document.getElementById('check-burger').addEventListener('click', function() {
    const header = document.getElementsByTagName('header')[0];
    const projects = document.getElementById('projects');

    if(this.checked == false) {
        if ((window.scrollY < (header.offsetTop + header.offsetHeight))
         || (window.scrollY > (projects.offsetTop + projects.offsetHeight))) {

            Array.from(document.getElementsByTagName('span')).forEach((e) => {
                e.style.backgroundColor = '#f4f4f4';
            });
        }
    } else {
        Array.from(document.getElementsByTagName('span')).forEach((e) => {
            e.style.backgroundColor = '#233D4D';
        });
    }
});

// Changes the hambuger color according to the background
window.addEventListener('scroll', () => {
    const header = document.getElementsByTagName('header')[0];
    const projects = document.getElementById('projects');

    if(document.getElementById('check-burger').checked == false) {
        if ((window.scrollY < (header.offsetTop + header.offsetHeight))
         || (window.scrollY > (projects.offsetTop + projects.offsetHeight))) {

            Array.from(document.getElementsByTagName('span')).forEach((e) => {
                e.style.backgroundColor = '#f4f4f4';
            });
        } else {
            Array.from(document.getElementsByTagName('span')).forEach((e) => {
                e.style.backgroundColor = '#233D4D';
            });
        }
    }
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
    const elem = document.querySelector('#projects');

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