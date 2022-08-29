let nome;
let maisRecente;


function entradaChat () {
    nome = prompt("Digite seu nome: ");

    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{name: nome});
    
    promisse.catch(errorEntrada);
    promisse.then(carregarMensagens);
}

function renderizarMensagens (resposta) {
    console.log(resposta.data);
    let caixaMensagens = document.querySelector(".chat");

    caixaMensagens.innerHTML = "";
    
    for (let i =0; i < resposta.data.length; i++){
        const msg = resposta.data[i];
        
        if(msg.type === "private_message"){
            caixaMensagens.innerHTML += `
            <li class="privada">
                <span class="horario">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                        <span> reservadamente para </span>
                    <strong>${msg.to}: </strong>
                <span>${msg.text}</span>
            </li>
            `
        }
        if(msg.type === "message"){
            caixaMensagens.innerHTML += `
            <li class="publica">
                <span class="horario">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                        <span> reservadamente para </span>
                    <strong>${msg.to}: </strong>
                <span>${msg.text}</span>
            </li>
            `
        }
        if(msg.type === "status"){
            caixaMensagens.innerHTML += `
            <li class="cinza">
                <span class="horario">(${msg.time})</span>
                    <strong>${msg.from}</strong>
                <span>${msg.text}</span>
            </li>
            `
        }

    }
}


function carregarMensagens () {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(renderizarMensagens);
}

function errorEntrada () {
    console.log("Deu ruim!")
    nome = undefined;
}


function enviarMensagem () {

    const mensagem = document.querySelector("input").value;
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {
        from: nome,
        to: "Todos",
        text: mensagem,
        type: "message"
    });
    
    document.querySelector("input").value = "";
}

function rolarProFim(ultimaMensagem) {
    if (ultimaMensagem !== maisRecente) {
      document.querySelector(".chat li:last-child").scrollIntoView();
      maisRecente = ultimaMensagem;
    }
  }
  
function manterLogado() {
if (nome) {
    console.log("status");
    axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, {name: nome});
    }
  }

function carregarChat () {
    entradaChat();

    carregarMensagens();

    setInterval(carregarMensagens, 3000);
    setInterval(manterLogado, 5000);
}

carregarChat();