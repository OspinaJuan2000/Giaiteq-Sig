<?php

  require_once('../conexion.php');

  $numero_ficha = $_POST['numeroFicha'];
  $nombre_programa = $_POST['nombrePrograma'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_fichas SET nombre_programa = :nombre_programa WHERE numero_ficha = :numero_ficha";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(':nombre_programa', $nombre_programa);
  $sentencia->bindParam(':numero_ficha', $numero_ficha);
  $sentencia->execute();

  if($sentencia->rowCount() > 0){
    echo json_encode('La ficha fue actualizada');
  } else {
    echo json_encode('Ocurrió un error al actualizar');
  }

?>
