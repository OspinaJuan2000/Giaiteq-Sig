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
            mensajeCamposVacios('Los campos del usuario son requeridos', 'campos-vaciosError', formIngreso);
        } else {
            peticiones.peticion_iniciarSesion(datosUsuario);
        }
    });
}

export function mensajeCamposVacios(mensaje, error, insertar) {

    document.querySelector(`.${error}`) ? document.querySelector(`.${error}`).remove() : '';

    const elemento = document.createElement('p');
    elemento.innerHTML = mensaje;
    elemento.className = error;

    !document.querySelector(`.${error}`) ? insertar.insertBefore(elemento, insertar.childNodes[0]) : '';
}
