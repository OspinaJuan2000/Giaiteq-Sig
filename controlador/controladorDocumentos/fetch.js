import * as funciones from "./funciones.js";
import {
    eliminarValorTextEditor,
    eliminarValorMediumEditor,
} from "../controladorEventos/funciones.js";

const formDocumentos = document.querySelector("#form-documentos");
const buscador = document.querySelector(".buscador__input");
const contenedorDocumentos = document.querySelector(".contenedor-documento");

/*
    Esta función hace una petición al backend (PHP), envía los datos que recoge JavaScript cuando se envía el formulario para subir un documento y espera una respuesta en fórmato JSON para mostrar una alerta dependiendo que respuesta obtenga.
*/
export function peticionSubirDocumento(datosDocumento) {
    fetch("../../modelo/modeloDocumentos/subir-documento.php", {
        method: "POST",
        body: datosDocumento,
    })
        .then((response) => response.json())
        .then((data) => {
            buscador.value = "";
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = "";

            if (mensaje === "sindocumento") {
                tituloAlerta = "Debe seleccionar un archivo";
                mensajeAlerta = "Seleccione en elegir archivo y escoja un documento";
                iconoAlerta = "error";
            } else if (mensaje === "peso_excedido") {
                tituloAlerta = "Peso máximo excedido";
                mensajeAlerta = "El archivo excede el peso máximo permitido";
                iconoAlerta = "error";
            } else if (mensaje === "ya_existe") {
                tituloAlerta = "El archivo ya existe.";
                mensajeAlerta = "Este documento fue subido anteriormente";
                iconoAlerta = "error";
            } else if (mensaje === "error_subir") {
                tituloAlerta = "Error en la subida";
                mensajeAlerta = "Error al subir el documento, intente más tarde";
                iconoAlerta = "error";
            } else if (mensaje === "formato_invalido") {
                tituloAlerta =
                    "Solo se permiten los fórmatos .DOC, .DOCX, .XLSX, .PPTX y .PDF";
                mensajeAlerta =
                    "Intente nuevamente subiendo el documento en el fórmato solicitado";
                iconoAlerta = "info";
            } else if (mensaje === "subido") {
                tituloAlerta = "Documento subido correctamente";
                mensajeAlerta = `El archivo ${data.nombre.substring(30)} se subió correctamente`;
                iconoAlerta = "success";
                formDocumentos.reset();
                eliminarValorMediumEditor(1);
                eliminarValorTextEditor();
            }

            swal
                .fire({
                    title: tituloAlerta,
                    text: mensajeAlerta,
                    icon: iconoAlerta,
                })
                .then(() => {
                    funciones.activarBotonPublicar();
                    peticionListarDocumentos();
                });
        })
        .catch((err) => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe todos los documentos que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarDocumentos() {
    fetch("../../modelo/modeloDocumentos/listar-documentos.php")
        .then((response) => response.json())
        .then((data) => {
            const { mensaje } = data;
            if (mensaje === "sin_documentos") {
                funciones.eliminarListaDocumentos();
                funciones.mensajeSinDocumentos(
                    "No se ha subido ningún documento",
                    "sinRegistrosBD"
                );
            } else {
                funciones.renderizarListaDocumentos(data);
            }
        })
        .catch((err) => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe los datos del formulario y la ID del documento anterior para proceder a su actualización.
*/
export function peticionEditarDocumento(datosDocumento) {
    fetch("../../modelo/modeloDocumentos/editar-documento.php", {
        method: "POST",
        body: datosDocumento,
    })
        .then((response) => response.json())
        .then((data) => {
            buscador.value = "";
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = "";

            if (mensaje === "sindocumento") {
                tituloAlerta = "Debe seleccionar un archivo";
                mensajeAlerta = "Seleccione en elegir archivo y escoja un documento";
                iconoAlerta = "error";
            } else if (mensaje === "peso_excedido") {
                tituloAlerta = "Peso máximo excedido";
                mensajeAlerta = "El archivo excede el peso máximo permitido";
                iconoAlerta = "error";
            } else if (mensaje === "ya_existe") {
                tituloAlerta = "El archivo ya existe.";
                mensajeAlerta = "Este documento fue subido anteriormente";
                iconoAlerta = "error";
            } else if (mensaje === "error_actualizar") {
                tituloAlerta = "Error al actualizar el documento";
                mensajeAlerta = `Error al actualizar el documento ${data.nombreAnterior.substring(
                    30
                )}. No se vieron alterados ninguno de los campos o el vídeo fue borrado previamente, actualice nuevamente`;
                iconoAlerta = "error";
            } else if (mensaje === "formato_invalido") {
                tituloAlerta =
                    "Solo se permiten los fórmatos .DOC, .DOCX, .XLSX, .PPTX y .PDF";
                mensajeAlerta =
                    "Intente nuevamente subiendo el documento en el fórmato solicitado";
                iconoAlerta = "info";
            } else if (mensaje === "actualizado") {
                tituloAlerta = "Documento actualizado correctamente";
                mensajeAlerta = `El archivo ${data.nombreAnterior.substring(
                    30
                )} ha sido actualizó correctamente`;
                iconoAlerta = "success";
                formDocumentos.reset();
                eliminarValorMediumEditor(1);
                eliminarValorTextEditor();
                funciones.documentoEditado();
            }

            swal
                .fire({
                    title: tituloAlerta,
                    text: mensajeAlerta,
                    icon: iconoAlerta,
                })
                .then(() => {
                    funciones.activarBotonPublicar();
                    peticionListarDocumentos();
                });
        })
        .catch((err) => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), envía los datos del documento para proceder a su eliminación desde el Backend.
*/
export function peticionEliminarDocumento(datosDocumento) {
    fetch("../../modelo/modeloDocumentos/eliminar-documento.php", {
        method: "POST",
        body: datosDocumento,
    })
        .then((response) => response.json())
        .then((data) => {
            buscador.value = "";
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = "";

            if (mensaje === "documento_eliminado") {
                tituloAlerta = "Documento eliminado correctamente.";
                mensajeAlerta = `Se ha eliminado el documento ${data.titulo.substring(30)}`;
                iconoAlerta = "success";
                contenedorDocumentos.style.overflow = "unset";
            } else if (mensaje === "documento_noeliminado") {
                tituloAlerta = "Error al intentar eliminar";
                mensajeAlerta = `Ocurrió un error al intentar eliminar el documento ${data.titulo.substring(
                    30
                )}`;
                iconoAlerta = "error";
            }

            swal
                .fire({
                    title: tituloAlerta,
                    text: mensajeAlerta,
                    icon: iconoAlerta,
                })
                .then(() => {
                    peticionListarDocumentos();
                });
        })
        .catch((err) => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los documentos que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarDocumentos(datosDocumento) {
    fetch("../../modelo/modeloDocumentos/buscar-documentos.php", {
        method: "POST",
        body: datosDocumento,
    })
        .then((response) => response.json())
        .then((data) => {
            const { mensaje } = data;

            if (mensaje === "documento_noencontrado") {
                funciones.mensajeSinDocumentos(
                    "No se ha encontrado ningún documento con el título ingresado",
                    "sinFiltrosBD"
                );
            } else {
                funciones.renderizarListaDocumentos(data);
            }
        })
        .catch((err) => console.log(err));
}
