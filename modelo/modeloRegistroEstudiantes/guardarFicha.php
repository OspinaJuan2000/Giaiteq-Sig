<?php

  require_once('../conexion.php');

  $numero_ficha = $_POST['numeroFicha'];
  $nombre_programa = $_POST['nombrePrograma'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "INSERT INTO tbl_fichas(numero_ficha, nombre_programa) VALUES(:numero_ficha, :nombre_programa)";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':numero_ficha', $numero_ficha);
  $sentencia->bindParam('nombre_programa', $nombre_programa);
  $sentencia->execute();

  echo json_encode('La ficha fue guardada');

?>
