import * as peticiones from './fetch.js';

const formIngreso = document.querySelector('#form-inicio');

export function validarFormulario() {
    formIngreso.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosUsuario = new FormData(formIngreso);

        if (
            datosUsuario.get('usuario').trim() === '' ||
            datosUsuario.get('contra').trim() === ''
        ) {
            mensajeSesiones('Los campos del usuario son requeridos', 'error-ingreso');
        } else {
            peticiones.peticion_iniciarSesion(datosUsuario);
        }
    });
}

export function mensajeSesiones(mensaje, error) {
    const elemento = document.createElement('p');
    elemento.innerHTML = mensaje;
    elemento.className = error;

    if (!document.querySelector('.error-ingreso')) {
        formIngreso.insertBefore(elemento, formIngreso.childNodes[0]);
    }

    setTimeout(() => {
        elemento.remove();
    }, 1500);
}
