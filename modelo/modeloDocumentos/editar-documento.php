<?php

if (isset($_POST) && !empty($_POST)) {


    $idDocumento = (int) $_POST['idDocumento'];
    $nombreArchivoAnterior = trim($_POST['nombreDocumentoAnterior']);
    $nombreArchivo = trim($_POST['nombreDocumento']);
    $ruta = './documentos/';
    
    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();
        $titulo = trim($_POST['titulo']);
        $descripcion = trim($_POST['descripcion']);

        if (is_uploaded_file($_FILES['documento']['tmp_name'])) {

            $formato = $_FILES['documento']['type'];
            $bytes = random_bytes(15);
            $tokenUnicoDocumentos = bin2hex($bytes);
            $upload = $ruta . $tokenUnicoDocumentos . $nombreArchivo;
            $megabytesMaximos = round($_FILES['documento']['size'] / 1e+6);
            $formatosPermitidos = ['application/msword', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

            if (in_array($formato, $formatosPermitidos)) {
                if ($megabytesMaximos <= 80) {
                    move_uploaded_file($_FILES['documento']['tmp_name'], './documentos/' . $nombreArchivoAnterior);

                    rename('./documentos/' . $nombreArchivoAnterior, './documentos/' . $tokenUnicoDocumentos . $nombreArchivo);
                } else {
                    $respuesta = array(
                        'mensaje' => 'peso_excedido',
                    );
                }

            } else {
                $respuesta = array(
                    'mensaje' => 'formato_invalido',
                );

                echo json_encode($respuesta);
                die();
            }

        } else {
            $upload = "./documentos/{$nombreArchivoAnterior}";
        }

        //QUERY PARA ACTUALIZAR EN LA TABLA TBL_RUTAS_CONTENIDO.
        $statement = $conexion->prepare("UPDATE tbl_rutas_contenido SET ruta = :ruta WHERE id_contenido = :id_contenido");
        $statement->bindParam(':ruta', $upload);
        $statement->bindParam(':id_contenido', $idDocumento);

        //QUERY PARA ACTUALIZAR EN LA TABLA TABLA_CONTENIDO.
        $statement2 = $conexion->prepare("UPDATE tbl_contenido SET titulo = :titulo, descripcion = :descripcion WHERE id_contenido = :id_contenido");
        $statement2->bindParam(':titulo', $titulo);
        $statement2->bindParam(':descripcion', $descripcion);
        $statement2->bindParam(':id_contenido', $idDocumento);

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
