let receita;
let bairro;
let habitantes;
let dormitorios;
let custoTotal;

const luz = 60;
const gas = 50;
const telefone = 150;
const netflix = 32;
const condominio = 517;
const alimentacao = 600;
const limpeza = 400;
const transporte = 720;

const fixos = luz + gas + telefone + netflix + condominio + alimentacao + limpeza + transporte;

const qt1BF = 1158; 
const qt2BF = 1505.4; 
const qt3BF = 1737; 
const qt1C = 1056; 
const qt2C = 1372.8; 
const qt3C = 1584; 
const qt1P = 1172.5; 
const qt2P = 1524.25; 
const qt3P = 1758.75; 
const qt1BV = 1386; 
const qt2BV = 1001.8; 
const qt3BV = 2079; 

const ip1BF = 71.24; 
const ip2BF = 92.62; 
const ip3BF = 106.87; 
const ip1C = 57.31; 
const ip2C = 74.5; 
const ip3C = 85.97; 
const ip1P = 84.65; 
const ip2P = 110.04; 
const ip3P = 126.97; 
const ip1BV = 106.65; 
const ip2BV = 138.52; 
const ip3BV = 159.83; 

// const m2BomFimPreco = 23.16;
// const m2CentroPreco = 21.12;
// const m2PetropolisPreco = 23.45;
// const m2BoaVistaPreco = 27.72;

// const m2Quarto1 = 50;
// const m2Quarto2 = 65;
// const m2Quarto3 = 75;

// const mediaM2BomFim = 6489;
// const mediaM2Centro = 5220;
// const mediaM2Petropolis = 7710;
// const mediaM2BoaVista = 9705;

// let calculaIPTU = (qntQuartos, mediaDom2) => {
//     return (((mediaDom2 * qntQuartos) * 0.31) * 0.0085) / 12;
// }

$('#nfoi').hide();
$('#foi').hide();

$('#ir').click(function(e) {
    e.preventDefault();
    bairro = $('#bairro').val();
    receita = $('#receita').val();
    habitantes = $('#habitantes').val();
    dormitorios = $('#quartos').val();

    let custoAluguel;

    switch (bairro) {
        case 'bom-fim':
            if(dormitorios == 1) {
                custoAluguel = qt1BF;
                IPTU = ip1BF
            } else if (dormitorios == 2) {
                custoAluguel = qt2BF;
                IPTU = ip2BF
            } else if (dormitorios == 3) {
                custoAluguel = qt3BF;
                IPTU = ip3BF
            }
        break;
        case 'centro':
            if(dormitorios == 1) {
                custoAluguel = qt1C;
                IPTU = ip1C;
            } else if (dormitorios == 2) {
                custoAluguel = qt2C;
                IPTU = ip2C;
            } else if (dormitorios == 3) {
                custoAluguel = qt3C;
                IPTU = ip3C;
            }
        break;
        case 'petropolis':
            if(dormitorios == 1) {
                custoAluguel = qt1P;
                IPTU = ip1P;
            } else if (dormitorios == 2) {
                custoAluguel = qt2P;
                IPTU = ip2P;
            } else if (dormitorios == 3) {
                custoAluguel = qt3P;
                IPTU = ip3P;
            }
        break;
        case 'boa-vista':
            if(dormitorios == 1) {
                custoAluguel = qt1BV;
                IPTU = ip1BV;
            } else if (dormitorios == 2) {
                custoAluguel = qt2BV;
                IPTU = ip2BV;
            } else if (dormitorios == 3) {
                custoAluguel = qt3BV;
                IPTU = ip3BV;
            }
        break;
    }

    custoTotal = fixos + IPTU + custoAluguel;
    
    $('form').append('<h1> Sobrou: ' + Math.ceil(receita - (custoTotal / habitantes))  + '</h1>');

    $('html, body').animate({
        scrollTop: $("main").offset().top
    }, 5000);

    if((receita - (custoTotal / habitantes)) > 0) {
        $('#foi').show();
        // $('header').append('<iframe style="width: 100%; height: 1900px" src="https://docs.google.com/forms/d/e/1FAIpQLSdWv8UV2qgxRmCOlNhqmYYLBTjc7tO1_APPxNquHYzi8yw02g/viewform"></iframe>');
    } else {
        $('#nfoi').show();
        // $('header').append('<iframe style="width: 100%; height: 1900px" src="https://docs.google.com/forms/d/e/1FAIpQLSfeVORgsPbrBwOhqdb2J_VFKeBBEknKozF2MqepSJ97-bEU2Q/viewform');
    }
});
