let pv_total = document.querySelector('#pv_total');
let pv_atual = document.querySelector('#pv_atual');
let san_total = document.querySelector('#san_total');
let san_atual = document.querySelector('#san_atual');
let contagem_total = document.querySelector('#contagem_total');
let contagem_atual = document.querySelector('#contagem_atual');
let atributo_pnt = document.querySelectorAll('.pnt');
let classe = document.querySelector('#classe');
let contagem_nome = document.querySelector('#nome_contagem');
let ca = document.querySelector('#ca');
let ficha = document.querySelector('#ficha');
let foto = document.querySelector('#foto');
let fotolabel = document.querySelector('#fotolabel');
let habilidades = document.querySelector('.habilidades');



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
    saveData();
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
    saveData();
}

function atualizarcontagem(){
document.querySelector('#contagem_atual').setAttribute('max', contagem_total.value);
    let porcentagem = (contagem_atual.value / contagem_total.value) * 100;
    let root = document.documentElement;
    root.style.setProperty('--porcento_contagem', `${porcentagem}%`);
    saveData();
}


foto.addEventListener('change', (event) => {
    let reader = new FileReader();
    reader.onload = () => {
        fotolabel.style.backgroundImage = `url(${reader.result})`;
        saveData();
    }
    reader.readAsDataURL(foto.files[0]);
});


//adiciona gatilhos nos input para atualizar os valores das barras

ficha.addEventListener('input', (event) => {
    saveData();
});

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
    contagem_total.value = 20;
}
});

//se classe igual arcano contagem 1 igual a Pontos de Mana
classe.addEventListener('change', (event) => {
    console.log(classe.value);
if (classe.value == 'arcano'){
    contagem_nome.value = 'Pontos de Mana';
}
});

// Salvar e carregar dados do localStorage
function saveData() {
    const formData = {
      ca: ca.value,
      pv_total: pv_total.value,
      pv_atual: pv_atual.value,
      san_total: san_total.value,
      san_atual: san_atual.value,
      contagem_total: contagem_total.value,
      contagem_atual: contagem_atual.value,
      classe: classe.value,
      contagem_nome: contagem_nome.value,
      atributos: {},
      foto: fotolabel.style.backgroundImage
    };

    atributo_pnt.forEach(element => {
        formData.atributos[element.getAttribute('name')] = element.value;
      });
      localStorage.setItem('formData', JSON.stringify(formData));
    
}


function loadData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      ca.value = formData.ca;
      pv_total.value = formData.pv_total;
      pv_atual.value = formData.pv_atual;
      san_total.value = formData.san_total;
      san_atual.value = formData.san_atual;
      contagem_total.value = formData.contagem_total;
      contagem_atual.value = formData.contagem_atual;
      classe.value = formData.classe;
      contagem_nome.value = formData.contagem_nome;
      if (formData.foto) {
        fotolabel.style.backgroundImage = formData.foto;
      }
      for (const name in formData.atributos) {
        const element = document.querySelector(`.pnt[name="${name}"]`);
        if (element) {
          element.value = formData.atributos[name];
          calcularmod(element);
        }
      }
      atualizarvida();
      atualizarsanidade();
      atualizarcontagem();
    }
  }

  
window.addEventListener('load', loadData);