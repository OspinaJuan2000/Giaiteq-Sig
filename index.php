<?php include_once './modelo/modeloSesion/sesiones.php';
$sesion = new Sesiones();
$sesion->verificarSesion();
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./vista/css/index.css">
  <link rel="stylesheet" href="./vista/css/estilo_general.css">
  <link rel="icon" href="./vista/imagenes/icono.png">
  <title>GIAITEQ</title>
</head>

<body>
  <div class="barra_superior">
    <div class="barra_superior__logo">
      <img src="./vista/imagenes/logo_sena.png" alt="Logo del SENA" class="logo_sena">
    </div>
    <div class="barra_superior__nombre">
      <p>GRUPO DE INVESTIGACIÓN APLICADA A LA PRODUCCIÓN INDUSTRIAL, TEXTIL Y QUÍMICA</p>
    </div>
  </div>

  <div class="contenedor_central">
    <div class="contenedor_central__opciones">
      <button class="opciones__iniciar" id="boton1">Iniciar Sesión</button>
      <button class="opciones__registrarse" id="boton2">Registrarse</button>
    </div>
    <div class="contenedor_central__contenido">

    </div>
  </div>

  <div class="contenedorVentana" id="contenedorVentana">
    <div class="ventanaEmergente" id="ventanaEmergente">
      <a href="#" id="cerrarVentana" class="cerrarVentana">X</a>
      <h3>INICIAR SESIÓN</h3>
      <form class="contenedorInputs" id="form-inicio" method="POST">
        <input type="number" placeholder="Usuario" id="usuario" name="usuario">
        <input type="password" placeholder="Contraseña" id="contra" name="contra">
        <input type="submit" class="botonEnviar" value="Ingresar">
        <p>O</p>
        <a href="#" class="recuperar">Recuperar Contraseña</a>
      </form>
    </div>
  </div>

  <div class="contenedorFormularioRegistro" id="contenedorFormularioRegistro">
    <div class="ventanaFormularioRegistro" id="ventanaFormularioRegistro">
      <a href="#" id="cerrarFormularioRegistro" class="cerrarFormularioRegistro">X</a>
      <h3>REGISTRARSE</h3>
      <form class="formularioRegistro" id="formularioRegistro" method="POST">
        <input type="text" id="primerNombre" name="primerNombre" placeholder="Primer Nombre">
        <input type="text" id="segundoNombre" name="segundoNombre" placeholder="Segundo Nombre">
        <input type="text" id="primerApellido" name="primerApellido" placeholder="Primer Apellido">
        <input type="text" id="segundoApellido" name="segundoApellido" placeholder="Segundo Apellido">
        <select id="tipoDocumento" name="tipoDocumento">
          <option value="1">Cédula de Ciudadanía</option>
          <option value="2">Tarjeta de Identidad</option>
          <option value="3">Registro Civil</option>
          <option value="4">Cédula de Extranjería</option>
          <option value="5">Pasaporte</option>
        </select>
        <input type="number" id="documento" name="documento" placeholder="Identificación">
        <select id="ficha" name="ficha">
          
        </select>
        <input type="email" id="correo" name="correo" placeholder="Correo">
        <input type="password" id="clave" name="clave" placeholder="Contraseña">
        <input type="submit" class="botonEnviar" value="Enviar">
      </form>
    </div>
  </div>
  <script type="text/javascript" src="./vista/js/index.js"></script>
  <script src="vista/js/sweetalert2.js"></script>
  <script src="controlador/controladorSesion/controlador.js" type="module"></script>
  <script src="./controlador/controladorRegistroEstudiantes/guardarEstudiante.js"></script>
</body>

</html>
