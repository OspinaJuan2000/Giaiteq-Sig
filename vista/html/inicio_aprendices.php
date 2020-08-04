<?php
include_once '../../modelo/modeloSesion/sesiones.php';
$sesion = new Sesiones();
$sesion->accesoGeneral();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../css/estilo_general.css">
    <link rel="stylesheet" href="../css/inicio_instructores.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="icon" href="../imagenes/icono.png">
    <title>Inicio</title>
</head>

<body>
    <div class="barra_superior">
        <div class="barra_superior__logo">
            <img src="../imagenes/logo_sena.png" alt="Logo del SENA" class="logo_sena">
        </div>
        <div class="barra_superior__nombre">
            <p>GRUPO DE INVESTIGACIÓN APLICADA A LA PRODUCCIÓN INDUSTRIAL, TEXTIL Y QUÍMICA</p>
        </div>
    </div>

    <div class="contenedor_central">
        <div class="contenedor_central__opciones">
            <ul class="opciones__menu">
                <li><a href="#"><i class="far fa-lightbulb"></i> INICIO</a></li>
                <li><a href="#"><i class="far fa-file-archive"></i> DOCUMENTOS</a></li>
                <li><a href="#"><i class="far fa-file-video"></i> VIDEOS</a></li>
                <li><a href="#"><i class="fas fa-link"></i> LINKS</a></li>
                <li><a href="#"><i class="fas fa-project-diagram"></i> PROYECTOS</a></li>
                <li><a href="#"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
                <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
                <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
            </ul>
        </div>
        <div class="contenedor_central__contenido">

        </div>
    </div>
</body>

</html>