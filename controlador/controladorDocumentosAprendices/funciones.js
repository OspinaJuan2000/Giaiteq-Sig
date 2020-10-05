import * as peticiones from './fetch.js';
import {manejoElementosListando} from '../controladorDocumentos/funciones.js';


/* 
    Esta función renderiza en la vista los documentos que vengan de la base de datos.
*/
export function renderizarListaDocumentos(documentos) {

    manejoElementosListando();

    const contenedorDocumentos = document.querySelector('.contenedor-documento');

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

    documentos.map(documento => {
        listaDocumentosHTMl += `
            <tbody data-id="${documento.id}" data-nombre="${documento.ruta}">
                <tr>
                    <td class="documento__titulo">${documento.titulo}</td>
                    <td class="documento__descripcion">${documento.descripcion}</td>
                    <td><b>${documento.fecha}</b></td>
                    <td>
                        <button class="botones__acciones botones__acciones-descargar">
                            <a href="../../modelo/modeloDocumentos/${documento.ruta.substring(2)}" download>Descargar</a>
                        </button>
                    </td>
                </tr>
            </tbody>
        `
    });

    listaDocumentosHTMl+= '</table>';

    contenedorDocumentos.innerHTML = listaDocumentosHTMl;
}


/*
    Esta función valida que el campo para buscar un documento no este vacío, si no está vacío, hará una búsqueda en la base de datos para buscar el documento que coincida con el criterio de búsqueda.
*/
export function buscarDocumentos() {

    const buscador = document.querySelector('.buscador__input');

    buscador.addEventListener('input', (e) => {

        if (buscador.value !== '') {

            const datosDocumento = new FormData();
            datosDocumento.set('filtro', e.target.value.trim());

            peticiones.peticionBuscarDocumentos(datosDocumento);
        } else {
            peticiones.peticionListarDocumentos();
        }
    });
}
