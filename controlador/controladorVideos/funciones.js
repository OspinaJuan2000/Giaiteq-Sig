import * as peticiones from './fetch.js';

const formVideos = document.querySelector('#form-videos');
const inputVideos = document.querySelector('#video');
let editarVideos = false;

export function validarFormulario() {
    formVideos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosVideo = new FormData(formVideos);
        const pesoVideo = datosVideo.get('video').size;
        let nombreVideo = datosVideo.get('video').name;

        if (nombreVideo.includes('#')) {
            datosVideo.set('nombreVideo', `${nombreVideo.split('#').join('sharp')}`);
        } else {
            datosVideo.set('nombreVideo', nombreVideo);
        }

        const megaBytesMaximo = pesoVideo / 1e+6;

        if (megaBytesMaximo > 80) {
            swal.fire({
                title: 'Peso máximo excedido.',
                text: 'El vídeo excede el peso límite.',
                icon: 'error',
            });

        } else if (datosVideo.get('titulo').trim() === '' || datosVideo.get('descripcion').trim() === '' || datosVideo.get('video').name === '') {
            mensajeVideos('Todos los campos son requeridos', 'error-mensaje');
        } else if (editarVideos === false) {
            desactivarBotonPublicar();
            datosVideo.set('accion', 'publicar');
            peticiones.peticionSubirVideo(datosVideo);
        } else if (editarVideos === true) {
            desactivarBotonPublicar();
            datosVideo.set('accion', 'editar');
            datosVideo.set('idVideo', formVideos.querySelector('#idVideo').dataset.id);
            datosVideo.set('nombreVideoAnterior', formVideos.querySelector('#idVideo').dataset.nombre);
            peticiones.peticionEditarVideo(datosVideo);
            editarVideos = true;
        }
    });
}

export function vistaPreviaVideo() {
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
        data.mensaje === 'solo_mp4_webm' ||
        data.mensaje === 'error_actualizar'
    ) {
        backgroundColor = '#f00';
    } else if (data.mensaje === 'subido' || data.mensaje === 'actualizado') {
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

export function mensajeSinVideos(mensaje) {
    const listaVideos = document.querySelector('.lista-videos');

    const parrafo = document.createElement('p');
    parrafo.classList.add('no-videos');

    if (!document.querySelector('.no-videos')) {
        parrafo.innerHTML = mensaje;

        listaVideos.appendChild(parrafo);
    }
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


export function renderizarListaVideos(videos) {

    const contenedorVideos = document.querySelector('.contenedor-video');

    if (document.querySelector('.no-videos')) {
        contenedorVideos.nextElementSibling.remove();
    }

    let listaVideosHTMl = '';

    videos.map((video) => {
        listaVideosHTMl += `
        <div class="contenedor-video__info" data-id="${video.id}" data-nombre="${video.ruta}">
                <h3 class="contenedor-video__titulo">${video.titulo}</h3>
                <p class="contenedor-video__fecha"><i class="far fa-calendar-alt"></i> ${video.fecha}</p>
                <video class="contenedor-video__video" controls>
                    <source src="../../modelo/modeloVideos/${video.ruta.substring(2)}"type="video/mp4">
                    <source src="../../modelo/modeloVideos/${video.ruta.substring(2)}"type="video/webm">
                </video>
                <p class="contenedor-video__descripcion" title="${video.descripcion.substring(1)}">${video.descripcion}</p>
                <div class="contenedor-video__opciones">
                    <i class="fas fa-trash-alt contenedor-video__eliminar"></i>
                    <i class="far fa-edit contenedor-video__editar"></i>
                </div>
        </div>
        `;
    });

    contenedorVideos.innerHTML = listaVideosHTMl;
}

export function eliminarVideo() {
    const contenedorVideos = document.querySelector('.contenedor-video');

    contenedorVideos.addEventListener('click', (e) => {

        if (e.target.classList.contains('contenedor-video__eliminar')) {

            Swal.fire({
                title: 'Estás seguro que quieres eliminar el vídeo?',
                text: "Una vez eliminado, no se podrá recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'No, cancelar'

            }).then((pregunta) => {
                if (pregunta.value) {
                    const datosVideo = new FormData();

                    const idVideo = e.target.parentElement.parentElement.dataset.id;
                    const nombreVideo = e.target.parentElement.parentElement.dataset.nombre.split('./videos/').join('');

                    datosVideo.set('id', idVideo);
                    datosVideo.set('nombre', nombreVideo);

                    peticiones.peticionEliminarVideo(datosVideo);


                } else {
                    swal.fire({
                        title: 'Acción cancelada',
                        text: 'No se eliminó el vídeo',
                        icon: 'info',
                    });
                }
            })
        }
    });
}

export function editarVideo() {
    const contenedorVideos = document.querySelector('.contenedor-video');

    contenedorVideos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-video__editar')) {

            editarVideos = true;

            const idVideoAnterior = e.target.parentElement.parentElement.dataset.id;
            const nombreVideoAnterior = e.target.parentElement.parentElement.dataset.nombre.split('./videos/').join('');
            let tituloVideoHtml = formVideos.querySelector('#titulo');
            let descripcionVideoHtml = formVideos.querySelector('#descripcion');
            let botonPublicar = formVideos.querySelector('.publicar button');
            
            const tituloVideo = e.target.parentElement.parentElement.querySelector('.contenedor-video__titulo').textContent;
            const descripcionVideo = e.target.parentElement.parentElement.querySelector('.contenedor-video__descripcion').textContent;

            tituloVideoHtml.value = tituloVideo;
            descripcionVideoHtml.value = descripcionVideo;
            botonPublicar.innerHTML = 'Editar';
            formVideos.querySelector('#idVideo').setAttribute('data-id', idVideoAnterior);
            formVideos.querySelector('#idVideo').setAttribute('data-nombre', nombreVideoAnterior);
        }
    });
}


export function desactivarBotonPublicar() {
    formVideos.querySelector('.publicar button').disabled = true;
}

export function activarBotonPublicar() {
    formVideos.querySelector('.publicar button').disabled = false;
}

export function eliminarListaVideos() {
    const contenedorVideos = document.querySelector('.contenedor-video');

    if (contenedorVideos.firstElementChild) {
        contenedorVideos.firstElementChild.remove();
    }
}