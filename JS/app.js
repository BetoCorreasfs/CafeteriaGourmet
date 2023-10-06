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
        <img class="produto-img" src="`+ val.img + `" width="200px" />
        <p class="produto-nome">`+ val.nome + `</p>
        <a class="produto-key" key="`+ val.id + `"href="#"><img src="/imagens/plus.png" alt="Adicionar" style="width:42px;height:42px;"><a/>
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



