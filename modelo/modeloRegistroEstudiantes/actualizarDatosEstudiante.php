<?php

  require_once('../conexion.php');

  $primer_nombre = $_POST['primerNombre'];
  $segundo_nombre = $_POST['segundoNombre'];
  $primer_apellido = $_POST['primerApellido'];
  $segundo_apellido = $_POST['segundoApellido'];
  $tipo_documento = (int)$_POST['tipoDocumento'];
  $numero_documento = $_POST['documento'];
  $numero_ficha = $_POST['ficha'];
  $correo = $_POST['correo'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_usuarios SET primer_nombre = :primer_nombre, segundo_nombre = :segundo_nombre,
  primer_apellido = :primer_apellido, segundo_apellido = :segundo_apellido,
  id_tipo_documento = :id_tipo_documento, numero_ficha = :numero_ficha, correo = :correo
  WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':primer_nombre', $primer_nombre);
  $sentencia->bindParam(':segundo_nombre', $segundo_nombre);
  $sentencia->bindParam(':primer_apellido', $primer_apellido);
  $sentencia->bindParam(':segundo_apellido', $segundo_apellido);
  $sentencia->bindParam(':id_tipo_documento', $tipo_documento);
  $sentencia->bindParam(':numero_ficha', $numero_ficha);
  $sentencia->bindParam(':correo', $correo);
  $sentencia->bindParam(':documento_usuario', $numero_documento);
  $sentencia->execute();

  if($sentencia->rowCount() > 0){
    echo "1";
  } else {
    echo "2";
  }

?>
