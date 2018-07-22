(() => {
    document.querySelectorAll('.folder').forEach(folder => {
        const ul = folder.nextElementSibling
        ul.style.display = 'none'
    })
})()

document.querySelectorAll('.folder').forEach(folder => {
    folder.onclick = (e) => {
        const ul = folder.nextElementSibling
        const display = ul.style.display

        if(display === 'none'){
            ul.style.display = 'block'
        } else {
            ul.style.display = 'none'
        }
    }
})

document.getElementById('expand-all').addEventListener("click", () => {
    document.querySelectorAll('.folder').forEach(folder => {
        const ul = folder.nextElementSibling
        ul.style.display = 'block'
    })
})

document.getElementById('close-all').addEventListener("click", () => {
    document.querySelectorAll('.folder').forEach(folder => {
        const ul = folder.nextElementSibling
        ul.style.display = 'none'
    })
})