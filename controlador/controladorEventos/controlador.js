import * as funciones from './funciones.js';
import * as peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los eventos.
    peticiones.peticionListarEventos();

    //Validar y enviar el formulario.
    funciones.validarFormulario();

    //Eliminar algún evento.
    funciones.cancelarEvento();

    //Editar algún evento.
    funciones.editarEvento();

    //Buscar algún vídeo.
    funciones.buscarEvento();
});
