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

let modalKey = 0

let idnome = 0

let quantProd = 1

let cart = []

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const seleciona = (elemento) => document.querySelector(elemento)


const abrirModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    seleciona('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.produtoWindowArea').style.opacity = 1, 150)
}


const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0
    setTimeout(() => seleciona('.produtoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    seleciona('.produtoInfo--cancelButton').addEventListener('click', fecharModal)
}

const preencheDadosDosProdutos = (prodItem, item, index) => {
    prodItem.setAttribute('prodCod', index)
    prodItem.querySelector('.prod-item-img img').src = item.img
    prodItem.querySelector('.prod-item-preco').innerHTML = `R$ ${item.preco.toFixed(2)}`
    prodItem.querySelector('.prod-item-nome').innerHTML = item.nome
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.produtoInfo h1').innerHTML = item.nome
    seleciona('.produtoInfo--precoAtual').innerHTML = `R$ ${item.preco.toFixed(2)}`
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produtos').getAttribute('prodCod')
    console.log('Pizza clicada ' + key)
    console.log(prodJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    quantProd = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const mudarQuantProd = () => {
    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantProd++
        seleciona('.produtoInfo--qt').innerHTML = quantProd
    })
    document.querySelector('.produtoInfo--qtmenos').addEventListener('click', () => {
        if (quantProd > 1) {
            quantProd--
            seleciona('.produtoInfo--qt').innerHTML = quantProd
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.produtoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')
        console.log("Pizza " + modalKey)
        // quantidade
        console.log("Quant. " + quantProd)


        let nome = seleciona('.produtoInfo h1').innerHTML = idnome
        let preco = seleciona('.produtoInfo--precoAtual').innerHTML.replace('R$ ', '')
        console.log(preco)

        let identificador = prodJson[modalKey].id
        // para adicionarmos a quantidade
        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log(key)

        if (key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantProd
        } else {
            // adicionar objeto pizza no carrinho
            let produto = {
                identificador,
                id: prodJson[modalKey].id,
                nome: prodJson[modalKey].nome,
                qt: quantProd,
                preco: parseFloat(preco) // price: price
            }
            cart.push(produto)
            console.log(produto)
            console.log('Sub total R$ ' + (produto.qt * produto.preco).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if (cart.length > 0) {
        // mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if (cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}


const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    // mostrar ou nao o carrinho
    if (cart.length > 0) {

        // mostrar o carrinho
        seleciona('aside').classList.add('show')

        // zerar meu .cart para nao fazer insercoes duplicadas
        seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total = 0

        // para preencher os itens do carrinho, calcular subtotal
        for (let i in cart) {
            // use o find para pegar o item por id
            let prodItem = prodJson.find((item) => item.id == cart[i].id)

            // em cada item pegar o subtotal
            subtotal += cart[i].preco * cart[i].qt
            console.log(cart[i].preco)

            // fazer o clone, exibir na telas e depois preencher as informacoes
            let cartItem = seleciona('.content-modelos .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            // preencher as informacoes
            cartItem.querySelector('img').src = prodItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = prodItem.nome
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            // selecionar botoes + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais')
                // adicionar apenas a quantidade que esta neste contexto
                cart[i].qt++
                // atualizar a quantidade
                atualizarCarrinho()
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos')
                if (cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.cart').append(cartItem)


        } // fim do for

        // fora do for
        // calcule desconto 10% e total
        //desconto = subtotal * 0.1
        desconto = subtotal * 0
        total = subtotal - desconto
        // exibir na tela os resultados
        // selecionar o ultimo span do elemento
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)

    } else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}




prodJson.map((item, index) => {

    let prodItem = document.querySelector('.content-modelos .produtos').cloneNode(true)

    seleciona('.produtos-area').append(prodItem)

    preencheDadosDosProdutos(prodItem, item, index)

    prodItem.querySelector('.produtos a').addEventListener('click', (e) => {
        e.preventDefault()

        let chave = pegarKey(e)

        abrirModal()

        preencheDadosModal(item)

        seleciona('.produtoInfo--qt'), innerHTML = quantProd

    })

    botoesFechar()

})

mudarQuantProd()
adicionarNoCarrinho()
abrirCarrinho()
fecharCarrinho()


/*  
  // preenchimento dos dados
  document.querySelector('.pizzaBig img').src = item.img
  document.querySelector('.pizzaInfo h1').innerHTML = item.name
  document.querySelector('.pizzaInfo--desc').innerHTML = item.description
  document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
 
})
 
document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', () => {
  document.querySelector('.pizzaWindowArea').style.display = 'none'
})
 
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
  document.querySelector('.pizzaWindowArea').style.display = 'none'
})
 
*/

/*
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
 */
const mostrarTela = () => {
    var btn = document.querySelector('.cart--finalizar');
    var container = document.querySelector('.wrapper-pedido');

    btn.addEventListener('click', function () {
        if (container.style.display === 'flex') {
            container.style.display = 'none';
        } else {
            container.style.display = 'flex'
        }

    });
}

const Enviar = () => {



    const enviar = document.getElementById('send')
    const enviarFormulario = () => {
        let carrinho = ''
        for (let produto of cart) {
            carrinho += "Produto: " + produto.nome + " Quantidade: " + produto.qt + " Valor Total: " + produto.qt * produto.preco + ".\n";
        }
        
        let end = document.getElementById("endid").value;
        let cidade = document.getElementById("ciadeid").value;
        let cep = document.getElementById("cepid").value;
        let fone = document.getElementById("foneid").value;
        let email = document.getElementById("emailid").value;
        let obs = document.getElementById("obsid").value;
        let numero = 5547999954099;
        var win = window.open(`https://wa.me/${numero}?text=Ola%20segue%20meu%20Pedido%20Endereço%20de%20Entrega%20${carrinho}%20${end}%20${cep}%20${cidade}%20${fone}%20Email%20${email}%20Obs%20${obs}`, `_blank`);
    }
    enviar.addEventListener('click', enviarFormulario);

}

mostrarTela()
Enviar()


