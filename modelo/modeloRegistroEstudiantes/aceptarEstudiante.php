<?php

  require_once('../conexion.php');

  $identificacion = $_POST['identificacion'];
  $id_estado = 3;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_usuarios SET id_estado = :id_estado WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(":id_estado", $id_estado);
  $sentencia->bindParam(":documento_usuario", $identificacion);
  $sentencia->execute();

  echo json_encode("El aprendiz fue aceptado");

?>
