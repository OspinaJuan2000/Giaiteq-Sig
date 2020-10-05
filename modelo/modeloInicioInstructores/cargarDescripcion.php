<?php

  require_once('../conexion.php');

  $id_publicacion = $_POST['id_contenido'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT id_contenido, descripcion FROM tbl_contenido WHERE id_contenido = :id_contenido";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':id_contenido', $id_publicacion);
  $sentencia->execute();

  $descripcion = array();

  while ($resultado = $sentencia->fetch()) {
    $descripcion = array(
      'id_contenido' => $resultado['id_contenido'],
      'descripcion' => $resultado['descripcion']
    );
  }

  echo json_encode($descripcion);

?>
