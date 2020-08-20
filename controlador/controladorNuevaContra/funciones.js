
import * as peticiones from './fetch.js';

export function validarFormRecuperar() {
    const inputNuevaContra = document.querySelector('.recuperar-contra__input');
    const inputConfirmaNuevaContra = document.querySelector('.recuperar-contra__input--confirmar');

    inputNuevaContra.addEventListener('keyup', () => validarInputContra(inputNuevaContra, inputConfirmaNuevaContra));

    inputConfirmaNuevaContra.addEventListener('keyup', () => validarInputContra(inputNuevaContra, inputConfirmaNuevaContra));

}

function validarInputContra(inputNuevaContra, inputConfirmaNuevaContra) {
    const expresion = /^.{4,40}$/;
    const botonEnviarNuevaContra = document.querySelector('.recuperar-contra__boton');

    if (expresion.test(inputNuevaContra.value) && expresion.test(inputConfirmaNuevaContra.value) && inputNuevaContra.value === inputConfirmaNuevaContra.value) {
        botonEnviarNuevaContra.classList.add('recuperar-contra__boton--bg');
        botonEnviarNuevaContra.disabled = false;
        botonEnviarNuevaContra.style.cursor = 'pointer';
        inputNuevaContra.style.borderBottom = '4px solid rgb(46, 141, 22)';
        inputConfirmaNuevaContra.style.borderBottom = '4px solid rgb(46, 141, 22)';
        botonEnviarNuevaContra.onclick = enviarNuevaContra;
    } else {
        botonEnviarNuevaContra.classList.remove('recuperar-contra__boton--bg');
        botonEnviarNuevaContra.disabled = true;
        botonEnviarNuevaContra.style.cursor = 'default';
        inputNuevaContra.style.borderBottom = '4px solid rgb(245, 57, 0)';
        inputConfirmaNuevaContra.style.borderBottom = '4px solid rgb(245, 57, 0)';
    }
}

function enviarNuevaContra(e) {
    e.preventDefault();
    const expresion = /^.{4,40}$/;
    const inputNuevaContra = document.querySelector('.recuperar-contra__input');
    const inputConfirmaNuevaContra = document.querySelector('.recuperar-contra__input--confirmar');

    if (expresion.test(inputNuevaContra.value) && expresion.test(inputConfirmaNuevaContra.value) && inputNuevaContra.value === inputConfirmaNuevaContra.value) {
        const nuevaContra = inputConfirmaNuevaContra.value;
        const datosNuevaContra = new FormData();
        const parametros = new URLSearchParams(window.location.search);
        const tokenClave = parametros.get('code');

        datosNuevaContra.set('contra', nuevaContra);
        datosNuevaContra.set('token', tokenClave);

        peticiones.peticionEnviarNuevaContra(datosNuevaContra);
    }
}