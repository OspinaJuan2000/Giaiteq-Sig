<?php
try {
    require_once '../conexion.php';
    $instanciaConexion = new Conexion();
    $conexion = $instanciaConexion->establecer_conexion();

    $statement = $conexion->prepare("SELECT * FROM tbl_eventos WHERE estado <> 0");
    $statement->execute();

    if ($statement->rowCount() > 0) {
        $respuesta = array();
        setlocale(LC_TIME, 'spanish.UTF-8');

        while ($evento = $statement->fetch()) {
            $respuesta[] = array(
                'id' => $evento['id_evento'],
                'nombre' => $evento['nombre_evento'],
                'descripcion' => $evento['descripcion_evento'],
                'lugar_realizacion' => $evento['lugar_realizacion'],
                'fecha_comienzo' => $evento['fecha_comienzo'],
                'fecha_comienzo_format' => ucfirst(strftime("%A, %d de %B del %Y - %R", strtotime($evento['fecha_comienzo']))),
                'fecha_finalizacion' => $evento['fecha_finalizacion'],
                'fecha_finalizacion_format' => ucfirst(strftime("%A, %d de %B del %Y - %R", strtotime($evento['fecha_finalizacion']))),
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