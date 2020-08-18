<?php

  require_once('../conexion.php');

  $numero_documento = $_POST['numero_documento'];
  $estado = 4;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_usuarios SET id_estado = :id_estado WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':id_estado', $estado);
  $sentencia->bindParam(':documento_usuario', $numero_documento);
  $sentencia->execute();

  if($sentencia->rowCount() > 0){
    echo json_encode("El estudiante fue eliminado");
  }

?>
