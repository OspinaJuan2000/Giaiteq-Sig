<?php

if (isset($_POST) && !empty($_POST)) {


    $idLink = (int) $_POST['id'];
    $tituloLink = trim(strip_tags($_POST['titulo']));

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("DELETE FROM tbl_contenido WHERE id_contenido = :id_contenido");
        $statement->bindParam(':id_contenido', $idLink);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'link_eliminado',
                'titulo' => $tituloLink
            );

        } else {
            $respuesta = array(
                'mensaje' => 'link_noeliminado',
                'titulo' => $tituloLink
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
