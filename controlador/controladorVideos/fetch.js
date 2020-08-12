import * as funciones from './funciones.js';

export function peticionSubirVideo(datosVideo) {
    fetch('../../modelo/modeloVideos/subir-video.php', {
        method: 'POST',
        body: datosVideo,
    }).then((response) => response.json())
        .then((data) => {
            funciones.barraProgreso(data);
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'peso_excedido') {
                tituloAlerta = 'Peso máximo excedido.';
                mensajeAlerta = 'El vídeo excede el peso límite.';
                iconoAlerta = 'error';
            } else if (mensaje === 'ya_existe') {
                tituloAlerta = 'El archivo ya existe.';
                mensajeAlerta = 'Este vídeo fue subido anteriormente.';
                iconoAlerta = 'error';
            } else if (mensaje === 'error_subir') {
                tituloAlerta = 'Error en la subida.';
                mensajeAlerta = 'Error al subir el vídeo, intente más tarde.';
                iconoAlerta = 'error';
            } else if (mensaje === 'solo_mp4_webm') {
                tituloAlerta = 'Solo se permite fórmato MP4 y WEBM.';
                mensajeAlerta = 'Intente nuevamente subiendo el vídeo en fórmato MP4 o formato WEBM.';
                iconoAlerta = 'info';
            } else if (mensaje === 'subido') {
                tituloAlerta = `Vídeo subido correctamente.`;
                mensajeAlerta = `El archivo "-${data.nombre}-" se subió correctamente.`;
                iconoAlerta = 'success';
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
        .catch((err) => {
            console.log(err);
        });
}

export function peticionListarVideos() {
    fetch('../../modelo/modeloVideos/listar-videos.php')
        .then(response => response.json())
        .then((data) => {
            if (data.mensaje === 'sin_videos') {
                funciones.eliminarListaVideos();
                funciones.mensajeSinVideos('No hay vídeos por el momento');
            } else {
                funciones.renderizarListaVideos(data);
            }
        });
}

export function peticionEliminarVideo(datosVideo) {
    fetch('../../modelo/modeloVideos/eliminar-video.php', {
        method: 'POST',
        body: datosVideo
    }).then(response => response.json())
        .then(data => {
            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (data.mensaje === 'video_eliminado') {
                tituloAlerta = `Vídeo eliminado correctamente.`;
                mensajeAlerta = `El vídeo "-${data.titulo}-" ha sido eliminado.`;
                iconoAlerta = 'success';

            } else if (data.mensaje === 'video_noeliminado') {
                tituloAlerta = `Error al intentar eliminar`;
                mensajeAlerta = `Ocurrió un error al intentar eliminar el vídeo "-${data.titulo}-"`;
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarVideos();
            });
        });
}