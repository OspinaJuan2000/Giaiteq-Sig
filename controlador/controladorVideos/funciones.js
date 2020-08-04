import * as peticiones from './fetch.js';

const formVideos = document.querySelector('#form-videos');

export function validarFormulario() {
    formVideos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosVideo = new FormData(formVideos);

        if (
            datosVideo.get('titulo').trim() === '' ||
            datosVideo.get('descripcion').trim() === '' ||
            datosVideo.get('video').name === ''
        ) {
            mensajeVideos('Todos los campos son requeridos', 'error-mensaje');
        } else {
            peticiones.peticion_subirVideo(datosVideo);
        }
    });
}

export function barraProgreso(data) {
    const porcentaje = document.querySelector('#porcentaje');
    let backgroundColor;

    if (
        data.mensaje === 'peso_excedido' ||
        data.mensaje === 'ya_existe' ||
        data.mensaje === 'error_subir' ||
        data.mensaje === 'solo_mp4'
    ) {
        backgroundColor = '#f00';
    } else if (data.mensaje === 'subido') {
        backgroundColor = '#59b548';
        formVideos.reset();
    }

    if (document.querySelector('#porcentaje')) {
        porcentaje.style.width = '0';
    }

    setTimeout(() => {
        for (let i = 0; i <= 100; i++) {
            porcentaje.style.width = `${i}%`;
            porcentaje.style.backgroundColor = backgroundColor;
        }
    }, 400);
}

export function eliminarBarraProgreso() {
    const porcentaje = document.querySelector('#porcentaje');

    porcentaje.style.width = '0';
}

export function mensajeVideos(mensaje, error) {
    const divMensaje = document.querySelector('.contenedor-publicacion');
    const elemento = document.createElement('p');

    elemento.innerHTML = mensaje;
    elemento.className = error;

    if (!document.querySelector('.error-mensaje')) {
        divMensaje.insertBefore(elemento, divMensaje.childNodes[0]);
    }

    setTimeout(() => {
        elemento.remove();
    }, 1500);
}
