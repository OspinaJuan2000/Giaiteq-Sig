<?php

  require_once('../conexion.php');

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT * FROM tbl_fichas ORDER BY nombre_programa ASC";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->execute();
  $informacion = array();
  while ($resultado = $sentencia->fetch()){
    $informacion[] = array(
      'numero_ficha' => $resultado['numero_ficha'],
      'nombre_programa' => $resultado['nombre_programa']
    );
  }

  echo json_encode($informacion);

?>
