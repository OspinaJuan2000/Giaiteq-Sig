<?php

  require_once('../conexion.php');

  $identificacion = $_POST['identificacion'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "DELETE FROM tbl_usuarios WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':documento_usuario', $identificacion);
  $sentencia->execute();

  echo json_encode("El estudiante fue rechazado");

?>
