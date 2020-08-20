<?php
if (isset($_GET) && isset($_GET['code'])) {

    $tokenClave = $_GET['code'];

    try {
        require_once('../../modelo/conexion.php');
        $instanciaConexion = new Conexion();
        $conexion = $instanciaConexion->establecer_conexion();

        $statement = $conexion->prepare("SELECT correo, token_clave FROM tbl_usuarios WHERE token_clave = :token");
        $statement->bindParam(':token', $tokenClave);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $datosUsuario = $statement->fetch(PDO::FETCH_ASSOC);
            $tokenBD = $datosUsuario['token_clave'];
            $correoUsuario = $datosUsuario['correo'];

            //Proceder a actualizar.
        } else {
            //No coincide el token.
        }
    } catch (Exception $e) {
        echo "Error en la base de datos: " . $e->getMessage();
    }
}
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/estilo_general.css">
    <link rel="stylesheet" href="../css/inicio_instructores.css">
    <link rel="stylesheet" href="../css/recuperar_contra.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="icon" href="../imagenes/icono.png">
    <title>Recuperar contraseña</title>
</head>

<body>
    <div class="barra_superior">
        <div class="barra_superior__logo">
            <img src="../../vista/imagenes/logo_sena.png" alt="Logo del SENA" class="logo_sena">
        </div>
        <div class="barra_superior__nombre">
            <p class="barra_superior__nombre-largo">GRUPO DE INVESTIGACIÓN APLICADA A LA PRODUCCIÓN INDUSTRIAL, TEXTIL Y QUÍMICA</p>
        </div>
    </div>
    <div class="contenedor-recuperar">
        <div class="recuperar-contra">
            <form action="#" class="recuperar-contra__formulario" method="POST">
                <h4 class="recuperar-contra__encabezado">Restablecer tu contraseña</h4>
                <div class="recuperar-contra__campo">
                    <input class="recuperar-contra__input" type="password" placeholder="Nueva contraseña">
                </div>
                <div class="recuperar-contra__campo">
                    <input class="recuperar-contra__input" type="password" placeholder="Confirmar contraseña">
                </div>
                <div class="recuperar-contra__enviar">
                    <button class="recuperar-contra__boton">Restablecer contraseña</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>