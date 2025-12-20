let pv_total = document.querySelector('#pv_total');
let pv_atual = document.querySelector('#pv_atual');
let san_total = document.querySelector('#san_total');
let san_atual = document.querySelector('#san_atual');


function alterarValorPV(delta) {
 document.querySelector('#pv_atual').value = parseInt(pv_atual.value) + delta;
 atualizarvida();
}

function alterarValorSAN(delta) {
 document.querySelector('#san_atual').value = parseInt(san_atual.value) + delta;
 atualizarsanidade();
}

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
        root.style.setProperty('--cor_sanidade', 'rgb(84, 84, 170);');
    }
}

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

