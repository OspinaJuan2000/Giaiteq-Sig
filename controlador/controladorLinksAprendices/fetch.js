import {eliminarListaLinks, mensajeSinLinks} from '../controladorLinks/funciones.js';
import * as funciones from './funciones.js';

/*
    Esta función hace una petición al backend (PHP), recibe todos los links que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarLinks() {
    fetch('../../modelo/modeloLinks/listar-links.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'sin_links') {
                eliminarListaLinks();
                mensajeSinLinks('No se ha publicado ningún link', 'sinRegistrosBD');
            } else {
                funciones.renderizarListaLinks(data);
            }
        })
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los links que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarLinks(datosLink) {
    fetch('../../modelo/modeloLinks/buscar-links.php', {
        method: 'POST',
        body: datosLink
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'link_noencontrado') {
                mensajeSinLinks('No se ha encontrado ningún link con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.renderizarListaLinks(data);
            }
        }).catch(err => console.log(err));
}
