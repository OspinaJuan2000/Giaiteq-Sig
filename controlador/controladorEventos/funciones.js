
import * as peticiones from './fetch.js';
import { mensajeCamposVacios } from '../controladorSesion/funciones.js';

const formEventos = document.querySelector('#form-eventos');
let editarEventos = false;

export function validarFormulario() {
    formEventos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosEvento = new FormData(formEventos);

        if (datosEvento.get('nombre').trim() === '' || datosEvento.get('descripcion').trim() === '' || datosEvento.get('lugar').trim() === '' || datosEvento.get('fecha-comienzo').trim() === '' || datosEvento.get('hora-comienzo').trim() === '' || datosEvento.get('fecha-finalizacion').trim() === '' || datosEvento.get('hora-finalizacion').trim() === '') {
            mensajeCamposVacios('Todos los campos son obligatorios', 'campos-vaciosError', document.querySelector('.contenedor-publicacion'));
        } else if (editarEventos === false) {
            peticiones.peticionSubirEvento(datosEvento);
        } else if (editarEventos === true) {
            datosEvento.set('idEvento', formEventos.querySelector('#idEvento').dataset.id);
            datosEvento.set('nombreEventoAnterior', formEventos.querySelector('#idEvento').dataset.nombre);
            peticiones.peticionEditarEvento(datosEvento);
        }
    });
}

export function listarEventos(datosEvento) {

    manejoElementosListando();

    const contenedorEventos = document.querySelector('.contenedor-evento');
    let listaEventosHtml = '';

    datosEvento.map(evento => {
        listaEventosHtml += `
        <div class="contenedor-evento__info" data-id="${evento.id}" data-nombre="${evento.nombre}">
                    <h3 class="contenedor-evento__titulo">${evento.nombre}</h3>
                    <p class="contenedor-evento__descripcion">${evento.descripcion}</p>
                    <div class="contenedor-evento__mas-info">
                        <p class="contenedor-evento__comienzo"><i class="fas fa-clock"></i> <span>Lugar del evento:</span> <span class="contenedor-evento__lugar">${evento.lugar_realizacion}</span> </p>
                        <p class="contenedor-evento__comienzo"><i class="fas fa-clock"></i> <span class="contenedor-evento__fecha">Fecha</span> y <span class="contenedor-evento__hora">hora</span> de comienzo <span class="contenedor-evento__fecha-comienzo">${evento.fecha_comienzo}</span> - <span class="contenedor-evento__hora-comienzo">${evento.hora_comienzo}</span> </p>
                        <p class="contenedor-evento__fin"><i class="fas fa-clock"></i> <span class="contenedor-evento__fecha">Fecha</span> y <span class="contenedor-evento__hora">hora</span> de finalización <span class="contenedor-evento__fecha-finalizacion">${evento.fecha_finalizacion}</span> - <span class="contenedor-evento__hora-finalizacion">${evento.hora_finalizacion}</span></p>
                    </div>
                    <div class="contenedor-evento__opciones">
                        <i class="fas fa-trash-alt contenedor-evento__eliminar"></i>
                        <i class="far fa-edit contenedor-evento__editar"></i>
                    </div>
                </div>
        `;
    });

    contenedorEventos.innerHTML = listaEventosHtml;
}

export function eliminarEvento() {
    const contenedorEventos = document.querySelector('.contenedor-evento');

    contenedorEventos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-evento__eliminar')) {
            Swal.fire({
                title: 'Estás seguro que quieres eliminar el evento?',
                text: "Una vez eliminado, no se podrá recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'No, cancelar'
            }).then(pregunta => {
                if (pregunta.value) {
                    const datosEvento = new FormData();

                    const idEvento = e.target.parentElement.parentElement.dataset.id;
                    const nombreEvento = e.target.parentElement.parentElement.dataset.nombre;

                    datosEvento.set('id', idEvento);

                    datosEvento.set('nombre', nombreEvento);

                    peticiones.peticionEliminarEvento(datosEvento);
                }
            })
        }
    });
}

