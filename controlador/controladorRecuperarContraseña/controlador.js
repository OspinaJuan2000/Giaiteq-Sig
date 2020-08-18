import * as funciones from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {

    //Cuando le dé click a "¿olvidaste tu contraseña?, mostrar el formulario."
    funciones.abrirFormRecuperar();

    //Cerrar el formulario de recuperar contraseña y volver a la de iniciar sesión.
    funciones.eliminarFormRecuperar();
});
