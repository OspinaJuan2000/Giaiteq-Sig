import * as peticiones from './fetch.js';
import {manejoElementosListando} from '../controladorLinks/funciones.js';


/* 
    Esta función renderiza en la vista las publicaciones de links que vengan de la base de datos.
*/
export function renderizarListaLinks(links) {
    manejoElementosListando();

    const contenedorLinks = document.querySelector(".contenedor-link");

    let listaLinksHTMl = `
        <table id="contenedor-documento__table" class="contenedor-documento__table">
            <thead>
            <tr>
                <th>Titulo</th>
                <th>Contenido</th>
                <th>Fecha</th>
            </tr>
            </thead>
    `;

    links.map((link) => {
        listaLinksHTMl += `
            <tbody data-id="${link.id}">
                <tr>
                    <td class="link__titulo">${link.titulo}</td>
                    <td class="link__descripcion">
                        <a target="_blank" href="${link.contenido}">${link.descripcion}</a>
                    </td>
                    <td><b>${link.fecha}</b></td>
                </tr>
            </tbody>
        `;
    });

    listaLinksHTMl += "</table>";

    contenedorLinks.innerHTML = listaLinksHTMl;
}

/*
    Esta función valida que el campo para buscar un link no este vacío, si no está vacío, hará una búsqueda en la base de datos para buscar el link que coincida con el criterio de búsqueda.
*/
export function buscarLinks() {

    const buscador = document.querySelector('.buscador__input');

    buscador.addEventListener('input', (e) => {

        if (buscador.value !== '') {

            const datosDocumento = new FormData();
            datosDocumento.set('filtro', e.target.value.trim());

            peticiones.peticionBuscarLinks(datosDocumento);
        } else {
            peticiones.peticionListarLinks();
        }
    });
}