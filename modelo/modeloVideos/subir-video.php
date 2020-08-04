<?php
if (isset($_POST) && !empty($_POST)) {

    if (is_uploaded_file($_FILES['video']['tmp_name'])) {
        $ruta = './videos/';
        $nombreArchivo = $_FILES['video']['name'];
        $formato = $_FILES['video']['type'];
        $upload = $ruta . $nombreArchivo;
        $megabytesMaximos = round($_FILES['video']['size'] / 1e+6);

        if ($formato === 'video/mp4') {
            if ($megabytesMaximos > 50) {
                $response = array(
                    'mensaje' => 'peso_excedido',
                );
            } else {
                if (file_exists($upload)) {
                    $response = array(
                        'mensaje' => 'ya_existe',
                    );
                } else {
                    if (move_uploaded_file($_FILES['video']['tmp_name'], $upload)) {
                        session_start();
                        $documento = (int) $_SESSION['instructor']['documento'];
                        $titulo = $_POST['titulo'];
                        $descripcion = $_POST['descripcion'];

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

                            // QUERY PARA INSERTAR EN TABLA_RUTAS CONTENIDO.
                            $statement2 = $conexion->prepare('INSERT INTO tbl_rutas_contenido (id_contenido, ruta) VALUES (:id_contenido, :ruta)');
                            $statement2->bindParam(':id_contenido', $id_contenido);
                            $statement2->bindParam(':ruta', $upload);
                            $statement2->execute();

                            if ($statement2->rowCount() > 0) {
                                $response = array(
                                    'mensaje' => 'subido',
                                    'nombre' => $nombreArchivo,
                                );
                            } else {
                                $response = array(
                                    'mensaje' => 'error_subir',
                                );
                            }
                        } catch (Exception $e) {
                            echo "Error en la base de datos: " . $e->getMessage();
                        }
                    }
                }
            }
        } else {
            $response = array(
                'mensaje' => 'solo_mp4',
            );
        }
    }

    echo json_encode($response);
}
