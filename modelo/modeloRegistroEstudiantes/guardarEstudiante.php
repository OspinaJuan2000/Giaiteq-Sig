<?php

  require_once('../conexion.php');

  $primer_nombre = $_POST['primerNombre'];
  $segundo_nombre = $_POST['segundoNombre'];
  $primer_apellido = $_POST['primerApellido'];
  $segundo_apellido = $_POST['segundoApellido'];
  $programa = $_POST['programa'];
  $ficha = $_POST['ficha'];
  $tipo_documento = (int)$_POST['tipoDocumento'];
  $documento = $_POST['documento'];
  $correo = $_POST['correo'];
  $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT, ['cost' => 12]);
  $fecha_registro = $_POST['fechaRegistro'];
  $estado = 1;
  $perfil = 2;

  if(strlen($primer_nombre) > 0 && strlen($primer_apellido) > 0 && strlen($programa) > 0
  && strlen($ficha) > 0 && strlen($documento) > 0 && strlen($correo) > 0 && strlen($clave) > 0){
    $instancia_conexion = new Conexion();
    $conexion = $instancia_conexion->establecer_conexion();
    $consulta = "INSERT INTO tbl_usuarios(primer_nombre, segundo_nombre, primer_apellido,
    segundo_apellido, numero_ficha, id_tipo_documento, documento_usuario, correo,
    clave, fecha_ingreso, id_estado, id_perfil) VALUES(:primer_nombre, :segundo_nombre,
      :primer_apellido, :segundo_apellido, :numero_ficha, :id_tipo_documento, :documento_usuario,
      :correo, :clave, :fecha_ingreso, :id_estado, :id_perfil)";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':primer_nombre', $primer_nombre);
    $sentencia->bindParam(':segundo_nombre', $segundo_nombre);
    $sentencia->bindParam(':primer_apellido', $primer_apellido);
    $sentencia->bindParam(':segundo_apellido', $segundo_apellido);
    $sentencia->bindParam(':numero_ficha', $ficha);
    $sentencia->bindParam(':id_tipo_documento', $tipo_documento);
    $sentencia->bindParam(':documento_usuario', $documento);
    $sentencia->bindParam(':correo', $correo);
    $sentencia->bindParam(':clave', $clave);
    $sentencia->bindParam(':fecha_ingreso', $fecha_registro);
    $sentencia->bindParam(':id_estado', $estado);
    $sentencia->bindParam(':id_perfil', $perfil);
    $respuesta = "";
    if(!$sentencia){
      $respuesta = "¡ERROR EN LA BASE DE DATOS!";
    } else {
      $sentencia->execute();
      $respuesta = "Solicitud enviada";
    }
  } else {
    $respuesta = "Llene todos los campos";
  }

  echo json_encode($respuesta);

?>
