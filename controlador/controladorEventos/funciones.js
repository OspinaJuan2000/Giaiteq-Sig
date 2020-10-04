
import * as peticiones from './fetch.js';

const formEventos = document.querySelector('#form-eventos');
let editarEventos = false;


/*
    Esta función verifica que los datos que se ingrese en el formulario no estén vacios, no tengan espacios en blanco para luego llamar la función que envía los datos al Backend. También esta función verifica si se va a editar o no un evento.w
*/
export function validarFormulario() {
    
    formEventos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosEvento = new FormData(formEventos);

        if (datosEvento.get('nombre').trim() === '' || datosEvento.get('descripcion').trim() === '' || datosEvento.get('lugar').trim() === '' || datosEvento.get('comienzo').trim() === '' || datosEvento.get('finalizacion').trim() === '') {
            mensajeCamposVacios();
        } else if (editarEventos === false) {
            peticiones.peticionSubirEvento(datosEvento);
        } else if (editarEventos === true) {
            datosEvento.set('idEvento', formEventos.querySelector('#idEvento').dataset.id);
            datosEvento.set('nombreEventoAnterior', formEventos.querySelector('#idEvento').dataset.nombre);
            peticiones.peticionEditarEvento(datosEvento);
        }
    });
}

/* 
    Esta función muestra una alerta si los campos del formulario están vacíos.
*/  
export function mensajeCamposVacios() {

    Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Tiene campos sin llenar, complete el formulario'
    })
}

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
                    <i class="fas fa-map-marker-alt fa-xl lugar-i lg"></i>
                    Lugar de realización:
                    <div class="lugar">
                        ${evento.lugar_realizacion}
                    </div>
                </div>

                <div class="contenedor_evento__fecha-comienzo">
                    <i class="far fa-calendar-alt fa-xl fecha-i"></i>
                    Fecha y hora de comienzo:
                    <div class="comienzo">
                        ${evento.fecha_comienzo}
                    </div>
                </div>

                <div class="contenedor_evento__fecha-finalizacion">
                    <i class="far fa-clock fa-xl fecha-i"></i>
                    Fecha y hora de finalizacion:
                    <div class="finalizacion">
                        ${evento.fecha_finalizacion}
                    </div>
                </div>

            </div>

            <div class="contenedor-evento__opciones">
                <i class="fas fa-trash-alt contenedor-evento__eliminar"></i>
                <i class="far fa-edit contenedor-evento__editar"></i>
            </div>
        </div>
        `;
    });

    contenedorEventos.innerHTML = listaEventosHtml;

}

/*
    Esta función muestra una alerta al usuario y le pregunta si quiere cancelar el evento, en caso que decida cancelarlo, se llamará a la función que envía los datos del evento al Backend.
*/
export function cancelarEvento() {

    const contenedorEventos = document.querySelector('.contenedor-evento');

    contenedorEventos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-evento__eliminar')) {
            Swal.fire({
                title: 'Estás seguro que quieres cancelar el evento?',
                text: "Una vez cancelado, no aparecerá en la lista de eventos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cancelar el evento',
                cancelButtonText: 'No, salir'
            }).then(pregunta => {
                if (pregunta.value) {
                    const datosEvento = new FormData();

                    const referencia = e.target.parentElement.parentElement;
                    const idEvento = referencia.dataset.id;
                    const nombreEvento = referencia.querySelector('.contenedor-evento__titulo').innerHTML.trim();
                    const descripcionEvento = referencia.querySelector('.contenedor-evento__descripcion').innerHTML.trim();
                    const lugarEvento = referencia.querySelector('.lugar').innerHTML.trim();
                    let fechaComienzoEvento = referencia.querySelector('.contenedor_evento__fecha-comienzo .comienzo').textContent.trim();
                    let fechaFinalizacionEvento = referencia.querySelector('.contenedor_evento__fecha-finalizacion .finalizacion').textContent.trim();

                    datosEvento.set('id', idEvento);
                    datosEvento.set('nombre', nombreEvento);
                    datosEvento.set('descripcion', descripcionEvento);
                    datosEvento.set('lugar', lugarEvento);
                    datosEvento.set('comienzo', fechaComienzoEvento);
                    datosEvento.set('finalizacion', fechaFinalizacionEvento);
                    
                    peticiones.peticionCancelarEvento(datosEvento);
                }
            })
        }
    });
}


/*
    Esta función toma los datos del evento que se quiere editar y los pone en el formulario.
*/
export function editarEvento() {

    const contenedorEventos = document.querySelector('.contenedor-evento');

    contenedorEventos.addEventListener('click', (e) => {
        if (e.target.classList.contains('contenedor-evento__editar')) {

            editarEventos = true;

            /*
                Tomar los valores anteriores.
            */
            const referencia = e.target.parentElement.parentElement;
            const idEventoAnterior = referencia.dataset.id;
            const nombreEventoAnterior = referencia.querySelector('.contenedor-evento__titulo').innerHTML.trim();
            const descripcionEventoAnterior = referencia.querySelector('.contenedor-evento__descripcion').innerHTML.trim();
            const lugarEventoAnterior = referencia.querySelector('.lugar').innerHTML.trim();
            let fechaComienzoEventoAnterior = referencia.querySelector('.contenedor_evento__fecha-comienzo .comienzo').textContent.trim().split(''); 
            let fechaFinalizacionEventoAnterior = referencia.querySelector('.contenedor_evento__fecha-finalizacion .finalizacion').textContent.trim().split('');
            fechaComienzoEventoAnterior[10] = 'T';
            fechaFinalizacionEventoAnterior[10] = 'T';

            /* 
                Llamar a la función que pone los datos anteriores en el formulario.
            */
            insertarDatosEditar(idEventoAnterior, nombreEventoAnterior, descripcionEventoAnterior, lugarEventoAnterior, fechaComienzoEventoAnterior.join(''), fechaFinalizacionEventoAnterior.join(''));

        }
    });
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

/*
    Esta función muestra un mensaje si no hay eventos publicados o si no coincide ningún evento con el criterio de búsqueda.
*/
export function mensajeSinEventos(mensaje, opcion) {

    const listaEventos = document.querySelector('.lista-eventos');
    const buscadorEventos = document.querySelector('.buscador');

    const parrafo = document.createElement('p');
    parrafo.classList.add('no-resultados');

    if (!document.querySelector('.no-resultados')) {
        parrafo.innerHTML = mensaje;
        listaEventos.appendChild(parrafo);

        if (opcion === 'sinRegistrosBD') {
            buscadorEventos.style.display = 'none';

        } else if (opcion === 'sinFiltrosBD') {
            eliminarListaEventos();
        }
    }
}

/*
    Esta función oculta el mensaje de que no se han publicado vídeos en el momento que se publique al menos uno y también muestra el buscador.
*/
export function manejoElementosListando() {

    const contenedorEventos = document.querySelector('.contenedor-evento');
    const buscadorEventos = document.querySelector('.buscador');

    if (document.querySelector('.no-resultados')) {
        contenedorEventos.nextElementSibling.remove();
    }

    buscadorEventos.style.display = 'flex';
}

/*
    Esta función elimina el HTML de los eventos que hay renderizados en la vista.
*/
export function eliminarListaEventos() {

    const contenedorEventos = document.querySelector('.contenedor-evento');

    while (contenedorEventos.firstChild) contenedorEventos.removeChild(contenedorEventos.firstChild);
}

/*
    Esta función cambia el mensaje del botón del formulario a "Publicar" cuando ya se haya editado un evento correctamente y también pone la variable de editarEventos en false.
*/
export function eventoEditado() {

    let botonPublicar = formEventos.querySelector('.publicar button');
    botonPublicar.innerHTML = 'Publicar';

    editarEventos = false;
}

/*
    Esta función complementa a la función que toma los datos de un evento que se quiere editar y los muestra en el formulario.
*/
export function insertarDatosEditar(idEventoAnterior, nombreEventoAnterior, descripcionEventoAnterior, lugarEventoAnterior, fechaComienzoEventoAnterior, fechaFinalizacionEventoAnterior) {

    const nombreEventoAnteriorHtml = formEventos.querySelector('.editable');
    const descripcionEventoAnteriorHtml = formEventos.querySelector('trix-editor'); 
    const lugarEventoAnteriorHtml = formEventos.querySelector('.editableone');
    const fechaComienzoEventoAnteriorHtml = formEventos.querySelector('#comienzo');
    const fechaFinalizacionEventoAnteriorHtml = formEventos.querySelector('#finalizacion');

    nombreEventoAnteriorHtml.innerHTML = nombreEventoAnterior;
    descripcionEventoAnteriorHtml.innerHTML = descripcionEventoAnterior;
    lugarEventoAnteriorHtml.innerHTML = lugarEventoAnterior;
    fechaComienzoEventoAnteriorHtml.value = fechaComienzoEventoAnterior;
    fechaFinalizacionEventoAnteriorHtml.value = fechaFinalizacionEventoAnterior;


    formEventos.querySelector('#nombre').value = nombreEventoAnterior;
    formEventos.querySelector('#lugar').value = lugarEventoAnterior;

    let botonPublicar = formEventos.querySelector('.publicar button');
    botonPublicar.innerHTML = 'Editar';
    formEventos.querySelector('#idEvento').setAttribute('data-id', idEventoAnterior);
    formEventos.querySelector('#idEvento').setAttribute('data-nombre', nombreEventoAnterior);
}

/*
    Esta función elimina el valor que se guarda en la etiqueta text-editor una vez que se actualice un vídeo.
*/
export function eliminarValorTextEditor () {

    while (document.querySelector('trix-editor').firstChild) document.querySelector('trix-editor').removeChild(document.querySelector('trix-editor').firstChild);
};

/*
    Esta función elimina el valor que se guarda en los divs que utilicen Medium Editor una vez que se actualice un vídeo.
*/
export function eliminarValorMediumEditor (option) {

    while (document.querySelector('.editable').firstChild) document.querySelector('.editable').removeChild(document.querySelector('.editable').firstChild);

    if (option === 1) {
        document.querySelector('#titulo').value = '';
        
    } else if (option === 2) {
        while (document.querySelector('.editableone').firstChild) document.querySelector('.editableone').removeChild(document.querySelector('.editableone').firstChild);

        document.querySelector('#nombre').value = '';
        document.querySelector('#lugar').value = '';
    };
};