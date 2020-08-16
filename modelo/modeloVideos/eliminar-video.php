<?php

if (isset($_POST) && !empty($_POST)) {

    $idVideo = (int) $_POST['id'];
    $nombreVideo = $_POST['nombre'];

    $videoPorEliminar = "./videos/" . "" . $nombreVideo;

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("CALL eliminar_videos($idVideo)");
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'video_eliminado',
                'titulo' => $nombreVideo
            );

            if (file_exists($videoPorEliminar)) {
                unlink($videoPorEliminar);
            }
        } else {
            $respuesta = array(
                'mensaje' => 'video_noeliminado',
                'titulo' => $nombreVideo
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
