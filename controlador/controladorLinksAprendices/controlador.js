import * as funciones from './funciones.js';
import * as  peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los vídeos.
    peticiones.peticionListarLinks();

    //Buscar algún vídeo.
    funciones.buscarLinks();
});
