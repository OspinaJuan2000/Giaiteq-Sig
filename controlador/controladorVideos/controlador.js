import * as funciones from './funciones.js';
import * as  peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los vídeos.
    peticiones.peticionListarVideos();

    //Renderizar la vista previa del vídeo en el HTML cuando se manipule el formulario.
    funciones.vistaPreviaVideo();

    //Validar y enviar el formulario.
    funciones.validarFormulario();

    //Eliminar algún vídeo.
    funciones.eliminarVideo();

    //Editar algún vídeo.
    funciones.editarVideo();

    //Buscar algún vídeo.
    funciones.buscarVideos();
});
