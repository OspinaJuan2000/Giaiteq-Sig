import * as peticiones from './fetch.js';

const formIngreso = document.querySelector('#form-inicio');

/*
    Esta función valida los datos del usuario que ingresa en el formulario de inicio de sesión antes de enviar la petición al Backend.
*/
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

/*
    Esta función muestra en el HTML un mensaje indicando que todos los campos son requeridos para iniciar sesión.
*/
export function mensajeCamposVacios(mensaje, error, insertar) {

    document.querySelector(`.${error}`) ? document.querySelector(`.${error}`).remove() : '';

    const elemento = document.createElement('p');
    elemento.innerHTML = mensaje;
    elemento.className = error;

    !document.querySelector(`.${error}`) ? insertar.insertBefore(elemento, insertar.childNodes[0]) : '';
}
