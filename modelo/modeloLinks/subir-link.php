<?php
if (isset($_POST) && !empty($_POST)) {

    session_start();
    $documento = $_SESSION['instructor']['documento'];
    $titulo = trim($_POST['titulo']);
    $descripcion = trim($_POST['descripcion']);

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        //QUERY PARA INSERTAR EN TABLA_CONTENIDO.
        $statement = $conexion->prepare('INSERT INTO tbl_contenido (titulo, descripcion, documento_usuario, id_tipo_contenido) VALUES (:titulo, :descripcion, :documento_usuario, 4)');
        $statement->bindParam(':titulo', $titulo);
        $statement->bindParam(':descripcion', $descripcion);
        $statement->bindParam(':documento_usuario', $documento);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'subido',
                'titulo' => strip_tags($titulo),
            );

        } else {
            $respuesta = array(
                'mensaje' => 'error_subir',
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
