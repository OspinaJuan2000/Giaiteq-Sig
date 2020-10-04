<?php
if (isset($_POST) && !empty($_POST)) {
    $idEvento = $_POST['id'];
    $nombreEvento = trim(strip_tags($_POST['nombre']));
    $descripcionEvento = trim(strip_tags($_POST['descripcion']));
    $lugarEvento = trim(strip_tags($_POST['lugar']));
    $fechaComienzo = $_POST['comienzo'];
    $fechaFinalizacion = $_POST['finalizacion'];

    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();
        $estado = 0;

        $statement = $conexion->prepare("UPDATE tbl_eventos SET estado = :estado WHERE id_evento = :id_evento");
        $statement->bindParam(':estado', $estado);
        $statement->bindParam(':id_evento', $idEvento);
        $statement->execute();
        
        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'evento_cancelado'
            );

            require('../../externo/sendEmail-PHP/enviar-email.php');
            require('./plantilla-email.php');
        
            /* 
                Enviar correo electrónico a los estudiantes e instructores activos notificando que el evento fue cancelado.
            */
            $arrayUsuario = obtenerUsuariosActivos();
            $enviado = enviarEmailPHP('GIAITEQ-SIG', $arrayUsuario, 'Se ha cancelado un evento del semillero GIAITEQ-SIG', $mensaje);
            
        } else {
            $respuesta = array(
                'mensaje' => 'error_cancelar'
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}


/*
    Función encargada de obtener los correos de los usuarios que están activos y guardarlos en un array.
*/
function obtenerUsuariosActivos () {

    require_once '../conexion.php';
    $instanciaConexion = new Conexion();
    $conexion = $instanciaConexion->establecer_conexion();
    $statement = $conexion->prepare("SELECT correo FROM tbl_usuarios WHERE id_estado = 3");
    $statement->execute();
    $arrayUsuario = [];

    if ($statement->rowCount() > 0) {
        while ($usuarios = $statement->fetch()) {
            $arrayUsuario[] = $usuarios['correo'];
        };
    };

    return $arrayUsuario;
};