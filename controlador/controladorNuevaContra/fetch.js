export function peticionEnviarNuevaContra(datosNuevaContra) {
    fetch('../../modelo/modeloRecuperarContra/actualizar-contra.php', {
        method: 'POST',
        body: datosNuevaContra
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'contra_actualizada') {
                tituloAlerta = 'Contraseña actualizada';
                mensajeAlerta = `${data.primerNombre[0].toUpperCase() + data.primerNombre.slice(1)}, tu contraseña ha sido actualizada correctamente, inicia sesión`;
                iconoAlerta = 'success';
            } else if (mensaje === 'error_actualizar') {
                tituloAlerta = 'Error al actualizar la contraseña';
                mensajeAlerta = 'Ocurrió un error al intentar actualizar tu contraseña, intenta más tarde por favor';
                iconoAlerta = 'error';
            }

            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta
            }).then(() => tituloAlerta === 'Contraseña actualizada' ? window.location.href = '../../index.php' : '');

        }).catch(err => console.log(err));
}