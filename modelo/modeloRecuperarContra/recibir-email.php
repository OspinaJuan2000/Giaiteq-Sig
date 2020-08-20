<?php

if (isset($_POST) && !empty($_POST)) {
    $email = $_POST['email'];

    try {
        require_once('../conexion.php');
        require_once('./enviar-email.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        //Preparar una consulta para obtener el correo del usuario y Validar que exista el correo en la base de datos..
        $statement = $conexion->prepare("SELECT correo, primer_nombre FROM tbl_usuarios WHERE correo = :email");
        $statement->bindParam(':email', $email);
        $statement->execute();

        if ($statement->rowCount() > 0) {

            //Agarrar los datos del usuario obtenidos en la primer consulta.
            $datosUsuario = $statement->fetch(PDO::FETCH_ASSOC);
            $correoUsuario = $datosUsuario['correo'];
            $primerNombreUsuario = $datosUsuario['primer_nombre'];

            //Generar un token temporal hasta que cambie la contraseña.
            $bytes = random_bytes(15);
            $tokenClave = bin2hex($bytes);

            //Consulta para actualizar el campo token_clave donde corresponda con el usuario que pide el cambio de contraseña.
            $actualizarToken = $conexion->prepare("UPDATE tbl_usuarios SET token_clave = :token WHERE correo = :email");
            $actualizarToken->bindParam(':token', $tokenClave);
            $actualizarToken->bindParam(':email', $correoUsuario);
            $actualizarToken->execute();

            require_once('./plantilla-email.php');

            //Función para enviar el correo electrónico.
            $enviado = enviarEmailPHP('GIAITEQ-SIG', $primerNombreUsuario, $correoUsuario, 'Instrucciones para restablecer la contraseña de la cuenta GIAITEQ-SIG', $mensaje);

            if ($enviado == 1) {
                $respuesta = array(
                    'mensaje' => 'correo_enviado'
                );
            } else if ($enviado == 2) {
                $respuesta = array(
                    'mensaje' => 'error_enviar'
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'correo_noregistrado'
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos:" . $e->getMessage();
    }

    echo json_encode($respuesta);
}
