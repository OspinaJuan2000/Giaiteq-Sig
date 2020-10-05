<?php
include_once '../../modelo/modeloSesion/sesiones.php';
$sesion = new Sesiones();
$sesion->accesoAprendiz();
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
            <?php echo $_SESSION['instructor']['nombre'] ?>
        </span>
      </div>
      <ul class="opciones__menu">
        <li><a href="inicio_instructores.php"><i class="far fa-lightbulb"></i> INICIO</a></li>
        <li><a href="documento_instructores.php"><i class="far fa-file-archive"></i> DOCUMENTOS</a></li>
        <li><a href="video_instructores.php"><i class="far fa-file-video"></i> VIDEOS</a></li>
        <li><a href="link_instructores.php"><i class="fas fa-link"></i> LINKS</a></li>
        <li><a href="evento_instructores.php"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
        <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
        <li><a href="gestion_estudiantes.php"><i class="fas fa-user-graduate"></i> ESTUDIANTES</a></li>
        <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
      </ul>
    </div>
    <div class="contenedor_central__contenido">
      <form class="publicar__formulario" id="publicar__formulario" method="POST">
        <textarea name="texto_publicacion" placeholder="Escribe algo..." id="texto_publicacion"></textarea>
        <div class="formulario__inputs">
          <input type="file" id="imagenes" accept="image/*" multiple>
          <input type="submit" value="Publicar">
        </div>
      </form>
      <div class="contenedor_central__publicaciones" id="contenedor_central__publicaciones">

      </div>
    </div>
  </div>
  <script src="../js/sweetalert2.js"></script>
  <script src="../../controlador/controladorInicioInstructores/inicioInstructores.js"></script>
</body>

</html>
