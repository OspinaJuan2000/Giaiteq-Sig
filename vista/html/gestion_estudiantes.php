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
    <link rel="stylesheet" href="../css/gestion_estudiantes.css">
    <link rel="stylesheet" href="../js/jquery-ui/jquery-ui.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <script src="../js/jquery-3.5.1.js"></script>
    <script src="../js/jquery-ui/jquery-ui.min.js"></script>
    <title>Estudiantes</title>
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
          <li><a href="video_instructores.php"><i class="far fa-file-video"></i> VIDEOS</a></li>
          <li><a href="#"><i class="fas fa-link"></i> LINKS</a></li>
          <li><a href="#"><i class="fas fa-project-diagram"></i> PROYECTOS</a></li>
          <li><a href="#"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
          <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
          <li><a href="#"><i class="fas fa-user-graduate"></i> ESTUDIANTES</a></li>
          <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
        </ul>
      </div>
      <div class="contenedor_central__contenido">
        <div id="tab" class="tab">
          <ul>
            <li><a href="#estudiantesActivos">Estudiantes Activos</a></li>
            <li><a href="#solicitudesIngreso">Solicitudes de Ingreso</a></li>
            <li><a href="#estudiantesInactivos">Estudiantes Inactivos</a></li>
            <li><a href="#fichas">Fichas</a></li>
          </ul>
          <div id="estudiantesActivos" class="estudiantesActivos">

          </div>

          <div id="solicitudesIngreso" class="solicitudesIngreso">

          </div>

          <div id="estudiantesInactivos" class="estudiantesInactivos">
            <p>estudiantesInactivos</p>
          </div>

          <div id="fichas">
            <p>fichas</p>
          </div>
        </div>
      </div>
    </div>
    <script src="../js/sweetalert2.js"></script>
    <script src="../js/gestion_estudiantes.js"></script>
    <script src="../../controlador/controladorRegistroEstudiantes/listaEstudiantes.js"></script>
  </body>
</html>