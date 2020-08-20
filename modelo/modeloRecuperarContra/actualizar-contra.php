<?php
if (isset($_POST) && !empty($_POST)) {
    $nuevaContra = $_POST['contra'];
    $tokenClave = $_POST['token'];

    try {
        require_once('../conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("SELECT primer_nombre, correo, clave, token_clave FROM tbl_usuarios WHERE token_clave = :token");
        $statement->bindParam(':token', $tokenClave);
        $statement->execute();
        $resultados = $statement->fetch(PDO::FETCH_ASSOC);
        $primerNombre = $resultados['primer_nombre'];
        $contraAnterior = $resultados['clave'];
        $correo = $resultados['correo'];

        $nuevaContraCrypt = password_hash($nuevaContra, PASSWORD_DEFAULT, ['cost' => 12]);
        $actualizar = $conexion->prepare("UPDATE tbl_usuarios SET clave = :nueva, token_clave = '' WHERE correo = :email");
        $actualizar->bindParam(':nueva', $nuevaContraCrypt);
        $actualizar->bindParam(':email', $correo);
        $actualizar->execute();

        if ($actualizar->rowCount() > 0) {
            $respuesta = array(
                'mensaje' => 'contra_actualizada',
                'primerNombre' => $primerNombre
            );
        } else {
            $respuesta = array(
                'mensaje' => 'error_actualizar'
            );
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }

    echo json_encode($respuesta);
}