export function editarEvento() {
    const contenedorEventos = document.querySelector('.contenedor-evento');

    contenedorEventos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-evento__editar')) {

            editarEventos = true;

            //Tomar los valores anteriores.
            const idEventoAnterior = e.target.parentElement.parentElement.dataset.id;
            const nombreEventoAnterior = e.target.parentElement.parentElement.dataset.nombre;
            const descripcionEventoAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__descripcion').textContent;
            const lugarEventoAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__lugar').textContent;
            const fechaComienzoAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__fecha-comienzo').textContent;
            const horaComienzoAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__hora-comienzo').textContent;
            const fechaFinalizacionAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__fecha-finalizacion').textContent;
            const horaFinalizacionAnterior = e.target.parentElement.parentElement.querySelector('.contenedor-evento__hora-finalizacion').textContent;
            const botonPublicar = formEventos.querySelector('.publicar button');

            //Llamar a la función que pone los datos anteriores en el formulario.
            insertarDatosEditar(nombreEventoAnterior, descripcionEventoAnterior, lugarEventoAnterior, fechaComienzoAnterior, horaComienzoAnterior, fechaFinalizacionAnterior, horaFinalizacionAnterior, botonPublicar, idEventoAnterior);

        }
    });
}

export function buscarEvento() {
    const buscador = document.querySelector('.buscador__input');

    buscador.addEventListener('input', (e) => {

        if (buscador.value !== '') {

            const datosEvento = new FormData();
            datosEvento.set('filtro', e.target.value.trim());

            peticiones.peticionBuscarEventos(datosEvento);
        } else {
            peticiones.peticionListarEventos();
        }
    });
}

export function mensajeSinEventos(mensaje, opcion) {
    const listaEventos = document.querySelector('.lista-eventos');
    const buscadorEventos = document.querySelector('.buscador');

    const parrafo = document.createElement('p');
    parrafo.classList.add('no-resultados');

    if (!document.querySelector('.no-resultados')) {
        parrafo.innerHTML = mensaje;
        listaEventos.appendChild(parrafo);

        if (opcion === 'sinRegistrosBD') {
            buscadorEventos.style.display = 'none';

        } else if (opcion === 'sinFiltrosBD') {
            eliminarListaEventos();
        }
    }
}

export function manejoElementosListando() { // Mostrar la barra de busqueda y ocultar el mensaje de que no hay vídeos cuando realmente si haya.

    const contenedorEventos = document.querySelector('.contenedor-evento');
    const buscadorEventos = document.querySelector('.buscador');

    if (document.querySelector('.no-resultados')) {
        contenedorEventos.nextElementSibling.remove();
    }

    buscadorEventos.style.display = 'flex';
}

export function eliminarListaEventos() {
    const contenedorEventos = document.querySelector('.contenedor-evento');

    while (contenedorEventos.firstChild) contenedorEventos.removeChild(contenedorEventos.firstChild);
}

export function eventoEditado() {
    let botonPublicar = formEventos.querySelector('.publicar button');
    botonPublicar.innerHTML = 'Publicar';

    editarEventos = false;
}

export function insertarDatosEditar(nombreEventoAnterior, descripcionEventoAnterior, lugarEventoAnterior, fechaComienzoAnterior, horaComienzoAnterior, fechaFinalizacionAnterior, horaFinalizacionAnterior, botonPublicar, idEventoAnterior) {

    const nombreEventoHtml = formEventos.querySelector('#nombre');
    const descripcionEventoHtml = formEventos.querySelector('#descripcion');
    const lugarEventoHtml = formEventos.querySelector('#lugar');
    const fechaComienzoHtml = formEventos.querySelector('#fecha-comienzo');
    const horaComienzoHtml = formEventos.querySelector('#hora-comienzo');
    const fechaFinalizacionHtml = formEventos.querySelector('#fecha-finalizacion');
    const horaFinalizacionHtml = formEventos.querySelector('#hora-finalizacion');

    nombreEventoHtml.value = nombreEventoAnterior;
    descripcionEventoHtml.value = descripcionEventoAnterior;
    lugarEventoHtml.value = lugarEventoAnterior;
    fechaComienzoHtml.value = fechaComienzoAnterior;
    horaComienzoHtml.value = horaComienzoAnterior;
    fechaFinalizacionHtml.value = fechaFinalizacionAnterior;
    horaFinalizacionHtml.value = horaFinalizacionAnterior;
    botonPublicar.innerHTML = 'Editar';

    formEventos.querySelector('#idEvento').setAttribute('data-id', idEventoAnterior);
    formEventos.querySelector('#idEvento').setAttribute('data-nombre', nombreEventoAnterior);
}