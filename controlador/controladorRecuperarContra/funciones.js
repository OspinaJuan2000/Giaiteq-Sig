import * as peticiones from './fetch.js';

const botonRecuperarContra = document.querySelector('.recuperar-contra');
const contenedorInputs = document.querySelector('.contenedorInputs');
const formRecuperar = document.querySelector('.recuperar');

export function abrirFormRecuperar() {
    botonRecuperarContra.addEventListener('click', () => {

        contenedorInputs.style.display = 'none';
        formRecuperar.style.display = 'block';

        validarFormRecuperar();
    });
}

export function eliminarFormRecuperar() {
    const botonEliminarForm = document.querySelector('.recuperar__enlace');

    botonEliminarForm.addEventListener('click', () => {
        formRecuperar.style.display = 'none';
        contenedorInputs.style.display = 'block';
    });
}

export function validarFormRecuperar() {
    const inputEmail = document.querySelector('.recuperar__input');

    inputEmail.addEventListener('keyup', (e) => {
        const expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/;
        const btnEnviarEmail = document.querySelector('.recuperar__boton');

        if (expresion.test(e.target.value)) {
            btnEnviarEmail.classList.add('recuperar__boton--bg');
            btnEnviarEmail.disabled = false;
            btnEnviarEmail.style.cursor = 'pointer';
            btnEnviarEmail.onclick = enviarEmail;
        } else {
            btnEnviarEmail.classList.remove('recuperar__boton--bg');
            btnEnviarEmail.disabled = true;
            btnEnviarEmail.style.cursor = 'default';
        }
    });
}


function enviarEmail(e) {
    e.preventDefault();

    const emailAEnviar = document.querySelector('.recuperar__input').value;
    const datosRecuperacion = new FormData();
    datosRecuperacion.set('email', emailAEnviar);

    peticiones.peticionEnviarEmail(datosRecuperacion);
}