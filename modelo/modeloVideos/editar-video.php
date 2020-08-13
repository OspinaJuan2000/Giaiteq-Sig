<?php

if (isset($_POST) && !empty($_POST)) {

    if (is_uploaded_file($_FILES['video']['tmp_name'])) {

        $ruta = './videos/';
        $nombreArchivo = $_POST['nombreVideo'];
        $formato = $_FILES['video']['type'];
        $upload = $ruta . $nombreArchivo;
        $megabytesMaximos = round($_FILES['video']['size'] / 1e+6);
        $idVideo = (int) $_POST['idVideo'];
        $nombreArchivoAnterior = $_POST['nombreVideoAnterior'];
        $archivoActual = $_FILES['video']['tmp_name'];

        if ($formato === 'video/mp4' || $formato === 'video/webm') {
            if ($megabytesMaximos > 80) {
                $response = array(
                    'mensaje' => 'peso_excedido',
                );
            } else {

                try {
                    require_once '../conexion.php';
                    $instanciaConexion = new Conexion();
                    $conexion = $instanciaConexion->establecer_conexion();
                    $titulo = $_POST['titulo'];
                    $descripcion = $_POST['descripcion'];

                    //QUERY PARA ACTUALIZAR EN LA TABLA TBL_RUTAS_CONTENIDO.
                    $statement = $conexion->prepare("UPDATE tbl_rutas_contenido SET ruta = :ruta WHERE id_contenido = :id_contenido");
                    $statement->bindParam(':ruta', $upload);
                    $statement->bindParam(':id_contenido', $idVideo);

                    //QUERY PARA ACTUALIZAR EN LA TABLA TABLA_CONTENIDO.
                    $statement2 = $conexion->prepare("UPDATE tbl_contenido SET titulo = :titulo, descripcion = :descripcion WHERE id_contenido = :id_contenido");
                    $statement2->bindParam(':titulo', $titulo);
                    $statement2->bindParam(':descripcion', $descripcion);
                    $statement2->bindParam(':id_contenido', $idVideo);

                    $statement->execute();
                    $statement2->execute();

                    if ($statement->rowCount() > 0 || $statement2->rowCount() > 0) {
                        $response = array(
                            'mensaje' => 'actualizado',
                            'nombreActual' => $nombreArchivo
                        );

                        move_uploaded_file($_FILES['video']['tmp_name'], './videos/' . $nombreArchivoAnterior);

                        rename('./videos/' . $nombreArchivoAnterior, './videos/' . $nombreArchivo);

                    } else {
                        $response = array(
                            'mensaje' => 'error_actualizar',
                            'nombreAnterior' => $nombreArchivoAnterior
                        );
                    }
                } catch (Exception $e) {
                    echo "Error en la base de datos: " . $e->getMessage();
                }
            }
        }
    } else {
        $response = array(
            'mensaje' => 'solo_mp4_webm',
        );
    }
    echo json_encode($response);
}
