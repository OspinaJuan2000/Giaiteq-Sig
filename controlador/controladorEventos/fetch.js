import * as funciones from './funciones.js';

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
                funciones.mensajeSinEventos('No se ha publicado ningún evento');
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