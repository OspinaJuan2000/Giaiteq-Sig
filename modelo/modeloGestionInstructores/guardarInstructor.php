<?php

  require_once('../conexion.php');
  require_once('../../externo/sendEmail-PHP/enviar-email.php');
  require_once('./plantilla_correo.php');

  $primer_nombre = $_POST['primer_nombre'];
  $segundo_nombre = $_POST['segundo_nombre'];
  $primer_apellido = $_POST['primer_apellido'];
  $segundo_apellido = $_POST['segundo_apellido'];
  $tipo_documento = (int)$_POST['tipo_documento'];
  $documento = $_POST['numero_documento'];
  $correo = $_POST['correo'];
  $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT, ['cost' => 12]);
  $hoja_vida = $_POST['hoja_vida'];
  $fecha_registro = $_POST['fecha_registro'];
  $estado = 3;
  $perfil = 1;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();

  if(verificarIdentidad($conexion, $documento)){
    $consulta = "INSERT INTO tbl_usuarios(primer_nombre, segundo_nombre, primer_apellido,
      segundo_apellido, id_tipo_documento, documento_usuario, correo,
      clave, fecha_ingreso, id_estado, id_perfil, ruta_hoja_vida) VALUES (:primer_nombre, :segundo_nombre,
        :primer_apellido, :segundo_apellido, :id_tipo_documento, :documento_usuario,
        :correo, :clave, :fecha_ingreso, :id_estado, :id_perfil, :ruta_hoja_vida)";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':primer_nombre', $primer_nombre);
    $sentencia->bindParam(':segundo_nombre', $segundo_nombre);
    $sentencia->bindParam(':primer_apellido', $primer_apellido);
    $sentencia->bindParam(':segundo_apellido', $segundo_apellido);
    $sentencia->bindParam(':id_tipo_documento', $tipo_documento);
    $sentencia->bindParam(':documento_usuario', $documento);
    $sentencia->bindParam(':correo', $correo);
    $sentencia->bindParam(':clave', $clave);
    $sentencia->bindParam(':fecha_ingreso', $fecha_registro);
    $sentencia->bindParam(':id_estado', $estado);
    $sentencia->bindParam(':id_perfil', $perfil);
    $sentencia->bindParam(':ruta_hoja_vida', $hoja_vida);
    $sentencia->execute();

    if($sentencia->rowCount() > 0){
      echo json_encode("1");
      $array_usuario = [$correo];
      enviarEmailPHP("GIAITEQ-SIG", $array_usuario, "Registro en GIAITEQ", $plantilla);
    } else {
      echo json_encode("2");
    }

  } else {
    echo json_encode("0");
  }

  function verificarIdentidad($conexion, $numero_identificacion){
    $consulta_id = "SELECT id_estado FROM tbl_usuarios WHERE documento_usuario = :documento_usuario";
    $sentencia = $conexion->prepare($consulta_id);
    $sentencia->bindParam(':documento_usuario', $numero_identificacion);
    $sentencia->execute();
    $respuesta = $sentencia->fetchColumn();

    if($respuesta > 0){
      return false;
    } else {
      return true;
    }
  }

?>
