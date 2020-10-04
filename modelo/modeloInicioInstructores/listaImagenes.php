<?php

  require_once('../conexion.php');

  $id_publicacion = $_POST['id_publicacion'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT * FROM tbl_rutas_contenido WHERE id_contenido = :id_contenido";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(":id_contenido", $id_publicacion);
  $sentencia->execute();
  $imagenes = array();
  while ($resultado = $sentencia->fetch()) {
    $imagenes[] = array(
      'id_contenido' => $resultado['id_contenido'],
      'ruta' => $resultado['ruta']
    );
  }

  echo json_encode($imagenes);

?>
