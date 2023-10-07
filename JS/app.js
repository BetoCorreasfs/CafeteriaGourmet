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
    itens.map((val) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
        
        <p>`+ val.nome + ` | quantidade: ` + val.quantidade + `</p>
        <hr>
        `;
        }
    })
}
function clickCarrinho(){
    var links = document.getElementsByTagName('a');

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                let keyplus = this.getAttribute('keyplus');
                itens[keyplus].quantidade++;
                atualizarCarrinho();
                return false;
            })
        }

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                let keymenos = this.getAttribute('keymenos');
                itens[keymenos].quantidade--;
                atualizarCarrinho();
                return false;
            })
        }
    }

    


