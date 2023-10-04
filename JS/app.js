const usuarios = [
    {
        login: 'admin',
        pass: 'admin'
    },
    {
        login: 'beto',
        pass: 'beto'
    }
]


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