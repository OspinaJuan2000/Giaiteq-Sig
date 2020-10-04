import * as funciones from './funciones.js';

const formEventos = document.querySelector('#form-eventos');
const buscador = document.querySelector('.buscador__input');

/*
    Esta función hace una petición al backend (PHP), envía los datos que recoge JavaScript cuando se envía el formulario y espera una respuesta en fórmato JSON para mostrar una alerta dependiendo que respuesta obtenga.
*/
export function peticionSubirEvento(datosEvento) {
    
    fetch('../../modelo/modeloEventos/subir-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'subido') {
                buscador.value = '';
                tituloAlerta = 'Evento publicado correctamente';
                mensajeAlerta = `El evento ha sido publicado`;
                iconoAlerta = 'success';
                formEventos.reset();
                funciones.eliminarValorMediumEditor(2);
                funciones.eliminarValorTextEditor();
            } else if (mensaje === 'error_subir') {
                tituloAlerta = 'Error al intentar publicar el evento';
                mensajeAlerta = 'Error al publicar el evento, intente más tarde';
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarEventos();
            })
        }).catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe todos los registros que hay en la tabla de eventos para mostrarlos en la vista en caso que si haya eventos publicados.
*/
export function peticionListarEventos() {

    fetch('../../modelo/modeloEventos/listar-eventos.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje == 'sin_eventos') {
                funciones.eliminarListaEventos();
                funciones.mensajeSinEventos('No se ha publicado ningún evento', 'sinRegistrosBD');
            } else {
                funciones.listarEventos(data);
            }
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), envía los datos del evento para proceder a su cancelación desde el Backend.
*/
export function peticionCancelarEvento(datosEvento) {

    fetch('../../modelo/modeloEventos/cancelar-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'evento_cancelado') {
                tituloAlerta = 'Evento cancelado correctamente.';
                mensajeAlerta = `El evento ha sido cancelado.`;
                iconoAlerta = 'success';

            } else if (mensaje === 'error_cancelar') {
                tituloAlerta = 'Error al intentar cancelar el evento';
                mensajeAlerta = `Ocurrió un error al intentar cancelar el evento`;
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarEventos();
            });

        }).catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe los datos del formulario y la ID del evento anterior para proceder a su actualización.
*/
export function peticionEditarEvento(datosEvento) {

    fetch('../../modelo/modeloEventos/editar-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            buscador.value = '';
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'error_actualizar') {
                tituloAlerta = 'Error al actualizar el evento';
                mensajeAlerta = `Error al actualizar el evento. No se vieron alterados ninguno de los campos o el evento fue borrado previamente, actualice nuevamente`;
                iconoAlerta = 'error';
            } else if (mensaje === 'actualizado') {
                tituloAlerta = 'Evento actualizado correctamente';
                mensajeAlerta = `El evento se actualizó correctamente`;
                iconoAlerta = 'success';
                formEventos.reset();
                funciones.eliminarValorMediumEditor(2);
                funciones.eliminarValorTextEditor();
                funciones.eventoEditado();
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta,
            }).then(() => {
                peticionListarEventos();
            });
        })
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los eventos que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarEventos(datosEvento) {

    fetch('../../modelo/modeloEventos/buscar-eventos.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'evento_noencontrado') {
                funciones.mensajeSinEventos('No se ha encontrado ningún evento con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.listarEventos(data);
            }
        }).catch(err => console.log(err));
}