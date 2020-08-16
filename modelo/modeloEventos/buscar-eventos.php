<?php
if (isset($_POST) && $_POST['filtro'] !== '') {

    $filtroBusqueda = $_POST['filtro'];

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("SELECT * FROM tbl_eventos WHERE nombre_evento LIKE '%{$filtroBusqueda}%'");
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
                'mensaje' => 'evento_noencontrado'
            );
        }

        echo json_encode($respuesta);
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
