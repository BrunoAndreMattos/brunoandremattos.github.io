document.getElementById('hamburger').addEventListener('click', () => {
    let input = document.querySelector('input');

    if (input.checked == true) {
        input.checked = false;
    } else {
        input.checked = true;
    }
    
})
