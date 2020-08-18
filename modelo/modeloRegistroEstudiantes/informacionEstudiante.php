<?php

  require_once('../conexion.php');

  $numero_documento = $_POST['documento'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT tbl_usuarios.primer_nombre, tbl_usuarios.segundo_nombre,
  tbl_usuarios.primer_apellido, tbl_usuarios.segundo_apellido, tbl_usuarios.id_tipo_documento,
  tbl_tipo_documentos.nombre_tipo_documento, tbl_usuarios.numero_ficha, tbl_fichas.nombre_programa,
  tbl_usuarios.correo
  FROM tbl_usuarios
  INNER JOIN tbl_tipo_documentos ON (tbl_usuarios.id_tipo_documento = tbl_tipo_documentos.id_tipo_documento)
  INNER JOIN tbl_fichas ON (tbl_usuarios.numero_ficha = tbl_fichas.numero_ficha)
  WHERE documento_usuario = :documento_usuario";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':documento_usuario', $numero_documento);
  $sentencia->execute();

  $informacion = array();
  while($resultado = $sentencia->fetch()) {
    $informacion[] = array(
      'primer_nombre' => $resultado['primer_nombre'],
      'segundo_nombre' => $resultado['segundo_nombre'],
      'primer_apellido' => $resultado['primer_apellido'],
      'segundo_apellido' => $resultado['segundo_apellido'],
      'id_tipo_documento' => $resultado['id_tipo_documento'],
      'nombre_tipo_documento' => $resultado['nombre_tipo_documento'],
      'numero_ficha' => $resultado['numero_ficha'],
      'nombre_programa' => $resultado['nombre_programa'],
      'correo' => $resultado['correo']
    );
  }

  echo json_encode($informacion);

?>
