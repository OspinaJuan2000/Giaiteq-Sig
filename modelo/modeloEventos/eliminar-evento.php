<?php
if (isset($_POST) && !empty($_POST)) {
    $idEvento = $_POST['id'];
    $nombreEvento = $_POST['nombre'];

    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("DELETE FROM tbl_eventos WHERE id_evento = :id_evento");
        $statement->bindParam(':id_evento', $idEvento);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'evento_eliminado',
                'nombre' => $nombreEvento
            );
        } else {
            $respuesta = array(
                'mensaje' => 'error_eliminar'
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
