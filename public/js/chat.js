const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://restserver-ir.herokuapp.com/api/auth/';

let usuario = null;
let socket = null;

//Validar el token del localstorage
const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location = "index.html";
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: {
            'x-token': token
        }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    // console.log(userDB, tokenDB);
    localStorage.setItem('token', tokenDB);

    usuario = userDB;
}

const main = async() => {

    //Validar JWT
    await validarJWT();
}

main();

//const socket = io();