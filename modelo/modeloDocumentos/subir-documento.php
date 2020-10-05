<?php
    if (isset($_POST) && !empty($_POST)) {

        if (is_uploaded_file($_FILES['documento']['tmp_name'])) {
            $ruta = './documentos/';
            $nombreArchivo = trim($_POST['nombreDocumento']);
            $formato = $_FILES['documento']['type'];
            $bytes = random_bytes(15);
            $tokenUnicoDocumentos = bin2hex($bytes);
            $upload = $ruta . $tokenUnicoDocumentos . $nombreArchivo;
            $megabytesMaximos = round($_FILES['documento']['size'] / 1e+6);
            $formatosPermitidos = ['application/msword', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

            if(in_array($formato, $formatosPermitidos)) {
                if ($megabytesMaximos > 200) {
                    $respuesta = array(
                        'mensaje' => 'peso_excedido',
                    );
                } else {
                    session_start();
                    $documento = $_SESSION['instructor']['documento'];
                    $titulo = trim($_POST['titulo']);
                    $descripcion = trim($_POST['descripcion']);

                    if (!file_exists('../modeloDocumentos/documentos')) {
                        mkdir('../modeloDocumentos/documentos');
                    }

                    try {
                        require_once '../conexion.php';
                        $instanciaConexion = new Conexion();
                        $conexion = $instanciaConexion->establecer_conexion();

                        //QUERY PARA INSERTAR EN TABLA_CONTENIDO.
                        $statement = $conexion->prepare('INSERT INTO tbl_contenido (titulo, descripcion, documento_usuario, id_tipo_contenido) VALUES (:titulo, :descripcion, :documento_usuario, 2)');
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

                            move_uploaded_file($_FILES['documento']['tmp_name'], $upload);

                        } else {
                            $respuesta = array(
                                'mensaje' => 'error_subir',
                            );
                        }
                    } catch (Exception $e) {
                        echo "Error en la base de datos: " . $e->getMessage();
                    }
                }
            } else {
                $respuesta = array(
                    'mensaje' => 'formato_invalido',
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'sindocumento',
            );
        }

        echo json_encode($respuesta);
    }
    
?>