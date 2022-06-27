let mensagens = [];

let nome = prompt('Digite seu nome: ')

buscarMensagens();

function buscarMensagens(){
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(buscarDados);
}

function buscarDados(resposta){
    console.log(resposta.data);
    mensagens = resposta.data;
    renderizarMesnsagens();
}



function renderizarMesnsagens(){

    const ul = document.querySelector('.mensagens');
    ul.innerHTML = "";
    for(let i = 0; i < mensagens.length; i++){

        ul.innerHTML += `
        <li>
            <span>{</span>
            ${mensagens[i].time}
            <span>}</span>
            <span class="bold">${mensagens[i].from}</span>
            <span> para </span>
            <span class="bold">${mensagens[i].to}</span>
            ${mensagens[i].text}
        </li>
        `
    }
}

reiderizarMensagens();

function cadastrarPessoa(){
    const name = nome;
    const texto = document.querySelector('.text').value;

    const novaMensagem = {
        from: name,
        text: texto
    }
    console.log(novaMensagem);

    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages')
}
