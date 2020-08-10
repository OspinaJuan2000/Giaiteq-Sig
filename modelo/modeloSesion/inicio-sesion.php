<?php

if (isset($_POST) && !empty($_POST)) {
    $usuario = (int) $_POST['usuario'];
    $contra = $_POST['contra'];

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("SELECT documento_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, clave, id_estado, id_perfil FROM tbl_usuarios WHERE documento_usuario = :documento");
        $statement->bindParam(':documento', $usuario);
        $statement->execute();
        $columnas = $statement->fetch(PDO::FETCH_ASSOC);

        if ($statement->rowCount() > 0) {
            if (password_verify($contra, $columnas['clave']) && $usuario == $columnas['documento_usuario']) {
                $respuesta = array(
                    'mensaje' => 'correcto',
                    'documento' => $columnas['documento_usuario'],
                    'primerNombre' => $columnas['primer_nombre'],
                    'segundoNombre' => $columnas['segundo_nombre'],
                    'primerApellido' => $columnas['primer_apellido'],
                    'segundoApellido' => $columnas['segundo_apellido'],
                    'correo' => $columnas['correo'],
                    'estado' => $columnas['id_estado'],
                    'perfil' => $columnas['id_perfil'],
                );

                if ($columnas['id_estado'] == '3') {
                    include_once './sesiones.php';
                    $sesion = new Sesiones();

                    if ($columnas['id_perfil'] == '1' || $columnas['id_perfil'] == '2') {
                        $sesion->crearSesion($columnas);
                    }
                } else {
                    session_start();
                    if (isset($_SESSION)) {
                        session_destroy();
                    }
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'contra_incorrecta',
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'usuario_noexiste',
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
