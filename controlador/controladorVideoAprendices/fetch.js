import {eliminarListaVideos, mensajeSinVideos} from '../controladorVideos/funciones.js';
import * as funciones from './funciones.js';

/*
    Esta función hace una petición al backend (PHP), recibe todos los vídeos que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarVideos() {
    fetch('../../modelo/modeloVideos/listar-videos.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'sin_videos') {
                eliminarListaVideos();
                mensajeSinVideos('No se ha publicado ningún vídeo', 'sinRegistrosBD');
            } else {
                funciones.renderizarListaVideos(data);
            }
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los vídeos que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarVideos(datosVideo) {
    fetch('../../modelo/modeloVideos/buscar-videos.php', {
        method: 'POST',
        body: datosVideo
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'video_noencontrado') {
                mensajeSinVideos('No se ha encontrado ningún vídeo con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.renderizarListaVideos(data);
            }
        }).catch(err => console.log(err));
}