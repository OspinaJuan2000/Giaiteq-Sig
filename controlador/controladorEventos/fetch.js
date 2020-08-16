import * as funciones from './funciones.js';

const formEventos = document.querySelector('#form-eventos');

export function peticionSubirEvento(datosEvento) {
    fetch('../../modelo/modeloEventos/subir-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'subido') {
                tituloAlerta = 'Evento publicado correctamente';
                mensajeAlerta = `El evento ${data.evento} ha sido publicado`;
                iconoAlerta = 'success';
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
                formEventos.reset();
                peticionListarEventos();
            })
        }).catch(err => console.log(err));
}

export function peticionListarEventos() {
    fetch('../../modelo/modeloEventos/listar-eventos.php')
        .then(response => response.json())
        .then(data => {
            if (data.mensaje == 'sin_eventos') {
                funciones.eliminarListaEventos();
                funciones.mensajeSinEventos('No se ha publicado ningún evento', 'sinRegistrosBD');
            } else {
                funciones.listarEventos(data);
            }
        })
        .catch(err => console.log(err));
}

export function peticionEliminarEvento(datosEvento) {
    fetch('../../modelo/modeloEventos/eliminar-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (data.mensaje === 'evento_eliminado') {
                tituloAlerta = 'Evento eliminado correctamente.';
                mensajeAlerta = `El evento ${data.nombre} ha sido eliminado.`;
                iconoAlerta = 'success';

            } else if (data.mensaje === 'error_eliminar') {
                tituloAlerta = 'Error al intentar eliminar';
                mensajeAlerta = `Ocurrió un error al intentar eliminar el evento ${data.nombre}`;
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

export function peticionEditarEvento(datosEvento) {
    fetch('../../modelo/modeloEventos/editar-evento.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;
            console.log(data);
            console.log(mensaje);

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'error_actualizar') {
                tituloAlerta = 'Error al actualizar el evento';
                mensajeAlerta = `Error al actualizar el evento ${data.nombreAnterior}. No se vieron alterados ninguno de los campos o el evento fue borrado previamente, actualice nuevamente`;
                iconoAlerta = 'error';
            } else if (mensaje === 'actualizado') {
                tituloAlerta = 'Evento actualizado correctamente';
                mensajeAlerta = `El evento se actualizó correctamente a ${data.nombreActual}`;
                iconoAlerta = 'success';
                formEventos.reset();
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

export function peticionBuscarEventos(datosEvento) {
    fetch('../../modelo/modeloEventos/buscar-eventos.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            if (data.mensaje === 'evento_noencontrado') {
                funciones.mensajeSinEventos('No se ha encontrado ningún evento con tal nombre', 'sinFiltrosBD');
            } else {
                funciones.listarEventos(data);
            }
        }).catch(err => console.log(err));
}