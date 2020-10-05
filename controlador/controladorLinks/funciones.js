
import * as peticiones from './fetch.js';
import { mensajeCamposVacios } from '../controladorEventos/funciones.js';

const formLinks = document.querySelector('#form-links');
let editarLinks = false;

export function validarFormulario () {

    formLinks.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosLink = new FormData(formLinks);

        if (datosLink.get('titulo').trim() === '' || datosLink.get('descripcion').trim() === '') {
            mensajeCamposVacios();
        } else if (editarLinks === false) {
            peticiones.peticionSubirLink(datosLink);
        } else if (editarLinks === true) {
            datosLink.set('idLink', formLinks.querySelector('#idLink').dataset.id);
            peticiones.peticionEditarLink(datosLink);
        }
    });
}

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
                <th>Acciones</th>
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
                    <td>
                        <button class="botones__acciones botones__acciones-eliminar">Eliminar</button> 
                        <button class="botones__acciones botones__acciones-editar">Editar</button> 
                    </td>
                </tr>
            </tbody>
        `;
    });

    listaLinksHTMl += "</table>";

    contenedorLinks.innerHTML = listaLinksHTMl;
}


/*
    Esta función muestra una alerta al usuario y le pregunta si quiere eliminar la publicación del link, en caso que decida eliminarlo, se llamará a la función que envía los datos del la publicación del link al Backend.
*/
export function eliminarLink() {

    const contenedorLinks = document.querySelector('.contenedor-link');

    contenedorLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('botones__acciones-eliminar')) {

            Swal.fire({
                title: 'Estás seguro que quieres eliminar el vídeo?',
                text: "Una vez eliminado, no se podrá recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'No, cancelar'

            }).then(pregunta => {
                if (pregunta.value) {
                    const datosLink = new FormData();
                    
                    const referencia = e.target.parentElement.parentElement.parentElement;
                    const idDocumento = referencia.dataset.id;
                    const tituloDocumento = referencia.querySelector('.link__titulo').innerHTML.trim();

                    datosLink.set('id', idDocumento);
                    datosLink.set('titulo', tituloDocumento);

                    peticiones.peticionEliminarLink(datosLink);
                }
            })
        }
    });
}

/*
    Esta función toma los datos del link que se quiere editar y los pone en el formulario.
*/
export function editarLink() {

    const contenedorLinks = document.querySelector('.contenedor-link');

    contenedorLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('botones__acciones-editar')) {

            editarLinks = true;

            /*
                Tomar los valores anteriores.
            */
            const referencia = e.target.parentElement.parentElement.parentElement;
            const idLinkAnterior = referencia.dataset.id;
            const tituloLinkAnterior = referencia.querySelector('.link__titulo').innerHTML.trim();
            const descripcionLinkAnterior = referencia.querySelector('.link__descripcion').innerHTML.trim();
            

            insertarDatosEditar(idLinkAnterior, tituloLinkAnterior, descripcionLinkAnterior);
        }
    });
}

/*
    Esta función se encarga de insertar en poner los datos del link anterior en el formulario en el momento que un usuario lo quiera editar.
*/
export function insertarDatosEditar(idLinkAnterior, tituloLinkAnterior, descripcionLinkAnterior) {

    let tituloLinkHtml = formLinks.querySelector('.editable');
    let descripcionLinkHtml = formLinks.querySelector('.editableone');
    let botonPublicar = formLinks.querySelector('.publicar button');
    
    tituloLinkHtml.innerHTML = tituloLinkAnterior;
    descripcionLinkHtml.innerHTML = descripcionLinkAnterior;

    formLinks.querySelector('#titulo').value = tituloLinkAnterior;
    formLinks.querySelector('#descripcion').value = descripcionLinkAnterior;

    botonPublicar.innerHTML = 'Editar';
    formLinks.querySelector('#idLink').setAttribute('data-id', idLinkAnterior);
    formLinks.querySelector('#idLink').setAttribute('data-nombre', tituloLinkAnterior);
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

/*
    Esta función muestra un mensaje si no hay publicaciones de links o si no coincide ninguna publicación con el criterio de búsqueda.
*/
export function manejoElementosListando() {

    const contenedorLinks = document.querySelector('.contenedor-link');
    const buscadorLinks = document.querySelector('.buscador');

    if (document.querySelector('.no-resultados')) {
        contenedorLinks.nextElementSibling.remove();
    }

    buscadorLinks.style.display = 'flex';
}

/*
    Esta función se encarga de eliminar todo el listado de links.
*/
export function eliminarListaLinks() {
    const contenedorLinks = document.querySelector(".contenedor-link");

    while (contenedorLinks.firstChild)
        contenedorLinks.removeChild(contenedorLinks.firstChild);
}


/*
    Esta función muestra un mensaje en el HTML de acuerdo a si no hay links publicados o si al momento de buscar un link no coincide con el criterio de búsqueda.
*/
export function mensajeSinLinks(mensaje, opcion) {
    const listaLinks = document.querySelector(".lista-links");
    const buscadorLinks = document.querySelector(".buscador");
    const parrafo = document.createElement("p");
    parrafo.classList.add("no-resultados");

    if (!document.querySelector(".no-resultados")) {
        parrafo.innerHTML = mensaje;
        listaLinks.appendChild(parrafo);

        if (opcion === "sinRegistrosBD") {
            buscadorLinks.style.display = "none";
        } else if (opcion === "sinFiltrosBD") {
            eliminarListaLinks();
        }
    }
}