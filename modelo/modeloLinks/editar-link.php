<?php

if (isset($_POST) && !empty($_POST)) {

    $idLink = (int) $_POST['idLink'];
    $titulo = trim($_POST['titulo']);
    $descripcion = trim($_POST['descripcion']);

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        //QUERY PARA ACTUALIZAR EN LA TABLA TBL_CONTENIDO.
        $statement = $conexion->prepare("UPDATE tbl_contenido SET titulo = :titulo, descripcion = :descripcion WHERE id_contenido = :id_contenido");
        $statement->bindParam(':titulo', $titulo);
        $statement->bindParam(':descripcion', $descripcion);
        $statement->bindParam(':id_contenido', $idLink);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'actualizado',
                'nombreAnterior' => strip_tags($titulo),
            );

        } else {
            $respuesta = array(
                'mensaje' => 'error_actualizar',
                'nombreAnterior' => strip_tags($titulo),
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
