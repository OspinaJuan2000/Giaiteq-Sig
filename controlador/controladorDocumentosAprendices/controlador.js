import * as funciones from './funciones.js';
import * as  peticiones from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {

    //Listar los documentos.
    peticiones.peticionListarDocumentos();

    //Buscar algún documentos.
    funciones.buscarDocumentos();
});
