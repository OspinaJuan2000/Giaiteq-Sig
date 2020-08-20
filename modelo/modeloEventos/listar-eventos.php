<?php
try {
    require_once '../conexion.php';
    $instanciaConexion = new Conexion();
    $conexion = $instanciaConexion->establecer_conexion();

    $statement = $conexion->prepare("SELECT * FROM tbl_eventos");
    $statement->execute();

    if ($statement->rowCount() > 0) {
        $respuesta = array();

        while ($evento = $statement->fetch()) {
            $respuesta[] = array(
                'id' => $evento['id_evento'],
                'nombre' => $evento['nombre_evento'],
                'descripcion' => $evento['descripcion_evento'],
                'lugar_realizacion' => $evento['lugar_realizacion'],
                'fecha_comienzo' => $evento['fecha_comienzo'],
                'hora_comienzo' => $evento['hora_comienzo'],
                'fecha_finalizacion' => $evento['fecha_finalizacion'],
                'hora_finalizacion' => $evento['hora_finalizacion']
            );
        }
    } else {
        $respuesta = array(
            'mensaje' => 'sin_eventos'
        );
    }

    echo json_encode($respuesta);
} catch (Exception $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
