<?php

if (isset($_POST) && !empty($_POST)) {

    $idVideo = (int) $_POST['idVideo'];
    $nombreArchivoAnterior = trim($_POST['nombreVideoAnterior']);
    $nombreArchivo = trim($_POST['nombreVideo']);
    $ruta = './videos/';
    
    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();
        $titulo = trim($_POST['titulo']);
        $descripcion = trim($_POST['descripcion']);

        if (is_uploaded_file($_FILES['video']['tmp_name'])) {

            $formato = $_FILES['video']['type'];
            $bytes = random_bytes(15);
            $tokenUnicoVideos = bin2hex($bytes);
            $upload = $ruta . $tokenUnicoVideos . $nombreArchivo;
            $megabytesMaximos = round($_FILES['video']['size'] / 1e+6);
            $formatosPermitidos = ['video/webm', 'video/mp4'];

            if (in_array($formato, $formatosPermitidos)) {
                if ($megabytesMaximos <= 80) {
                    move_uploaded_file($_FILES['video']['tmp_name'], './videos/' . $nombreArchivoAnterior);

                    rename('./videos/' . $nombreArchivoAnterior, './videos/' . $tokenUnicoVideos . $nombreArchivo);
                } else {
                    $respuesta = array(
                        'mensaje' => 'peso_excedido',
                    );
                }

            } else {
                $respuesta = array(
                    'mensaje' => 'solo_mp4_webm',
                );

                echo json_encode($respuesta);
                die();
            }

        } else {
            $upload = "./videos/{$nombreArchivoAnterior}";
        }

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
            $respuesta = array(
                'mensaje' => 'actualizado',
                'nombreAnterior' => $nombreArchivoAnterior,
            );

        } else {
            $respuesta = array(
                'mensaje' => 'error_actualizar',
                'nombreAnterior' => $nombreArchivoAnterior,
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
