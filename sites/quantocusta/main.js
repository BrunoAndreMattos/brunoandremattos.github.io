var receita;
var bairro;
var habitantes;
var dormitorios;
var custoTotal;

var luz = 60;
var gas = 50;
var telefone = 150;
var netflix = 32;
var condominio = 517;
var alimentacao = 600;
var limpeza = 400;
var transporte = 720;

var fixos = luz + gas + telefone + netflix + condominio + alimentacao + limpeza + transporte;

var qt1BF = 1158; 
var qt2BF = 1505.4; 
var qt3BF = 1737; 
var qt1C = 1056; 
var qt2C = 1372.8; 
var qt3C = 1584; 
var qt1P = 1172.5; 
var qt2P = 1524.25; 
var qt3P = 1758.75; 
var qt1BV = 1386; 
var qt2BV = 1001.8; 
var qt3BV = 2079; 

var ip1BF = 71.24; 
var ip2BF = 92.62; 
var ip3BF = 106.87; 
var ip1C = 57.31; 
var ip2C = 74.5; 
var ip3C = 85.97; 
var ip1P = 84.65; 
var ip2P = 110.04; 
var ip3P = 126.97; 
var ip1BV = 106.65; 
var ip2BV = 138.52; 
var ip3BV = 159.83; 

$('#positivo').hide();
$('#negativo').hide();
$('#extrato').hide();

// API de comunicação de dados
pubnub = new PubNub({
    publishKey: 'pub-c-d21e697a-c335-48b7-acc4-3d2ecd564f4a',
    subscribeKey: 'sub-c-4ede1878-97f3-11e7-9589-26a34ceecec8'
});

// Função para comunicação de dados
function publishSampleMessage() {
    var publishConfig = {
        channel : "hello_world",
        message: { 
            rendimento: receita,
            bairro: bairro,
            habitantes: habitantes,
            dormitorios: dormitorios
        }
    }
    pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    });
}	

$('#tipo').text('morar sozinho');
// $('#tipo').text('ter um carro');

$('#consultar').click(function(e) {
    e.preventDefault();
    bairro = $('#bairro').val();
    receita = $('#receita').val();
    habitantes = $('#habitantes').val();
    dormitorios = $('#quartos').val();

    var custoAluguel;
    var nomeBairro;

    switch (bairro) {
        case 'bom-fim':
            nomeBairro = 'Bom Fim';
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
            nomeBairro = 'Centro';
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
            nomeBairro = 'Petropolis';
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
        case 'bela-vista':
            nomeBairro = 'Bela Vista';
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
    resultado = Math.ceil(receita - (custoTotal / habitantes));
    
    if(resultado > 0) {
        $('#result').html(
        '<div class="fechar">X</div>' +
        '<h2> Você pode morar no ' + nomeBairro + 
        '! </h2> <br /> <p> e ainda sobram <strong>R$' + resultado + 
        '</strong> por mês.</p>');
        $('#result').css('background-color', '#34DD46');
    } else {
        $('#result').html(
        '<div class="fechar">X</div>' +
        '<h2> Infelizmente você ainda não pode morar no ' + nomeBairro +
        ' </h2> <br /> <p> Faltam <strong>R$' + Math.abs(resultado) +
        '</strong> por mês.</p>');
        $('#result').css('background-color', '#FF5756'); // 8C    
    }

    $('#extrato').html(
        '<table> <tr> <th>Custo</th> <th>Média em R$</th> </tr> <tr> <td>Luz</td> <td>' + luz +
        '</td> </tr><tr> <td>Gás</td> <td>' + gas +
        '</td> </tr><tr> <td>Telefone/Internet</td> <td>' + telefone +
        '</td> </tr><tr> <td>Netflix</td> <td>' + netflix +
        '</td> </tr><tr> <td>Condomínio</td> <td>' + condominio +
        '</td> </tr><tr> <td>Alimentação</td> <td>' + alimentacao +
        '</td> </tr><tr> <td>Limpeza</td><td>' + limpeza +
        '</td> </tr><tr> <td>Transporte</td> <td>' + transporte +
        '</td> </tr><tr> <td>IPTU para ' + dormitorios + ' dormitório(s)</td> <td>' + IPTU +
        '</td></tr><tr><td>Aluguel para ' + dormitorios +' dormitório(s)</td><td>' + custoAluguel +
        '</td></tr><tr><td>Total de custos</td><td>' + Math.round(custoTotal) +
        '</td> </tr><tr><td>Total por habitante</td><td>' + Math.round(Math.abs(custoTotal / habitantes)) + '</td> </tr> </table>');
    $('#extrato').show();
    


    // if (receita - (custoTotal / habitantes) > 0) {
    //     $('#positivo').show();
    //     $('#negativo').hide();
    // } else {
    //     $('#positivo').hide();
    //     $('#negativo').show();
    // }

    // $('html, body').animate({
    //     scrollTop: $("#result").offset().top
    // }, 300);

    var modal = document.getElementById('modal');
    
    modal.style.display = "block";

    publishSampleMessage();
});

// // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}