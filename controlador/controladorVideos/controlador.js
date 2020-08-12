import * as funciones from './funciones.js';
import * as  peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Renderizar la vista previa del vídeo en el HTML cuando se manipule el formulario.
    funciones.vistaPreviaVideo();

    //Validar y enviar el formulario.
    funciones.validarFormulario();

    //Listar los vídeos.
    peticiones.peticionListarVideos();

    //Eliminar algún vídeo.
    funciones.eliminarVideo();
});
