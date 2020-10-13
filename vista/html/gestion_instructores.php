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
  <link rel="icon" href="../imagenes/icono.png">
  <link rel="stylesheet" href="../css/estilo_general.css">
  <link rel="stylesheet" href="../css/inicio_instructores.css">
  <link rel="stylesheet" href="../css/gestion_instructores.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
  <title>Instructores</title>
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
          <li><a href="#"><i class="far fa-file-archive"></i> DOCUMENTOS</a></li>
          <li><a href="video_instructores.php"><i class="far fa-file-video"></i> VIDEOS</a></li>
          <li><a href="#"><i class="fas fa-link"></i> LINKS</a></li>
          <li><a href="evento_instructores.php"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
          <li><a href="gestion_instructores.php"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
          <li><a href="gestion_estudiantes.php"><i class="fas fa-user-graduate"></i> ESTUDIANTES</a></li>
          <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
        </ul>
      </div>
      <div class="contenedor_central__contenido">
        <form class="formulario_instructores" id="formulario_instructores" method="POST">
          <input type="text" name="primer_nombre" id="primerNombre" placeholder="Primer Nombre">
          <input type="text" name="segundo_nombre" id="segundoNombre" placeholder="Segundo Nombre">
          <input type="text" name="primer_apellido" id="primerApellido" placeholder="Primer Apellido">
          <input type="text" name="segundo_apellido" id="segundoApellido" placeholder="Segundo Apellido">
          <select id="tipoDocumento" name="tipo_documento">
            <option value="1">Cédula de Ciudadanía</option>
            <option value="2">Tarjeta de Identidad</option>
            <option value="3">Registro Civil</option>
            <option value="4">Cédula de Extranjería</option>
            <option value="5">Pasaporte</option>
          </select>
          <input type="number" name="numero_documento" id="documento" placeholder="Número de documento">
          <input type="email" name="correo" id="correo" placeholder="Correo">
          <input type="password" name="clave" id="clave" placeholder="Contraseña">
          <input type="text" name="hoja_vida" id="hojaVida" placeholder="Link Hoja de Vida">
          <input type="submit" value="Registrar">
        </form>
        <div class="contenedor_instructores" id="contenedor_instructores">

        </div>
      </div>
    </div>
    <script src="../js/sweetalert2.js"></script>
    <script src="../../controlador/controladorInstructores/controladorGestionInstructores.js"></script>
  </body>
</html>
