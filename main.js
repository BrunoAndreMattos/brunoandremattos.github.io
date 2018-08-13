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

$('#positivo').hide();
$('#negativo').hide();
$('#extrato').hide();

// API de comunicação de dados
pubnub = new PubNub({
    publishKey: 'pub-c-d21e697a-c335-48b7-acc4-3d2ecd564f4a',
    subscribeKey: 'sub-c-4ede1878-97f3-11e7-9589-26a34ceecec8'
})

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
    })
}	

$('#consultar').click(function(e) {
    e.preventDefault();
    bairro = $('#bairro').val();
    receita = $('#receita').val();
    habitantes = $('#habitantes').val();
    dormitorios = $('#quartos').val();

    let custoAluguel;
    let nomeBairro;

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
        $('#result').html('<h2> Você pode morar no ' + nomeBairro + '! </h2> <br /> <p> e ainda sobram <strong>R$' + resultado + '</strong> por mês.</p>');
        $('#result').css('background-color', '#0557028C');
    } else {
        $('#result').html('<h2> Infelizmente você ainda não pode morar no ' + nomeBairro + ' </h2> <br /> <p> Faltam <strong>R$' + Math.abs(resultado) + '</strong> por mês.</p>');
        $('#result').css("background-color", "#5300008C");
    }

    $('#extrato #fixos .fixos-preco').html(`
    <li>Luz R$${luz}</li>
    <li>Gás R$${gas}</li>
    <li>Telefone/Internet R$${telefone}</li>
    <li>Netflix R$${netflix}</li>
    <li>Condomínio R$${condominio}</li>
    <li>Alimentação R$${alimentacao}</li>
    <li>Limpeza R$${limpeza}</li>
    <li>Transporte R$${transporte}</li>
    <h3>Total de custos fixos por mês: R$${fixos} </h3>`);

    if(dormitorios == 1){
        $('.IPTU-preco').html(`Para ${dormitorios} dormitório: R$${IPTU}`);
    } else {
        $('.IPTU-preco').html(`Para ${dormitorios} dormitórios: R$${IPTU}`);
    }
    
    if(dormitorios == 1){
        $('.aluguel-preco').html(`Para ${dormitorios} dormitório: R$${custoAluguel}`);
    } else {
        $('.aluguel-preco').html(`Para ${dormitorios} dormitórios: R$${custoAluguel}`);
    }

    $('#extrato').show();

    $('html, body').animate({
        scrollTop: $("#result").offset().top
    }, 300);

    if((receita - (custoTotal / habitantes)) > 0) {
        $('#positivo').show();
    } else {
        $('#negativo').show();
    }

    publishSampleMessage();
});