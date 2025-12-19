let pv_total = document.querySelector('#pv_total');
let pv_atual = document.querySelector('#pv_atual');

function alterarValor(delta) {
 document.querySelector('#pv_atual').value = parseInt(pv_atual.value) + delta;
 atualizar();
}
function atualizar(){
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
pv_total.addEventListener('input', (event) => {
    atualizar();
});

pv_atual.addEventListener('input', (event) => {
    atualizar();

});

