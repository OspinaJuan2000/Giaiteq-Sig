<?php

  require_once('../conexion.php');

  $numero_ficha = $_POST['numeroFicha'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "SELECT * FROM tbl_fichas WHERE numero_ficha = :numero_ficha";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':numero_ficha', $numero_ficha);
  $sentencia->execute();
  $datos = array();
  while ($resultado = $sentencia->fetch()) {
    $datos[] = array(
      'numero_ficha' => $resultado['numero_ficha'],
      'nombre_programa' => $resultado['nombre_programa']
    );
  }

  echo json_encode($datos);

?>
