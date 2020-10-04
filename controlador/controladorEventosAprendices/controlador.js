import * as funciones from './funciones.js';
import * as peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los eventos.
    peticiones.peticionListarEventos();

    //Buscar algún vídeo.
    funciones.buscarEvento();
});