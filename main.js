// var toca = document.getElementById('toca');

// toca.addEventListener('click', tocado);

// function tocado(){
//     toca.innerHTML = 'Deixa que eu toco sozinho! haha'
// }

// var container = document.getElementById('container').addEventListener('mousemove', mudaCor);

// function mudaCor(){
//     console.log('oi');
// }

$('#toca').click(function (){

    $('#toca').text('Deixa que eu toco sozinho! haha');

    var box = $('#hitbox');

    box.animate({
        padding: 0,
        top: 500
    });
});

var x = Math.random() * 255;
var y = Math.random() * 255;
var z = Math.random() * 255;

var upX = true;
var upY = true;
var upZ = true;

$(document).mousemove(function(e){
    h = Math.random() * 5;

    if(x >= 255 && upX == true){
        upX = false;
    }
    if(x <= 0 && upX == false){
        upX = true;
    }

    if(upX == true){
        x += h;
    } else {
        x -= h;
    }

    if(y >= 255 && upY == true){
        upY = false;
    }
    if(y <= 0 && upY == false){
        upY = true;
    }

    if(upY == true){
        y += h;
    } else {
        y -= h;
    }

    if(z >= 255 && upZ == true){
        upZ = false;
    }
    if(z <= 0 && upZ == false){
        upX = true;
    }

    if(upZ == true){
        z += h;
    } else {
        z -= h;
    }

    $('body').css('background', 'rgb( ' + x + ', ' + y + ', ' + z + ')');
});