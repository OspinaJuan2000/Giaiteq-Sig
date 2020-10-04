import * as peticiones from './fetch.js';
import { mensajeCamposVacios } from '../controladorEventos/funciones.js';

let editarVideos = false;

const formVideos = document.querySelector('#form-videos');
const inputVideos = document.querySelector('#video');

/*
    Esta función valida que los campos que ingrese un usuario en el formulario de los vídeos no estén vacíos ni contentan espacios en blanco.
    - Valida que si un vídeo tiene en su título un # se cambie por "sharp".
    - Valida que si un vídeo pesa más de 80MB se muestre inmediatamente una alerta indicando esto.
    Por último, esta función también verifica si un vídeo se quiere editar o no.
*/
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

        } else if (datosVideo.get('titulo').trim() === '' || datosVideo.get('descripcion').trim() === '') {
            mensajeCamposVacios();
        } else if (editarVideos === false) {
            desactivarBotonPublicar();
            peticiones.peticionSubirVideo(datosVideo);
        } else if (editarVideos === true) {
            desactivarBotonPublicar();
            datosVideo.set('idVideo', formVideos.querySelector('#idVideo').dataset.id);
            datosVideo.set('nombreVideoAnterior', formVideos.querySelector('#idVideo').dataset.nombre);
            peticiones.peticionEditarVideo(datosVideo);
        }
    });
}

/*
    Esta función renderiza una vista previa del vídeo que se quiere publicar.
*/
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

/*
    Esta función es encargada de mostrar una barra de progreso del vídeo cuando se suba.
*/
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

/*
    Esta función elimina el porcentaje de la barra de progreso cuando se presione en publicar un vídeo.
*/ 
export function eliminarBarraProgreso() {

    const porcentaje = document.querySelector('#porcentaje');

    porcentaje.style.width = '0';
}

export function mensajeSinVideos(mensaje, opcion) {

    const listaVideos = document.querySelector('.lista-videos');
    const buscadorVideos = document.querySelector('.buscador');

    const parrafo = document.createElement('p');
    parrafo.classList.add('no-resultados');

    if (!document.querySelector('.no-resultados')) {
        parrafo.innerHTML = mensaje;
        listaVideos.appendChild(parrafo);

        if (opcion === 'sinRegistrosBD') {
            buscadorVideos.style.display = 'none';
        } else if (opcion === 'sinFiltrosBD') {
            eliminarListaVideos();
        }
    }
}

/*
    Esta función elimina el vídeo de la vista previa.
*/
export function eliminarVideoRenderizado() {
    const renderVideoHTML = document.querySelector('.renderizar-video');

    while (renderVideoHTML.firstChild) renderVideoHTML.removeChild(renderVideoHTML.firstChild);
}

