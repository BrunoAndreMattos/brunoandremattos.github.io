// Smooth scrolling
function myScroll(elem) {
    window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': elem.offsetTop
    });
}

document.querySelector('#m-what-i-know').addEventListener('click', () => {
    const elem = document.querySelector('#experience');

    myScroll(elem);
});

document.querySelector('#m-projects').addEventListener('click', () => {
    const elem = document.querySelector('#projects');

    myScroll(elem);
});

document.querySelector('#m-contact').addEventListener('click', () => {
    const elem = document.querySelector('#contact');

    myScroll(elem);
});