import * as peticiones from './fetch.js';
import {manejoElementosListando} from '../controladorVideos/funciones.js';

/* 
    Esta función renderiza en la vista los vídeos que vengan de la base de datos.
*/
export function renderizarListaVideos(videos) {

    manejoElementosListando();

    const contenedorVideos = document.querySelector('.contenedor-video');
    let listaVideosHTMl = '';

    videos.map(video => {
        listaVideosHTMl += `
        <div class="contenedor-video__info" data-id="${video.id}" data-nombre="${video.ruta}">
                <div class="contenedor-video__titulo">${video.titulo}</div>
                <p class="contenedor-video__fecha"><i class="far fa-calendar-alt fa-lg"></i> ${video.fecha}</p>
                <video class="contenedor-video__video" controls>
                    <source src="../../modelo/modeloVideos/${video.ruta.substring(2)}"type="video/mp4">
                    <source src="../../modelo/modeloVideos/${video.ruta.substring(2)}"type="video/webm">
                </video>
                <div class="contenedor-video__descripcion">${video.descripcion}</div>
        </div>
        `;
    });

    contenedorVideos.innerHTML = listaVideosHTMl;
}

export function buscarVideos() {

    const buscador = document.querySelector('.buscador__input');

    buscador.addEventListener('input', (e) => {

        if (buscador.value !== '') {

            const datosVideo = new FormData();
            datosVideo.set('filtro', e.target.value.trim());

            peticiones.peticionBuscarVideos(datosVideo);
        } else {
            peticiones.peticionListarVideos();
        }
    });
}