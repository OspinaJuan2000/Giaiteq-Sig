<?php
if (isset($_POST) && !empty($_POST)) {

    $nombre = trim($_POST['nombre']);
    $descripcion = trim($_POST['descripcion']);
    $lugar = trim($_POST['lugar']);
    $fechaComienzo = $_POST['comienzo'];
    $fechaFinalizacion = $_POST['finalizacion'];
    $idEvento = (int)$_POST['idEvento'];
    $nombreAnterior = trim($_POST['nombreEventoAnterior']);
    
    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement =  $conexion->prepare("UPDATE tbl_eventos SET nombre_evento = :nombre_evento, descripcion_evento = :descripcion_evento, lugar_realizacion = :lugar_realizacion, fecha_comienzo = :fecha_comienzo, fecha_finalizacion = :fecha_finalizacion WHERE id_evento = :id_evento");
        $statement->bindParam(':nombre_evento', $nombre);
        $statement->bindParam(':descripcion_evento', $descripcion);
        $statement->bindParam(':lugar_realizacion', $lugar);
        $statement->bindParam(':fecha_comienzo', $fechaComienzo);
        $statement->bindParam(':fecha_finalizacion', $fechaFinalizacion);
        $statement->bindParam(':id_evento', $idEvento);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'actualizado',
                'nombreActual' => $nombre
            );
        } else {
            $respuesta = array(
                'mensaje' => 'error_actualizar',
                'nombreAnterior' => $nombreAnterior
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e;
    }

    echo json_encode($respuesta);
}
