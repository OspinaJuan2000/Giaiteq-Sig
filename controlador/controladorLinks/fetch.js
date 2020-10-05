
import * as funciones from './funciones.js';
import {eliminarValorMediumEditor} from '../controladorEventos/funciones.js';


const formLinks = document.querySelector("#form-links");
const buscador = document.querySelector(".buscador__input");

/*
    Esta función hace una petición al backend (PHP), envía los datos que recoge JavaScript cuando se envía el formulario para subir un link y espera una respuesta en fórmato JSON para mostrar una alerta dependiendo que respuesta obtenga.
*/
export function peticionSubirLink(datosLink) {
    fetch('../../modelo/modeloLinks/subir-link.php', {
        method: 'POST',
        body: datosLink
    })
        .then(response => response.json())
        .then(data => {
            buscador.value = "";
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = "";

            if (mensaje === "subido") {
                tituloAlerta = "Link publicado correctamente";
                mensajeAlerta = `El link con el título ${data.titulo} se ha subido correctamente`;
                iconoAlerta = "success";
                formLinks.reset();
                eliminarValorMediumEditor(3);
            } else if (mensaje === 'error_subir') {
                tituloAlerta = "Error al publicar";
                mensajeAlerta = "Error al publicar el link, intente más tarde";
                iconoAlerta = "error";
            }

            swal
                .fire({
                    title: tituloAlerta,
                    text: mensajeAlerta,
                    icon: iconoAlerta,
                })
                .then(() => {
                    peticionListarLinks();
                });
        })
}

/*
    Esta función hace una petición al backend (PHP), recibe todos los links que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarLinks() {
    fetch('../../modelo/modeloLinks/listar-links.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'sin_links') {
                funciones.eliminarListaLinks();
                funciones.mensajeSinLinks('No se ha publicado ningún link', 'sinRegistrosBD');
            } else {
                funciones.renderizarListaLinks(data);
            }
        })
}


/*
    Esta función hace una petición al backend (PHP), envía los datos de la publicación para proceder a su eliminación desde el Backend.
*/
export function peticionEliminarLink(datosLink) {
    fetch('../../modelo/modeloLinks/eliminar-link.php', {
        method: 'POST',
        body: datosLink
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'link_eliminado') {
                tituloAlerta = 'El link se ha eliminado correctamente.';
                mensajeAlerta = `Se ha eliminado la publicación ${data.titulo}`;
                iconoAlerta = 'success';

            } else if (mensaje === 'link_noeliminado') {
                tituloAlerta = 'Error al intentar eliminar';
                mensajeAlerta = `Ocurrió un error al intentar eliminar la publicación ${data.titulo}`;
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarLinks();
            });
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe los datos del formulario y la ID del link anterior para proceder a su actualización.
*/
export function peticionEditarLink(datosLink) {
    fetch('../../modelo/modeloLinks/editar-link.php', {
        method: 'POST',
        body: datosLink,
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';
                
            if (mensaje === 'actualizado') {
                tituloAlerta = 'Publicación actualizada correctamente';
                mensajeAlerta = `La publicación ${data.nombreAnterior} ha sido actualizó correctamente`;
                iconoAlerta = 'success';
                formLinks.reset();
                eliminarValorMediumEditor(3);
            } else if (mensaje === 'error_actualizar') {
                tituloAlerta = 'Error al intentar actualizar';
                mensajeAlerta = `Ocurrió un error al intentar actualizar la publicación ${data.nombreAnterior}`;
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => { 
                peticionListarLinks();
            });
        }).catch(err => console.log(err));
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
                funciones.mensajeSinLinks('No se ha encontrado ningún link con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.renderizarListaLinks(data);
            }
        }).catch(err => console.log(err));
}
