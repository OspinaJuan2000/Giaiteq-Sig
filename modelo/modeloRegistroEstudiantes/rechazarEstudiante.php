<?php

  require_once('../conexion.php');
  require_once('../../externo/sendEmail-PHP/enviar-email.php');
  require_once('./plantilla_rechazar_estudiante.php');

  $identificacion = $_POST['identificacion'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();

  $correo_usuario = obtenerCorreo($conexion, $identificacion);
  $array_usuario = [$correo_usuario];
  enviarEmailPHP("GIAITEQ-SIG", $array_usuario, "Respuesta a solicitud", $plantilla_rechazar);

  $consulta = "DELETE FROM tbl_usuarios WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':documento_usuario', $identificacion);
  $sentencia->execute();

  function obtenerCorreo($conexion, $documento){
    $consulta = "SELECT correo FROM tbl_usuarios WHERE documento_usuario = :documento_usuario";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':documento_usuario', $documento);
    $sentencia->execute();
    $correo = $sentencia->fetchColumn();
    return $correo;
  }

  echo json_encode("El estudiante fue rechazado");

?>
