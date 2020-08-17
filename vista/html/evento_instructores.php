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
    <link rel="stylesheet" href="../css/evento_instructores.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="icon" href="../imagenes/icono.png">
    <title>Eventos</title>
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
                <li><a href="evento_instructores.php"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
                <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
                <li><a href="#"><i class="fas fa-user-graduate"></i> ESTUDIANTES</a></li>
                <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
            </ul>
        </div>
        <div class="contenedor_central__contenido">
            <div class="contenedorPublicaciones">
                <form id="form-eventos" enctype="multipart/form-data">
                    <div class="contenedor-publicacion">
                        <div class="campos">
                            <label for="titulo">Nombre del evento</label>
                            <input type="text" placeholder="Nombre" id="nombre" name="nombre" autocomplete="off">
                        </div>
                        <div class="campos">
                            <label for="descripcion">Descripción del evento</label>
                            <textarea id="descripcion" name="descripcion" placeholder="Descripción"></textarea>
                        </div>
                        <div class="campos">
                            <label for="lugar">Lugar de realización</label>
                            <input type="text" placeholder="Lugar" id="lugar" name="lugar" autocomplete="off">
                        </div>
                        <div class="campos campos-evento">
                            <div class="campos-evento__comienzo-evento">
                                <span class="campos-evento__fecha-comienzo">
                                    <p class="campos-evento__texto">Fecha comienzo del evento</p>
                                    <input type="date" id="fecha-comienzo" name="fecha-comienzo">
                                </span>
                                <span class="campos-evento__hora-comienzo">
                                    <p class="campos-evento__texto">Hora comienzo del evento</p>
                                    <input type="time" id="hora-comienzo" name="hora-comienzo">
                                </span>
                            </div>
                            <div class="campos-evento__finalizacion-evento">
                                <span class="campos-evento__fecha-finalizacion">
                                    <p class="campos-evento__texto">Fecha finalizacion del evento</p>
                                    <input type="date" id="fecha-finalizacion" name="fecha-finalizacion">
                                </span>
                                <span class="campos-evento__hora-finalizacion">
                                    <p class="campos-evento__texto">Hora finalizacion del evento</p>
                                    <input type="time" id="hora-finalizacion" name="hora-finalizacion">
                                </span>
                            </div>
                        </div>
                        <div class="publicar">
                            <button>Publicar</button>
                            <input type="hidden" id="idEvento">
                        </div>
                </form>
            </div>
        </div>
        <div class="buscador">
            <input class="buscador__input" type="text" placeholder="Buscar un evento" id="buscar-evento">
            <label class="buscador__label" for="buscar-evento"><i class="fas fa-search buscador__icon"></i></label>
        </div>
        <div class="lista-eventos">
            <div class="contenedor-evento">
                
            </div>
        </div>
    </div>
    <script src="../../vista/js/sweetalert2.js"></script>
    <script src="../../controlador/controladorEventos/controlador.js" type="module"></script>
</body>

</html>