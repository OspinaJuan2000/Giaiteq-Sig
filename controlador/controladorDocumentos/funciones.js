import * as peticiones from "./fetch.js";
import { mensajeCamposVacios } from "../controladorEventos/funciones.js";

let editarDocumentos = false;

const formDocumentos = document.querySelector("#form-documentos");

/*
    Esta función valida que los campos que ingrese un usuario en el formulario de los documentos no estén vacíos ni contentan espacios en blanco.
    - Valida que si un documento tiene en su título un # se cambie por "sharp".
    - Valida que si un documento pesa más de 200MB se muestre inmediatamente una alerta indicando esto.
    Por último, esta función también verifica si un documento se quiere editar o no.
*/
export function validarFormulario() {
    formDocumentos.addEventListener("submit", (e) => {
        e.preventDefault();

        const datosDocumento = new FormData(formDocumentos);
        const pesoDocumento = datosDocumento.get("documento").size;
        let nombreDocumento = datosDocumento.get("documento").name;

        if (nombreDocumento.includes("#")) {
            datosDocumento.set(
                "nombreDocumento",
                `${nombreDocumento.split("#").join("sharp")}`
            );
        } else {
            datosDocumento.set("nombreDocumento", nombreDocumento);
        }

        const megaBytesMaximo = pesoDocumento / 1e6;

        if (megaBytesMaximo > 200) {
            swal.fire({
                title: "Peso máximo excedido.",
                text: "El documento excede el peso límite.",
                icon: "error",
            });
        } else if (
            datosDocumento.get("titulo").trim() === "" ||
            datosDocumento.get("descripcion").trim() === ""
        ) {
            mensajeCamposVacios();
        } else if (editarDocumentos === false) {
            desactivarBotonPublicar();
            peticiones.peticionSubirDocumento(datosDocumento);
        } else if (editarDocumentos === true) {
            desactivarBotonPublicar();
            datosDocumento.set(
                "idDocumento",
                formDocumentos.querySelector("#idDocumento").dataset.id
            );
            datosDocumento.set(
                "nombreDocumentoAnterior",
                formDocumentos.querySelector("#idDocumento").dataset.nombre
            );
            peticiones.peticionEditarDocumento(datosDocumento);
        }
    });
}

/* 
    Esta función renderiza en la vista los documentos que vengan de la base de datos.
*/
export function renderizarListaDocumentos(documentos) {
    manejoElementosListando();

    const contenedorDocumentos = document.querySelector(".contenedor-documento");

    let listaDocumentosHTMl = `
        <table id="contenedor-documento__table" class="contenedor-documento__table">
            <thead>
            <tr>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
            </thead>
    `;

    documentos.map((documento) => {
        listaDocumentosHTMl += `
            <tbody data-id="${documento.id}" data-nombre="${documento.ruta}">
                <tr>
                    <td class="documento__titulo">${documento.titulo}</td>
                    <td class="documento__descripcion">${documento.descripcion
            }</td>
                    <td><b>${documento.fecha}</b></td>
                    <td>
                        <button class="botones__acciones botones__acciones-eliminar">Eliminar</button> 
                        <button class="botones__acciones botones__acciones-editar">Editar</button> 
                        <button class="botones__acciones botones__acciones-descargar">
                            <a href="../../modelo/modeloDocumentos/${documento.ruta.substring()}" download>Descargar</a>
                        </button>
                    </td>
                </tr>
            </tbody>
        `;
    });

    listaDocumentosHTMl += "</table>";

    contenedorDocumentos.innerHTML = listaDocumentosHTMl;
}

/*
    Esta función muestra una alerta al usuario y le pregunta si quiere eliminar el documento, en caso que decida eliminarlo, se llamará a la función que envía los datos del documento seleccionado al Backend.
*/
export function eliminarDocumento() {
    const contenedorDocumentos = document.querySelector(".contenedor-documento");

    contenedorDocumentos.addEventListener("click", (e) => {
        if (e.target.classList.contains("botones__acciones-eliminar")) {
            Swal.fire({
                title: "Estás seguro que quieres eliminar el documento?",
                text: "Una vez eliminado, no se podrá recuperar",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminarlo",
                cancelButtonText: "No, cancelar",
            }).then((pregunta) => {
                if (pregunta.value) {
                    const datosDocumento = new FormData();

                    const referencia = e.target.parentElement.parentElement.parentElement;
                    const idDocumento = referencia.dataset.id;
                    const nombreDocumento = referencia.dataset.nombre
                        .split("./documentos/")
                        .join("");

                    datosDocumento.set("id", idDocumento);

                    datosDocumento.set("nombre", nombreDocumento);

                    peticiones.peticionEliminarDocumento(datosDocumento);
                }
            });
        }
    });
}

