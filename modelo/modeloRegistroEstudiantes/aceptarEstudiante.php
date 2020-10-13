<?php

  require_once('../conexion.php');
  require_once('../../externo/sendEmail-PHP/enviar-email.php');
  require_once('./plantilla_correo.php');

  $identificacion = $_POST['identificacion'];
  $id_estado = 3;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_usuarios SET id_estado = :id_estado WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(":id_estado", $id_estado);
  $sentencia->bindParam(":documento_usuario", $identificacion);
  $sentencia->execute();

  $correo_usuario = obtenerCorreo($conexion, $identificacion);
  $array_usuario = [$correo_usuario];
  enviarEmailPHP("GIAITEQ-SIG", $array_usuario, "Respuesta a solicitud", $plantilla);

  function obtenerCorreo($conexion, $documento){
    $consulta = "SELECT correo FROM tbl_usuarios WHERE documento_usuario = :documento_usuario";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':documento_usuario', $documento);
    $sentencia->execute();
    $correo = $sentencia->fetchColumn();
    return $correo;
  }

  echo json_encode("El aprendiz fue aceptado");

?>
