import * as peticiones from './fetch.js';
import {manejoElementosListando} from '../controladorEventos/funciones.js';

/* 
    Esta función renderiza en la vista los eventos que vengan de la base de datos.
*/
export function listarEventos(datosEvento) {

    manejoElementosListando();

    const contenedorEventos = document.querySelector('.contenedor-evento');
    let listaEventosHtml = '';

    datosEvento.map(evento => {
        listaEventosHtml += `
        <div class="contenedor-evento__info" data-id="${evento.id}">

            <div class="contenedor-evento__titulo">
                ${evento.nombre}
            </div>

            <div class="contenedor-evento__descripcion">
                ${evento.descripcion}
            </div>

            <div class="contenedor-evento__mas-info">

                <div class="contenedor-evento__lugar">
                    <i class="fas fa-map-marker-alt fa-1xl lugar-i lg"></i>
                    Lugar de realización:
                    <div class="lugar">
                        ${evento.lugar_realizacion}
                    </div>
                </div>

                <div class="contenedor_evento__fecha-comienzo">
                    <i class="far fa-calendar-alt fa-1xl fecha-i"></i>
                    Fecha y hora de comienzo:
                    <div class="comienzo">
                        ${evento.fecha_comienzo}
                    </div>
                </div>

                <div class="contenedor_evento__fecha-finalizacion">
                    <i class="far fa-clock fa-1xl fecha-i"></i>
                    Fecha y hora de finalizacion:
                    <div class="finalizacion">
                        ${evento.fecha_finalizacion}
                    </div>
                </div>

            </div>
        </div>
        `;
    });

    contenedorEventos.innerHTML = listaEventosHtml;
}

/*
    Esta función valida que el campo para buscar un evento no este vacío, si no está vacío, hará una búsqueda en la base de datos para buscar el evento que coincida con el criterio de búsqueda.
*/
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