/*
    Esta función toma los datos del documento que se quiere editar y los pone en el formulario.
    También renderiza en el HTML el documento anterior.
*/
export function editarDocumento() {
    const contenedorDocumentos = document.querySelector(".contenedor-documento");

    contenedorDocumentos.addEventListener("click", (e) => {
        if (e.target.classList.contains("botones__acciones-editar")) {
            editarDocumentos = true;

            /*
                      Tomar los valores anteriores.
                  */
            const referencia = e.target.parentElement.parentElement.parentElement;
            const idDocumentoAnterior = referencia.dataset.id;
            const nombreDocumentoAnterior = referencia.dataset.nombre
                .split("./documentos/")
                .join("");
            const tituloDocumento = referencia
                .querySelector(".documento__titulo")
                .innerHTML.trim();
            const descripcionDocumento = referencia
                .querySelector(".documento__descripcion")
                .innerHTML.trim();

            insertarDatosEditar(
                idDocumentoAnterior,
                nombreDocumentoAnterior,
                tituloDocumento,
                descripcionDocumento
            );

            // renderDocumentoAnterior(nombreDocumentoAnterior);
        }
    });
}

/*
    Esta función valida que el campo para buscar un documento no este vacío, si no está vacío, hará una búsqueda en la base de datos para buscar el documento que coincida con el criterio de búsqueda.
*/
export function buscarDocumentos() {
    const buscador = document.querySelector(".buscador__input");

    buscador.addEventListener("input", (e) => {
        if (buscador.value !== "") {
            const datosDocumento = new FormData();
            datosDocumento.set("filtro", e.target.value.trim());

            peticiones.peticionBuscarDocumentos(datosDocumento);
        } else {
            peticiones.peticionListarDocumentos();
        }
    });
}

/*
    Esta función muestra un mensaje si no hay documentos publicados o si no coincide ningún documento con el criterio de búsqueda.
*/
export function manejoElementosListando() {
    const contenedorDocumentos = document.querySelector(".contenedor-documento");
    const buscadorDocumentos = document.querySelector(".buscador");

    if (document.querySelector(".no-resultados")) {
        contenedorDocumentos.nextElementSibling.remove();
    }

    contenedorDocumentos.style.overflow = "scroll";
    buscadorDocumentos.style.display = "flex";
}

/*
    Esta función se encarga de insertar en poner los datos del documento anterior en el formulario en el momento que un usuario lo quiera editar.
*/
export function insertarDatosEditar(
    idDocumentoAnterior,
    nombreDocumentoAnterior,
    tituloDocumento,
    descripcionDocumento
) {
    let tituloDocumentoHtml = formDocumentos.querySelector(".editable");
    let descripcionDocumentoHtml = formDocumentos.querySelector("trix-editor");
    let botonPublicar = formDocumentos.querySelector(".publicar button");

    document.querySelector("#titulo").value = tituloDocumento;
    tituloDocumentoHtml.innerHTML = tituloDocumento;
    descripcionDocumentoHtml.value = descripcionDocumento;

    botonPublicar.innerHTML = "Editar";
    formDocumentos
        .querySelector("#idDocumento")
        .setAttribute("data-id", idDocumentoAnterior);
    formDocumentos
        .querySelector("#idDocumento")
        .setAttribute("data-nombre", nombreDocumentoAnterior);
}

/*
    Esta función muestra un mensaje en el HTML de acuerdo a si no hay documentos publicados o si al momento de buscar un documento no coincide con el criterio de búsqueda.
*/
export function mensajeSinDocumentos(mensaje, opcion) {
    const listaDocumentos = document.querySelector(".lista-documentos");
    const buscadorDocumentos = document.querySelector(".buscador");
    const contenedorDocumentos = document.querySelector(".contenedor-documento");
    const parrafo = document.createElement("p");
    parrafo.classList.add("no-resultados");

    if (!document.querySelector(".no-resultados")) {
        parrafo.innerHTML = mensaje;
        listaDocumentos.appendChild(parrafo);

        if (opcion === "sinRegistrosBD") {
            buscadorDocumentos.style.display = "none";
        } else if (opcion === "sinFiltrosBD") {
            eliminarListaDocumentos();
            contenedorDocumentos.style.overflow = "unset";
        }
    }
}

/*
    Esta función se encarga de eliminar todo el listado de documentos.
*/
export function eliminarListaDocumentos() {
    const contenedorDocumentos = document.querySelector(".contenedor-documento");

    while (contenedorDocumentos.firstChild)
        contenedorDocumentos.removeChild(contenedorDocumentos.firstChild);
}

/*
    Esta función se encarga de desactivar el botón de publicar para que usuarios con alta latencia así presionen dos veces sobre publicar, no se publique más de una vez.
*/
export function desactivarBotonPublicar() {
    formDocumentos.querySelector(".publicar button").disabled = true;
}

/*
    Esta función activa el botón de publicar luego de que se publique o edite un documento.
*/
export function activarBotonPublicar() {
    formDocumentos.querySelector(".publicar button").disabled = false;
}

/*
    Esta función elimina el documento de la vista previa.
*/
export function eliminarDocumentoRenderizado() {
    const renderDocumentoHtml = document.querySelector(".renderizar-documento");

    while (renderDocumentoHtml.firstChild)
        renderDocumentoHtml.removeChild(renderDocumentoHtml.firstChild);
}

/*
    Esta función cambia el mensaje del botón del formulario a "Publicar" cuando ya se haya editado un documento correctamente y también pone la variable de editarDocumentos en false.
*/
export function documentoEditado() {
    let botonPublicar = formDocumentos.querySelector(".publicar button");
    botonPublicar.innerHTML = "Publicar";

    editarDocumentos = false;
}
