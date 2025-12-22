let pv_total = document.querySelector('#pv_total');
let pv_atual = document.querySelector('#pv_atual');
let san_total = document.querySelector('#san_total');
let san_atual = document.querySelector('#san_atual');
let contagem_total = document.querySelector('#contagem_total');
let contagem_atual = document.querySelector('#contagem_atual');
let atributo_pnt = document.querySelectorAll('.pnt');
let classe = document.querySelector('#classe');
let contagem_nome = document.querySelector('#nome_contagem');


//funções para atualizar os valores
function alterarValorPV(delta) {
 document.querySelector('#pv_atual').value = parseInt(pv_atual.value) + delta;
 atualizarvida();
}

function alterarValorSAN(delta) {
 document.querySelector('#san_atual').value = parseInt(san_atual.value) + delta;
 atualizarsanidade();
}
function alterarValorContagem(delta) {
 document.querySelector('#contagem_atual').value = parseInt(contagem_atual.value) + delta;
 atualizarcontagem();
}

//funçoes para atualizar as barras

function atualizarvida(){
document.querySelector('#pv_atual').setAttribute('max', pv_total.value);
    let porcentagem = (pv_atual.value / pv_total.value) * 100;
    let root = document.documentElement;
    root.style.setProperty('--porcento_vida', `${porcentagem}%`);
    if (porcentagem <= 20) {
        root.style.setProperty('--cor_vida', 'red');
    }else if (porcentagem <= 50) {
        root.style.setProperty('--cor_vida', 'orange');
    }else if (porcentagem > 50) {
        root.style.setProperty('--cor_vida', 'green');
    }
}

function atualizarsanidade(){
document.querySelector('#san_atual').setAttribute('max', san_total.value);
    let porcentagem = (san_atual.value / san_total.value) * 100;
    let root = document.documentElement;
    root.style.setProperty('--porcento_sanidade', `${porcentagem}%`);
    if (porcentagem <= 20) {
        root.style.setProperty('--cor_sanidade', 'red');
    }else if (porcentagem > 20) {
        root.style.setProperty('--cor_sanidade', '#5454AA');
    }
    console.log(porcentagem);
}

function atualizarcontagem(){
document.querySelector('#contagem_atual').setAttribute('max', contagem_total.value);
    let porcentagem = (contagem_atual.value / contagem_total.value) * 100;
    let root = document.documentElement;
    root.style.setProperty('--porcento_contagem', `${porcentagem}%`);
}

//adiciona gatilhos nos input para atualizar os valores das barras

pv_total.addEventListener('input', (event) => {
    atualizarvida();
});

pv_atual.addEventListener('input', (event) => {
    atualizarvida();

});

san_total.addEventListener('input', (event) => {
    atualizarsanidade();
});

san_atual.addEventListener('input', (event) => {
    atualizarsanidade();
});

contagem_total.addEventListener('input', (event) => {
    atualizarcontagem();
});

contagem_atual.addEventListener('input', (event) => {
    atualizarcontagem();
}); 

//adiciona trigger para cada input de pontos dos atributos
atributo_pnt.forEach((element) => {
    element.addEventListener('input', (event) => {
        calcularmod(element);
    });
});

//função para calcular o modificador dos atributos
function calcularmod(element){
    let element_name = element.getAttribute('name');
    let valor = parseInt(element.value);
    let mod = Math.floor((valor - 10) / 2);
    if (mod > 0){
        
        mod = '+' + mod;
    }
    let mod_element = document.querySelector(`#${element_name}_mod`);
    mod_element.value = mod;
}
//se classe igual espadachim contagem 1 igual Postura
classe.addEventListener('change', (event) => {
    console.log(classe.value);
if (classe.value == 'espadachim'){
    contagem_nome.value = 'Postura';
}
});