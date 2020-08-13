<?php
if (isset($_POST) && $_POST['filtro'] !== '') {

    $filtroBusqueda = $_POST['filtro'];

    try {

        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("SELECT tbl_rutas_contenido.id_contenido, tbl_rutas_contenido.ruta, tbl_contenido.titulo, tbl_contenido.descripcion, tbl_contenido.fecha_publicacion, tbl_contenido.documento_usuario, tbl_contenido.id_tipo_contenido FROM tbl_rutas_contenido INNER JOIN tbl_contenido ON tbl_contenido.id_contenido = tbl_rutas_contenido.id_contenido WHERE tbl_contenido.id_tipo_contenido = 3 AND tbl_contenido.titulo LIKE '%{$filtroBusqueda}%' ");
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array();

            while ($video = $statement->fetch()) {
                $respuesta[] = array(
                    'id' => $video['id_contenido'],
                    'ruta' => $video['ruta'],
                    'titulo' => $video['titulo'],
                    'descripcion' => $video['descripcion'],
                    'fecha' => $video['fecha_publicacion'],
                    'tipo_contenido' => $video['id_tipo_contenido']
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'video_noencontrado'
            );
        }

        echo json_encode($respuesta);
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
