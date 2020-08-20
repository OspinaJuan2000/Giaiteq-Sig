export function peticionEnviarEmail(datosRecuperacion) {
    fetch('../../modelo/modeloRecuperarContra/recibir-email.php', {
        method: 'POST',
        body: datosRecuperacion
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            let tituloAlerta,
                mensajeAlerta,
                iconoAlerta = '';

            if (mensaje === 'correo_enviado') {
                tituloAlerta = 'Correo enviado exitosamente';
                mensajeAlerta = 'Por favor revise su correo electrónico para restablecer la contraseña';
                document.querySelector('.recuperar__form').reset();
                iconoAlerta = 'success';
            } else if (mensaje === 'error_enviar') {
                tituloAlerta = 'Ocurrió un error al enviar el correo';
                mensajeAlerta = 'Vuelva a intentar más tarde';
                iconoAlerta = 'error';
            } else if (mensaje === 'correo_noregistrado') {
                tituloAlerta = 'El correo que ingresó no existe en nuestro sistema';
                mensajeAlerta = 'Verifique que el correo ingresado es el correcto para poder restablecer su contraseña';
                iconoAlerta = 'error';
            }
            swal.fire({
                title: tituloAlerta,
                text: mensajeAlerta,
                icon: iconoAlerta
            });
        })
}