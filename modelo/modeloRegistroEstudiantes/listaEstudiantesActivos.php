<?php

  require_once('../conexion.php');

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT tbl_usuarios.primer_nombre,
  tbl_usuarios.segundo_nombre,
  tbl_usuarios.primer_apellido,
  tbl_usuarios.segundo_apellido,
  tbl_usuarios.numero_ficha,
  tbl_tipo_documentos.nombre_tipo_documento,
  tbl_usuarios.documento_usuario,
  tbl_usuarios.correo,
  tbl_usuarios.fecha_ingreso
  FROM tbl_usuarios
  INNER JOIN tbl_tipo_documentos ON (tbl_usuarios.id_tipo_documento = tbl_tipo_documentos.id_tipo_documento)
  WHERE id_estado = 3 AND id_perfil = 2";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->execute();
  $datos = array();
  while($resultado = $sentencia->fetch()){
    $datos[] = array(
      'primer_nombre' => $resultado['primer_nombre'],
      'segundo_nombre' => $resultado['segundo_nombre'],
      'primer_apellido' => $resultado['primer_apellido'],
      'segundo_apellido' => $resultado['segundo_apellido'],
      'numero_ficha' => $resultado['numero_ficha'],
      'nombre_tipo_documento' => $resultado['nombre_tipo_documento'],
      'documento_usuario' => $resultado['documento_usuario'],
      'correo' => $resultado['correo'],
      'fecha_ingreso' => $resultado['fecha_ingreso']
    );
  }

  echo json_encode($datos);

?>
