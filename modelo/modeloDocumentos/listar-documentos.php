<?php
try {
    require_once '../conexion.php';
    $instanciaConexion = new Conexion();
    $conexion = $instanciaConexion->establecer_conexion();

    $statement = $conexion->prepare("SELECT tbl_rutas_contenido.id_contenido, tbl_rutas_contenido.ruta, tbl_contenido.titulo, tbl_contenido.descripcion, tbl_contenido.fecha_publicacion, tbl_contenido.documento_usuario, tbl_contenido.id_tipo_contenido FROM tbl_rutas_contenido INNER JOIN tbl_contenido ON tbl_contenido.id_contenido = tbl_rutas_contenido.id_contenido WHERE tbl_contenido.id_tipo_contenido = 2 ORDER BY tbl_contenido.id_contenido DESC");
    $statement->execute();

    if ($statement->rowCount() > 0) {
        $respuesta = array();
        setlocale(LC_TIME, 'spanish.UTF-8');

        while ($documento = $statement->fetch()) {
            $respuesta[] = array(
                'id' => $documento['id_contenido'],
                'ruta' => $documento['ruta'],
                'titulo' => $documento['titulo'],
                'descripcion' => $documento['descripcion'],
                'fecha' => ucfirst(strftime("%d/%m/%Y", strtotime($documento['fecha_publicacion']))),
                'tipo_contenido' => $documento['id_tipo_contenido']
            );
        }
    } else {
        $respuesta = array(
            'mensaje' => 'sin_documentos'
        );
    }

    echo json_encode($respuesta);
} catch (Exception $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
