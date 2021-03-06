import * as funciones from './funciones.js';
import {eliminarValorTextEditor, eliminarValorMediumEditor} from '../controladorEventos/funciones.js';

const formVideos = document.querySelector('#form-videos');
const buscador = document.querySelector('.buscador__input');

/*
    Esta función hace una petición al backend (PHP), envía los datos que recoge JavaScript cuando se envía el formulario para subir un vídeo y espera una respuesta en fórmato JSON para mostrar una alerta dependiendo que respuesta obtenga.
*/
export function peticionSubirVideo(datosVideo) {
    fetch('../../modelo/modeloVideos/subir-video.php', {
        method: 'POST',
        body: datosVideo,
    }).then(response => response.json())
        .then(data => {
            funciones.barraProgreso(data);
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'sinvideo') {
                tituloAlerta = 'Debe subir un vídeo';
                mensajeAlerta = 'Seleccione en elegir archivo y escoja un vídeo';
                iconoAlerta = 'error';
            } else if (mensaje === 'peso_excedido') {
                tituloAlerta = 'Peso máximo excedido';
                mensajeAlerta = 'El vídeo excede el peso máximo permitido';
                iconoAlerta = 'error';
            } else if (mensaje === 'ya_existe') {
                tituloAlerta = 'El archivo ya existe.';
                mensajeAlerta = 'Este vídeo fue subido anteriormente';
                iconoAlerta = 'error';
            } else if (mensaje === 'error_subir') {
                tituloAlerta = 'Error en la subida';
                mensajeAlerta = 'Error al subir el vídeo, intente más tarde';
                iconoAlerta = 'error';
            } else if (mensaje === 'solo_mp4_webm') {
                tituloAlerta = 'Solo se permite fórmato MP4 y WEBM';
                mensajeAlerta = 'Intente nuevamente subiendo el vídeo en fórmato MP4 o formato WEBM';
                iconoAlerta = 'info';
            } else if (mensaje === 'subido') {
                tituloAlerta = 'Vídeo subido correctamente';
                mensajeAlerta = `El archivo ${data.nombre} se subió correctamente`;
                iconoAlerta = 'success';
                formVideos.reset();
                eliminarValorMediumEditor(1);
                eliminarValorTextEditor();
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                funciones.eliminarBarraProgreso();
                funciones.eliminarVideoRenderizado();
                funciones.activarBotonPublicar();
                peticionListarVideos();
            });
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe todos los vídeos que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarVideos() {
    fetch('../../modelo/modeloVideos/listar-videos.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'sin_videos') {
                funciones.eliminarListaVideos();
                funciones.mensajeSinVideos('No se ha publicado ningún vídeo', 'sinRegistrosBD');
            } else {
                funciones.renderizarListaVideos(data);
            }
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), envía los datos del vídeo para proceder a su eliminación desde el Backend.
*/
export function peticionEliminarVideo(datosVideo) {
    fetch('../../modelo/modeloVideos/eliminar-video.php', {
        method: 'POST',
        body: datosVideo
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'video_eliminado') {
                tituloAlerta = 'Vídeo eliminado correctamente.';
                mensajeAlerta = `Se ha eliminado el vídeo ${data.titulo.substring(30)}`;
                iconoAlerta = 'success';

            } else if (mensaje === 'video_noeliminado') {
                tituloAlerta = 'Error al intentar eliminar';
                mensajeAlerta = `Ocurrió un error al intentar eliminar el vídeo ${data.titulo.substring(30)}`;
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarVideos();
            });
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe los datos del formulario y la ID del vídeo anterior para proceder a su actualización.
*/
export function peticionEditarVideo(datosVideo) {
    fetch('../../modelo/modeloVideos/editar-video.php', {
        method: 'POST',
        body: datosVideo,
    }).then(response => response.json())
        .then(data => {
            funciones.barraProgreso(data);
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'peso_excedido') {
                tituloAlerta = 'Peso máximo excedido';
                mensajeAlerta = 'El vídeo excede el peso límite';
                iconoAlerta = 'error';
            } else if (mensaje === 'error_actualizar') {
                tituloAlerta = 'Error al actualizar el vídeo';
                mensajeAlerta = `Error al actualizar el vídeo ${data.nombreAnterior.substring(30)}. No se vieron alterados ninguno de los campos o el vídeo fue borrado previamente, actualice nuevamente`;
                iconoAlerta = 'error';
            } else if (mensaje === 'solo_mp4_webm') {
                tituloAlerta = 'Solo se permite fórmato MP4 y WEBM';
                mensajeAlerta = 'Intente nuevamente subiendo el vídeo en fórmato MP4 o formato WEBM';
                iconoAlerta = 'info';
            } else if (mensaje === 'actualizado') {
                tituloAlerta = 'Vídeo actualizado correctamente';
                mensajeAlerta = `El archivo ${data.nombreAnterior.substring(30)} ha sido actualizó correctamente`;
                iconoAlerta = 'success';
                formVideos.reset();
                eliminarValorMediumEditor(1);
                eliminarValorTextEditor();
                funciones.videoEditado();
                funciones.eliminarVideoAnterior();
            } else if (mensaje === 'ya_existe') {
                tituloAlerta = 'El archivo ya existe.';
                mensajeAlerta = 'Este ya está en el sistema.';
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                funciones.eliminarBarraProgreso();
                funciones.eliminarVideoRenderizado();
                funciones.activarBotonPublicar();
                peticionListarVideos();
            });
        }).catch(err => console.log(err));
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
                funciones.mensajeSinVideos('No se ha encontrado ningún vídeo con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.renderizarListaVideos(data);
            }
        }).catch(err => console.log(err));
}