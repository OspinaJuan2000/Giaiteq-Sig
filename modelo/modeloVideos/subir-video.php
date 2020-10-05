<?php

if (isset($_POST) && !empty($_POST)) {

    if (is_uploaded_file($_FILES['video']['tmp_name'])) {
        $ruta = './videos/';
        $nombreArchivo = trim($_POST['nombreVideo']);
        $formato = $_FILES['video']['type'];
        $bytes = random_bytes(15);
        $tokenUnicoVideos = bin2hex($bytes);
        $upload = $ruta . $tokenUnicoVideos . $nombreArchivo;
        $megabytesMaximos = round($_FILES['video']['size'] / 1e+6);
        $formatosPermitidos = ['video/webm', 'video/mp4'];
        
        if (in_array($formato, $formatosPermitidos)) {
            if ($megabytesMaximos > 80) {
                $respuesta = array(
                    'mensaje' => 'peso_excedido',
                );
            } else {
                if (file_exists($upload)) {
                    $respuesta = array(
                        'mensaje' => 'ya_existe',
                    );
                } else {
                    session_start();
                    $documento = $_SESSION['instructor']['documento'];
                    $titulo = trim($_POST['titulo']);
                    $descripcion = trim($_POST['descripcion']);

                    if (!file_exists('../modeloVideos/videos')) {
                        mkdir('../modeloVideos/videos');
                    }

                    try {
                        require_once '../conexion.php';
                        $instanciaConexion = new Conexion();
                        $conexion = $instanciaConexion->establecer_conexion();

                        //QUERY PARA INSERTAR EN TABLA_CONTENIDO.
                        $statement = $conexion->prepare('INSERT INTO tbl_contenido (titulo, descripcion, documento_usuario, id_tipo_contenido) VALUES (:titulo, :descripcion, :documento_usuario, 3)');
                        $statement->bindParam(':titulo', $titulo);
                        $statement->bindParam(':descripcion', $descripcion);
                        $statement->bindParam(':documento_usuario', $documento);
                        $statement->execute();

                        /************************* -------- **************/

                        $id_contenido = $conexion->lastInsertId();

                        //QUERY PARA ACTUALIZAR EN LA TABLA TBL_RUTAS_CONTENIDO.
                        $statement2 = $conexion->prepare('INSERT INTO tbl_rutas_contenido (id_contenido, ruta) VALUES (:id_contenido, :ruta)');
                        $statement2->bindParam(':id_contenido', $id_contenido);
                        $statement2->bindParam(':ruta', $upload);
                        $statement2->execute();

                        if ($statement2->rowCount() > 0 || $statement->rowCount() > 0) {
                            $respuesta = array(
                                'mensaje' => 'subido',
                                'nombre' => $nombreArchivo,
                            );

                            move_uploaded_file($_FILES['video']['tmp_name'], $upload);
                        } else {
                            $respuesta = array(
                                'mensaje' => 'error_subir',
                            );
                        }
                    } catch (Exception $e) {
                        echo "Error en la base de datos: " . $e->getMessage();
                    }
                }
            }
        } else {
            $respuesta = array(
                'mensaje' => 'solo_mp4_webm',
            );
        }
    } else {
        $respuesta = array(
            'mensaje' => 'sinvideo',
        );
    }

    echo json_encode($respuesta);
}
