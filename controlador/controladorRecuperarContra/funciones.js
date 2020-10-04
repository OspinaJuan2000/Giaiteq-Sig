import * as peticiones from './fetch.js';

const botonRecuperarContra = document.querySelector('.recuperar-contra');
const contenedorInputs = document.querySelector('.contenedorInputs');
const formRecuperar = document.querySelector('.recuperar');


/*
    Esta función muestra el formulario donde se ingresa el email del usuario que quiere restablecer la contraseña.
*/
export function abrirFormRecuperar() {
    botonRecuperarContra.addEventListener('click', () => {

        contenedorInputs.style.display = 'none';
        formRecuperar.style.display = 'block';

        validarFormRecuperar();
    });
}

/*
    Esta función deja de mostrar el formulario donde se ingresa el email del usuario que quiere restablecer la contraseña.
*/
export function eliminarFormRecuperar() {
    const botonEliminarForm = document.querySelector('.recuperar__enlace');

    botonEliminarForm.addEventListener('click', () => {
        formRecuperar.style.display = 'none';
        contenedorInputs.style.display = 'block';
    });
}

/*
    Esta función valida con una expresión regular el email que ingresa el usuario, para que sea un email válido.
*/
export function validarFormRecuperar() {
    const inputEmail = document.querySelector('.recuperar__input');
    const btnEnviarEmail = document.querySelector('.recuperar__boton');
    btnEnviarEmail.style.cursor = 'not-allowed';

    inputEmail.addEventListener('keyup', (e) => {
        const expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/;

        if (expresion.test(e.target.value)) {
            btnEnviarEmail.classList.add('recuperar__boton--bg');
            btnEnviarEmail.disabled = false;
            btnEnviarEmail.style.cursor = 'pointer';
            inputEmail.style.borderBottom = '4px solid rgb(46, 141, 22)';
            btnEnviarEmail.onclick = enviarEmail;

        } else {
            btnEnviarEmail.classList.remove('recuperar__boton--bg');
            btnEnviarEmail.disabled = true;
            btnEnviarEmail.style.cursor = 'not-allowed';
            inputEmail.style.borderBottom = '4px solid rgb(245, 57, 0)';
        }
    });
}

/*
    Esta función envía los datos una vez validados del email al Backend.
*/
function enviarEmail(e) {
    e.preventDefault();
    const expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/;
    const emailAEnviar = document.querySelector('.recuperar__input').value;

    if (expresion.test(emailAEnviar)) {
        const datosRecuperacion = new FormData();

        datosRecuperacion.set('email', emailAEnviar);

        peticiones.peticionEnviarEmail(datosRecuperacion);
    }
}