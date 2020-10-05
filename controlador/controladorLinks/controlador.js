import * as funciones from './funciones.js';
import * as peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los links.
    peticiones.peticionListarLinks();

    //Validar y enviar el formulario.
    funciones.validarFormulario();

    //Eliminar algún link.
    funciones.eliminarLink();


    //Editar algún vídeo.
    funciones.editarLink();

    //Buscar algún link.
    funciones.buscarLinks();
});