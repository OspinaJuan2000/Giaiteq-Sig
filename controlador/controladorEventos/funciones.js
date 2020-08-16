
import * as peticiones from './fetch.js';
import { mensajeCamposVacios } from '../controladorSesion/funciones.js';

const formEventos = document.querySelector('#form-eventos');

export function validarFormulario() {
    formEventos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosEvento = new FormData(formEventos);

        if (datosEvento.get('nombre').trim() === '' || datosEvento.get('descripcion').trim() === '' || datosEvento.get('lugar').trim() === '' || datosEvento.get('fecha-comienzo').trim() === '' || datosEvento.get('hora-comienzo').trim() === '' || datosEvento.get('fecha-finalizacion').trim() === '' || datosEvento.get('hora-finalizacion').trim() === '') {
            mensajeCamposVacios('Todos los campos son obligatorios', 'campos-vaciosError', document.querySelector('.contenedor-publicacion'));
        } else {
            peticiones.peticionSubirEvento(datosEvento);
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
                        <p class="contenedor-evento__lugar"><i class="fas fa-map-marker-alt"></i> ${evento.lugar_realizacion}</p>
                        <p class="contenedor-evento__comienzo"><i class="fas fa-clock"></i> <span class="contenedor-evento__fecha">Fecha</span> y <span class="contenedor-evento__hora">hora</span> de comienzo <span class="contenedor-evento__fecha">${evento.fecha_comienzo}</span> - <span class="contenedor-evento__hora">${evento.hora_comienzo}</span> </p>
                        <p class="contenedor-evento__fin"><i class="fas fa-clock"></i> <span class="contenedor-evento__fecha">Fecha</span> y <span class="contenedor-evento__hora">hora</span> de finalización <span class="contenedor-evento__fecha">${evento.fecha_finalizacion}</span> - <span class="contenedor-evento__hora">${evento.hora_finalizacion}</span></p>
                    </div>
                    <div class="contenedor-evento__opciones">
                        <i class="fas fa-trash-alt contenedor-evento__eliminar">ELIMINAR</i>
                        <i class="far fa-edit contenedor-evento__editar">EDITAR</i>
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
                    const  datosEvento = new FormData();

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


export function mensajeSinEventos(mensaje) {
    const listaEventos = document.querySelector('.lista-eventos');
    const buscadorEventos = document.querySelector('.buscador');

    const parrafo = document.createElement('p');
    parrafo.classList.add('no-resultados');

    if (!document.querySelector('.no-resultados')) {
        parrafo.innerHTML = mensaje;
        listaEventos.appendChild(parrafo);
        buscadorEventos.style.display = 'none';
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
