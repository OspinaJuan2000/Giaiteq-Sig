<?php
if (isset($_POST) && !empty($_POST)) {

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $lugar = $_POST['lugar'];
    $fechaComienzo = $_POST['fecha-comienzo'];
    $horaComienzo = $_POST['hora-comienzo'];
    $fechaFinalizacion = $_POST['fecha-finalizacion'];
    $horaFinalizacion = $_POST['hora-finalizacion'];
    $idEvento = (int)$_POST['idEvento'];
    $nombreAnterior = $_POST['nombreEventoAnterior'];

    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement =  $conexion->prepare("UPDATE tbl_eventos SET nombre_evento = :nombre_evento, descripcion_evento = :descripcion_evento, lugar_realizacion = :lugar_realizacion, fecha_comienzo = :fecha_comienzo, hora_comienzo = :hora_comienzo, fecha_finalizacion = :fecha_finalizacion, hora_finalizacion = :hora_finalizacion WHERE id_evento = :id_evento");
        $statement->bindParam(':nombre_evento', $nombre);
        $statement->bindParam(':descripcion_evento', $descripcion);
        $statement->bindParam(':lugar_realizacion', $lugar);
        $statement->bindParam(':fecha_comienzo', $fechaComienzo);
        $statement->bindParam(':hora_comienzo', $horaComienzo);
        $statement->bindParam(':fecha_finalizacion', $fechaFinalizacion);
        $statement->bindParam(':hora_finalizacion', $horaFinalizacion);
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
