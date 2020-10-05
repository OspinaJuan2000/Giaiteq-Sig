<?php
if (isset($_POST) && $_POST['filtro'] !== '') {

    $filtroBusqueda = trim($_POST['filtro']);

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();
        $filtro = "%$filtroBusqueda%";

        $statement = $conexion->prepare("SELECT id_contenido, titulo, descripcion, fecha_publicacion, documento_usuario, id_tipo_contenido FROM  tbl_contenido  WHERE id_tipo_contenido = 4 AND titulo LIKE :filtro ORDER BY id_contenido DESC");
        $statement->bindParam(':filtro', $filtro);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array();
            setlocale(LC_TIME, 'spanish.UTF-8');
            
            while ($link = $statement->fetch()) {
                $respuesta[] = array(
                    'id' => $link['id_contenido'],
                    'titulo' => $link['titulo'],
                    'descripcion' => $link['descripcion'],
                    'contenido' => strip_tags($link['descripcion']),
                    'fecha' => ucfirst(strftime("%d/%m/%Y", strtotime($link['fecha_publicacion']))),
                    'tipo_contenido' => $link['id_tipo_contenido']
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'link_noencontrado'
            );
        }

        echo json_encode($respuesta);
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
