<?php

if (isset($_POST) && !empty($_POST)) {

    $idDocumento = (int) $_POST['id'];
    $nombreDocumento = trim($_POST['nombre']);

    $documentoPorEliminar = "./documentos/" . "" . $nombreDocumento;

    try {
        require_once '../conexion.php';
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("CALL eliminar_documentos($idDocumento)");
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'documento_eliminado',
                'titulo' => $nombreDocumento
            );

            if (file_exists($documentoPorEliminar)) {
                unlink($documentoPorEliminar);
            }
            
        } else {
            $respuesta = array(
                'mensaje' => 'documento_noeliminado',
                'titulo' => $nombreDocumento
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
