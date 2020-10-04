<?php

  require_once('../conexion.php');

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT id_contenido, descripcion, fecha_publicacion, documento_usuario FROM tbl_contenido WHERE id_tipo_contenido = 1 ORDER BY fecha_publicacion DESC";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->execute();
  $datos_publicaciones = array();
  while($resultado = $sentencia->fetch()){
    $datos_publicaciones[] = array(
      'id_contenido' => $resultado['id_contenido'],
      'descripcion' => $resultado['descripcion'],
      'fecha_publicacion' => $resultado['fecha_publicacion'],
      'documento_usuario' => $resultado['documento_usuario']
    );
  }

  echo json_encode($datos_publicaciones);

?>