/*
    Esta función muestra un mensaje en caso que no se hayan publicado vídeos.
*/
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
                <div class="contenedor-video__opciones">
                    <i class="fas fa-trash-alt contenedor-video__eliminar"></i>
                    <i class="far fa-edit contenedor-video__editar"></i>
                </div>
        </div>
        `;
    });

    contenedorVideos.innerHTML = listaVideosHTMl;
}

/*
    Esta función muestra una alerta al usuario y le pregunta si quiere eliminar el vídeo, en caso que decida eliminarlo, se llamará a la función que envía los datos del vídeo al Backend.
*/
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

            }).then(pregunta => {
                if (pregunta.value) {
                    const datosVideo = new FormData();
                    
                    const referencia = e.target.parentElement.parentElement;
                    const idVideo = referencia.dataset.id;
                    const nombreVideo = referencia.dataset.nombre.split('./videos/').join('');

                    datosVideo.set('id', idVideo);
                    datosVideo.set('nombre', nombreVideo);

                    peticiones.peticionEliminarVideo(datosVideo);
                }
            })
        }
    });
}

/*
    Esta función toma los datos del evento que se quiere editar y los pone en el formulario.
    También renderiza en el HTML el vídeo anterior.
*/
export function editarVideo() {

    const contenedorVideos = document.querySelector('.contenedor-video');

    contenedorVideos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-video__editar')) {

            editarVideos = true;

            /*
                Tomar los valores anteriores.
            */
            const referencia = e.target.parentElement.parentElement;
            const idVideoAnterior = referencia.dataset.id;
            const nombreVideoAnterior = referencia.dataset.nombre.split('./videos/').join('');
            const tituloVideo = referencia.querySelector('.contenedor-video__titulo').innerHTML.trim();
            const descripcionVideo = referencia.querySelector('.contenedor-video__descripcion').innerHTML.trim();

            insertarDatosEditar(idVideoAnterior, nombreVideoAnterior, tituloVideo, descripcionVideo);

            renderVideoAnterior(nombreVideoAnterior);
        }
    });
}

/*
    Esta función es la encargada de renderizar el vídeo que se quiere editar en el HTML para que el usuario sepa que vídeo tiene la publicación.
*/
export function renderVideoAnterior (nombreVideoAnterior) {

    eliminarVideoAnterior();

    const divVideo = document.createElement('div');
    divVideo.classList.add('video-anterior');
    const contenedorPublicacion = document.querySelector('.contenedor-publicacion');

    divVideo.innerHTML = `
        <p>Vídeo anterior</p>
        <video class="contenedor-video__video" controls>
            <source src="../../modelo/modeloVideos/videos/${nombreVideoAnterior}" type="video/mp4">
            <source src="../../modelo/modeloVideos/videos/${nombreVideoAnterior}" type="video/webm">
        </video>
        `;

    contenedorPublicacion.insertBefore(divVideo, contenedorPublicacion.childNodes[contenedorPublicacion.childNodes.length -2]);
}

/*
    Esta función elimina el vídeo renderizado en el HTML en el momento que un usuario está haciendo el proceso de editar un vídeo
*/
export function eliminarVideoAnterior () {

    if (document.querySelector('.video-anterior')) {
        document.querySelector('.video-anterior').remove();
    }
}

/*
    Esta función se encarga de insertar en poner los datos del vídeo anterior en el formulario en el momento que un usuario lo quiera editar.
*/
export function insertarDatosEditar(idVideoAnterior, nombreVideoAnterior, tituloVideo, descripcionVideo) {

    let tituloVideoHtml = formVideos.querySelector('.editable');
    let descripcionVideoHtml = formVideos.querySelector('trix-editor');
    let botonPublicar = formVideos.querySelector('.publicar button');
    
    document.querySelector('#titulo').value = tituloVideo;
    tituloVideoHtml.innerHTML = tituloVideo;
    descripcionVideoHtml.value = descripcionVideo;

    botonPublicar.innerHTML = 'Editar';
    formVideos.querySelector('#idVideo').setAttribute('data-id', idVideoAnterior);
    formVideos.querySelector('#idVideo').setAttribute('data-nombre', nombreVideoAnterior);
}


/*
    Esta función valida que el campo para buscar un vídeo no este vacío, si no está vacío, hará una búsqueda en la base de datos para buscar el vídeo que coincida con el criterio de búsqueda.
*/
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

/*
    Esta función muestra un mensaje si no hay vídeos publicados o si no coincide ningún vídeo con el criterio de búsqueda.
*/
export function manejoElementosListando() {

    const contenedorVideos = document.querySelector('.contenedor-video');
    const buscadorVideos = document.querySelector('.buscador');

    if (document.querySelector('.no-resultados')) {
        contenedorVideos.nextElementSibling.remove();
    }

    buscadorVideos.style.display = 'flex';
}


/*
    Esta función se encarga de desactivar el botón de publicar para que usuarios con alta latencia así presionen dos veces sobre publicar, no se publique más de una vez.
*/
export function desactivarBotonPublicar() {

    formVideos.querySelector('.publicar button').disabled = true;
}

/*
    Esta función activa el botón de publicar luego de que se publique o edite un vídeo.
*/
export function activarBotonPublicar() {

    formVideos.querySelector('.publicar button').disabled = false;
}

/*
    Esta función se encarga de eliminar todo el listado de vídeos.
*/
export function eliminarListaVideos() {

    const contenedorVideos = document.querySelector('.contenedor-video');

    while (contenedorVideos.firstChild) contenedorVideos.removeChild(contenedorVideos.firstChild);
}


/*
    Esta función cambia el mensaje del botón del formulario a "Publicar" cuando ya se haya editado un vídeo correctamente y también pone la variable de editarvideos en false.
*/
export function videoEditado() {
    
    let botonPublicar = formVideos.querySelector('.publicar button');
    botonPublicar.innerHTML = 'Publicar';

    editarVideos = false;
}