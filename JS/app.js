function logar() {

    let validaUsuario = document.getElementById('login').value
    let validaSenha = document.getElementById('senha').value
    let validaLogin = false

    for (let i in usuarios) {
        if (validaUsuario == usuarios[i].login &&
            validaSenha == usuarios[i].pass) {
            validaLogin = true
            break

        } else {
            validaLogin = false
        }
    }

    if (validaLogin == true) {
        location.href = 'home.html';

    } else {
        alert('Login ou Senha invalidos')
    }

}

function lembrarSenha(){
    alert("Função em Construção - use Usuario: admin Senha: admin");
}

function iniciarLoja() {
    var containerProdutos = document.getElementById('produtos');
    itens.map((val) => {
        containerProdutos.innerHTML += `
        <div class="produto-single">
        <img class="produto-img" src="`+ val.img + `" width="150px" />
        <p class="produto-nome">`+ val.nome + `</p>
        <a class="produto-key" keyplus="`+ val.id + `"href="#"><img src="/imagens/plus.png" alt="Adicionar" style="width:45px"><a/>
        <a class="produto-keymenos" keymenos="`+ val.id + `"href="#"><img src="/imagens/menos.png" alt="Retirar" style="width:45px"><a/>
        
        </div>`;
    })
}

function atualizarCarrinho() {
    var containerCarrinho = document.getElementById('carrinho');  
    containerCarrinho.innerHTML = "";
    console.log(containerCarrinho);
    itens.map((val) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
        
        <p>`+ val.nome + ` | quantidade: ` + val.quantidade + `</p>
        <hr>
        `;
        }
    })
}
function clickCarrinho() {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            let keyplus = this.getAttribute('keyplus');
            itens[keyplus].quantidade++;
            atualizarCarrinho();

        })
    }

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            let keymenos = this.getAttribute('keymenos');
            itens[keymenos].quantidade--;
            atualizarCarrinho();

        })
    }
}

function mostrarTela() {
    var btn = document.querySelector('#btn-ok');
    var container = document.querySelector('.wrapper-pedido');

    btn.addEventListener('click', function () {
        if (container.style.display === 'flex') {
            container.style.display = 'none';
        } else {
            container.style.display = 'flex'
        }

    });
}

function Enviar() {

    const enviar = document.getElementById('send')
        const enviarFormulario = () => {
        let end = document.getElementById("endid").value;
        let cidade = document.getElementById("ciadeid").value;
        let cep = document.getElementById("cepid").value;
        let fone = document.getElementById("foneid").value;
        let email = document.getElementById("emailid").value;
        let obs = document.getElementById("obsid").value;
        let numero=5547999954099;
        var win= window.open(`https://wa.me/${numero}?text=Ola%20segue%20meu%20Pedido%20Endereço%20de%20Entrega%20${end}%20${cep}%20${cidade}%20${fone}%20Email%20${email}%20Obs%20${obs}`,`_blank`);
        }
        enviar.addEventListener('click',enviarFormulario);        
        
}




