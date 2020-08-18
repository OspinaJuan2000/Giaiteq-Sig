import * as funciones from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {

    //Cuando le dé click a "¿olvidaste tu contraseña?"
    funciones.recuperarContra();

    //Cerrar la vista de recuperar contraseña y volver a la de iniciar.
    funciones.eliminarFormRecuperar();
});
