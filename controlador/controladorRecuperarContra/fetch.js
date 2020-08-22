
const formRecuperar = document.querySelector('.recuperar__form');

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
                mensajeAlerta = 'Por favor revise su correo electrónico para restablecer la contraseña';
                formRecuperar.reset();
                contenedorVentana.classList.remove('visible');
                ventanaEmergente.classList.remove('visible');
                iconoAlerta = 'success';
            } else if (mensaje === 'error_enviar') {
                tituloAlerta = 'Ocurrió un error';
                mensajeAlerta = 'Ocurrió un error al enviar el correo electrónico para restablecer la contraseña, intente más tarde por favor';
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
        }).catch(err => console.log(err));
}