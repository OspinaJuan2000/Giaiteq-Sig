import * as funciones from './funciones.js';

/*
    Esta función envía una petición al Backend (PHP) con los datos del usuario que intenta iniciar sesión, de acuerdo a la respuesta mostrará una alerta o dirigirá al usuario a una vista.
*/
export function peticion_iniciarSesion(datosUsuario) {
    fetch('./modelo/modeloSesion/inicio-sesion.php', {
        method: 'POST',
        body: datosUsuario,
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'correcto') {
                const { estado } = data;

                if (estado === '1') {
                    swal.fire({
                        title: 'Datos en revisión',
                        text:
                            'Tus datos están en revisión por los instructores del semillero, intenta más tarde',
                        icon: 'info',
                    });
                } else if (estado === '2') {
                    swal.fire({
                        title: 'No tienes acceso al semillero',
                        text:
                            'Tu estado en el sistema es rechazado, comúnicate con un instructor del semillero',
                        icon: 'error',
                    });
                } else if (estado === '3') {
                    const { perfil } = data;
                    document.querySelector('#form-inicio').reset();
                    if (perfil === '1') {
                        window.location.href = 'vista/html/inicio_instructores.php';
                    } else if (perfil === '2') {
                        window.location.href = 'vista/html/inicio_aprendices.php';
                    }
                }
            } else if (mensaje === 'usuario_noexiste') {
                funciones.mensajeCamposVacios(
                    'El usuario no existe, verifique los datos',
                    'campos-vaciosError',
                    document.querySelector('#form-inicio')
                );
            } else if (mensaje === 'contra_incorrecta') {
                funciones.mensajeCamposVacios(
                    'La contraseña es incorrecta',
                    'campos-vaciosError',
                    document.querySelector('#form-inicio')
                );
            }
        })
        .catch(err => console.log(err));
}