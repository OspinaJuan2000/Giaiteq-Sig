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
            })
        }).catch(err => console.log(err));
}