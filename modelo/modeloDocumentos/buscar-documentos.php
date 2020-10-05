<?php
if (isset($_POST) && $_POST['filtro'] !== '') {

    $filtroBusqueda = trim($_POST['filtro']);

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();
        $filtro = "%$filtroBusqueda%";

        $statement = $conexion->prepare("SELECT tbl_rutas_contenido.id_contenido, tbl_rutas_contenido.ruta, tbl_contenido.titulo, tbl_contenido.descripcion, tbl_contenido.fecha_publicacion, tbl_contenido.documento_usuario, tbl_contenido.id_tipo_contenido FROM tbl_rutas_contenido INNER JOIN tbl_contenido ON tbl_contenido.id_contenido = tbl_rutas_contenido.id_contenido WHERE tbl_contenido.id_tipo_contenido = 2 AND tbl_contenido.titulo LIKE :filtro");
        $statement->bindParam(':filtro', $filtro);
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
                    'fecha' => ucfirst(strftime("%A, %d de %B del %Y - %R", strtotime($documento['fecha_publicacion']))),
                    'tipo_contenido' => $documento['id_tipo_contenido']
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'documento_noencontrado'
            );
        }

        echo json_encode($respuesta);
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
