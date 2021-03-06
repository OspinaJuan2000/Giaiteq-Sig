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
    <link rel="stylesheet" href="../css/documento_instructores.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="icon" href="../imagenes/icono.png">
    <title>Documentos</title>
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

    <div class="contenedor_central">
        <div class="contenedor_central__opciones">
            <div class="nombre">
                <i class="fas fa-user"></i>
                <span>
                    <?php echo isset($_SESSION['instructor']) ?  ucfirst($_SESSION['instructor']['nombre']) : ucfirst($_SESSION['aprendiz']['nombre']) ?>
                </span>
            </div>
            <ul class="opciones__menu">
                <li><a href="inicio_aprendices.php"><i class="far fa-lightbulb"></i> INICIO</a></li>
                <li><a href="documento_aprendices.php"><i class="far fa-file-archive"></i> DOCUMENTOS</a></li>
                <li><a href="video_aprendices.php"><i class="far fa-file-video"></i> VIDEOS</a></li>
                <li><a href="links_aprendices.php"><i class="fas fa-link"></i> LINKS</a></li>
                <li><a href="evento_aprendices.php"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
                <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
                <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
            </ul>
        </div>
        <div class="contenedor_central__contenido">
            <p class="titulo">Lista de documentos del semillero</p>
            <div class="buscador">
                <input class="buscador__input" type="text" placeholder="Buscar un documento por el título" id="buscar-documentos">
                <label class="buscador__label" for="buscar-documentos"><i class="fas fa-search buscador__icon"></i></label>
            </div>
            <div class="lista-documentos">
                <div class="contenedor-documento">
                    
                </div>
            </div>
        </div>
    </div>
    <script src="../../controlador/controladorDocumentosAprendices/controlador.js" type="module"></script>
</body>

</html>