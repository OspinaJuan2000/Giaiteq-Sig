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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.0/trix.min.css" integrity="sha512-5m1IeUDKtuFGvfgz32VVD0Jd/ySGX7xdLxhqemTmThxHdgqlgPdupWoSN8ThtUSLpAGBvA8DY2oO7jJCrGdxoA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.3/css/medium-editor.min.css" integrity="sha512-zYqhQjtcNMt8/h4RJallhYRev/et7+k/HDyry20li5fWSJYSExP9O07Ung28MUuXDneIFg0f2/U3HJZWsTNAiw==" crossorigin="anonymous" />
    <link rel="stylesheet" href="../css/estilo_general.css">
    <link rel="stylesheet" href="../css/inicio_instructores.css">
    <link rel="stylesheet" href="../css/evento_instructores.css">
    <link rel="icon" href="../imagenes/icono.png">
    <title>Eventos</title>
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
                <li><a href="#"><i class="fas fa-link"></i> LINKS</a></li>
                <li><a href="#"><i class="fas fa-project-diagram"></i> PROYECTOS</a></li>
                <li><a href="evento_instructores.php"><i class="far fa-calendar-alt"></i> EVENTOS</a></li>
                <li><a href="#"><i class="fas fa-chalkboard-teacher"></i> INSTRUCTORES</a></li>
                <li><a href="gestion_estudiantes.php"><i class="fas fa-user-graduate"></i> ESTUDIANTES</a></li>
                <li class="salir"><a href="../../modelo/modeloSesion/cierre-sesion.php"><i class="fas fa-sign-out-alt"></i> SALIR</a></li>
            </ul>
        </div>
        <div class="contenedor_central__contenido">
            <div class="contenedorPublicaciones">
                <form id="form-eventos" method="POST" enctype="multipart/form-data" >
                    <div class="contenedor-publicacion">
                        <div class="campos">
                            <label for="nombre">Nombre del evento</label>
                            <div class="editable"></div>
                            <input type="hidden" name="nombre" id="nombre">
                            <!-- <input type="text" placeholder="Nombre" id="nombre" name="nombre" autocomplete="off"> -->
                        </div>
                        <div class="campos">
                            <label for="descripcion">Descripción del evento</label>
                            <input type="hidden" id="descripcion" name="descripcion">
                            <trix-editor input="descripcion"></trix-editor>
                            <!-- <label for="descripcion">Descripción del evento</label>
                            <textarea id="descripcion" name="descripcion" placeholder="Descripción"></textarea> -->
                        </div>
                        <div class="campos">
                            <label for="lugar">Lugar del evento</label>
                            <div class="editableone"></div>
                            <input type="hidden" name="lugar" id="lugar">
                            <!-- <input type="text" placeholder="Lugar" id="lugar" name="lugar" autocomplete="off"> -->
                        </div>

                        <div class="campos campos-evento">
                            <div class="campos-evento__fecha-comienzo">
                                <p class="campos-evento__texto">Fecha comienzo del evento</p>
                                <input type="datetime-local" id="comienzo" name="comienzo">
                            </div>
                            <div class="campos-evento__finalizacion">
                                <p class="campos-evento__texto">Hora finalizacion del evento</p>
                                <input type="datetime-local" id="finalizacion" name="finalizacion">
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
            <input class="buscador__input" type="text" placeholder="Buscar un evento por el nombre" id="buscar-evento">
            <label class="buscador__label" for="buscar-evento"><i class="fas fa-search buscador__icon"></i></label>
        </div>
        <div class="lista-eventos">
            <div class="contenedor-evento">

            </div>
        </div>
    </div>
    <script src="../../vista/js/sweetalert2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.0/trix-core.min.js" integrity="sha512-6C0JJHOrwdlZ6YMongpJax0kXCfu23TIbEETNjBpoCHJVSw+2NL8eE/CQ0ZNdPbdzrJ/T0HgXhUbBtJl1jyEXQ==" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/medium-editor/5.23.3/js/medium-editor.js" integrity="sha512-aCPwYkaP9S5CeLKGxJDPs1soJuQd+Dza60RzTsXRDzexppY0U25fSyCuPlOo8HH9kIuVS6uSunEMI4OG96+4gg==" crossorigin="anonymous"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const editor = new MediumEditor('.editable', {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'orderList', 'unorderList', 'h2', 'h3'],
                    static: true,
                    sticky: true
                },
                placeholder: {
                    text: ''
                }
            })

            const editorone = new MediumEditor('.editableone', {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'orderList', 'unorderList', 'h2', 'h3'],
                    static: true,
                    sticky: true
                },
                placeholder: {
                    text: ''
                }
            })

            editor.subscribe('editableInput', function(eventObj, editable) {
                const content = editor.getContent();
                document.querySelector('#nombre').value = content;
            })

            editorone.subscribe('editableInput', function(eventObj, editable) {
                const content2 = editorone.getContent();
                document.querySelector('#lugar').value = content2;
            })
        });
    </script>
    <script src="../../controlador/controladorEventos/controlador.js" type="module"></script>
</body>

</html>