let nome;
mensagens = [];

// function entradaUsuario () {
//     let nome = prompt("Digite seu nome? ");
//     console.log(nome);  

// }

// entradaUsuario();

const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promisse.then(mensagensApi);

function mensagensApi (mensagem){

    mensagens = mensagem.data;
    renderizarMensagens();
}

function renderizarMensagens () {

    const ul = document.querySelector(".chat");

    for( let i = 0; i < mensagens.length; i++){
        ul.innerHTML += `
        <li>${mensagens[i].text}</li>
        `
    }

}