
const formRecuperar = document.querySelector('.recuperar__form');


/*
    Esta función envía una petición al Backend (PHP) para enviarle un email al correo electrónico del usuario que solicite un cambio de contraseña. Dependiendo la respuesta que reciba, mostrará un mensaje de alerta.
*/
export function peticionEnviarEmail(datosRecuperacion) {
    fetch('./modelo/modeloRecuperarContra/recibir-email.php', {
        method: 'POST',
        body: datosRecuperacion
    }).then(response => response.json())
        .then(data => {
            const contenedorVentana = document.querySelector('.contenedorVentana');
            const ventanaEmergente = document.querySelector('.ventanaEmergente');
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'correo_enviado') {
                tituloAlerta = 'Correo enviado exitosamente';
                mensajeAlerta = 'Se ha enviado un correo electrónico con las instrucciones para la modificación de la contraseña';
                formRecuperar.reset();
                contenedorVentana.classList.remove('visible');
                ventanaEmergente.classList.remove('visible');
                iconoAlerta = 'success';
            } else if (mensaje === 'error_enviar') {
                tituloAlerta = 'Ocurrió un error';
                mensajeAlerta = 'Ocurrió un error al enviar el correo electrónico para restablecer la contraseña, intente más tarde por favor';
                iconoAlerta = 'error';
            } else if (mensaje === 'correo_noregistrado') {
                tituloAlerta = 'No existe un usuario asociado al email ingresado';
                mensajeAlerta = 'Verifique que el email ingresado es correcto para restablecer su contraseña';
                iconoAlerta = 'error';
            }
            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta
            });
        }).catch(err => console.log(err));
}