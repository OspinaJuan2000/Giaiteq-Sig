import * as funciones from "./funciones.js";
import * as peticiones from "./fetch.js";

document.addEventListener("DOMContentLoaded", () => {
    //Listar los documentos.
    peticiones.peticionListarDocumentos();

    //Validar y enviar el formulario.
    funciones.validarFormulario();

    //Eliminar algún documento.
    funciones.eliminarDocumento();

    //Editar algún documento.
    funciones.editarDocumento();

    //Buscar algún documento.
    funciones.buscarDocumentos();
});
