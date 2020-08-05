import * as funciones from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {

    //Renderizar la vista previa del vídeo en el HTML cuando se manipule el formulario.
    funciones.renderizarVideo();

    //Validar y enviar el formulario.
    funciones.validarFormulario();
});
