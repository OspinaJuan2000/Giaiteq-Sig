<?php
if (isset($_POST) && !empty($_POST)) {

    session_start();
    $documento = $_SESSION['instructor']['documento'];
    $nombre = trim($_POST['nombre']);
    $descripcion = trim($_POST['descripcion']);
    $lugar = trim($_POST['lugar']);
    $fechaComienzo = $_POST['comienzo'];
    $fechaFinalizacion = $_POST['finalizacion'];

    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("INSERT INTO tbl_eventos (nombre_evento, descripcion_evento, lugar_realizacion, fecha_comienzo, fecha_finalizacion, documento_usuario) VALUES (:nombre_evento, :descripcion_evento, :lugar_realizacion, :fecha_comienzo, :fecha_finalizacion, :documento_usuario)");
        $statement->bindParam(':nombre_evento', $nombre);
        $statement->bindParam(':descripcion_evento', $descripcion);
        $statement->bindParam(':lugar_realizacion', $lugar);
        $statement->bindParam(':fecha_comienzo', $fechaComienzo);
        $statement->bindParam(':fecha_finalizacion', $fechaFinalizacion);
        $statement->bindParam(':documento_usuario', $documento);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'subido',
                'evento' => $nombre
            );
        } else {
            $respuesta = array(
                'mensaje' => 'error_subir'
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
