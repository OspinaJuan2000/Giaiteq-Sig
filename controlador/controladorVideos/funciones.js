import * as peticiones from './fetch.js';

const formVideos = document.querySelector('#form-videos');
const inputVideos = document.querySelector('#video');

export function validarFormulario() {
    formVideos.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const datosVideo = new FormData(formVideos);
        const pesoVideo = datosVideo.get('video').size;
        const megaBytesMaximo = pesoVideo / 1e+6;

        if (megaBytesMaximo > 50) {
            swal.fire({
                title: 'Peso máximo excedido.',
                text: 'El vídeo excede el peso límite.',
                icon: 'error',
            });
        } else if (datosVideo.get('titulo').trim() === '' || datosVideo.get('descripcion').trim() === '' || datosVideo.get('video').name === '') {
            mensajeVideos('Todos los campos son requeridos', 'error-mensaje');
        } else {
            peticiones.peticion_subirVideo(datosVideo);
        }
    });
}

export function renderizarVideo() {
    inputVideos.addEventListener('change', (e) => {
        const video = e.target.files[0];
        const formatoVideo = video.type;
        const enlaceVistaPrevia = URL.createObjectURL(video);
        const renderVideoHTML = document.querySelector('.renderizar-video');

        if (formatoVideo === 'video/mp4' || formatoVideo === 'video/webm') {
            eliminarVideoRenderizado();

            const videoHTML = document.createElement('video');
            videoHTML.setAttribute('controls', '');
            videoHTML.innerHTML = `
                <source src="${enlaceVistaPrevia}" type="video/mp4">
                <source src="${enlaceVistaPrevia}" type="video/webm">
            `;
            renderVideoHTML.appendChild(videoHTML);
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

export function eliminarVideoRenderizado() {
    const renderVideoHTML = document.querySelector('.renderizar-video');

    while (renderVideoHTML.firstChild) renderVideoHTML.removeChild(renderVideoHTML.firstChild);
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
