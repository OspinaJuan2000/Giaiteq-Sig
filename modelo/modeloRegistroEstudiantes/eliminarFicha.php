<?php

  require_once('../conexion.php');

  $numero_ficha = $_POST['numeroFicha'];
  $valor = null;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $consulta = "UPDATE tbl_usuarios SET numero_ficha = :valor WHERE numero_ficha = :numero_ficha";
  $sentencia = $conexion->prepare($consulta);
  $sentencia->bindParam(":valor", $valor);
  $sentencia->bindParam(":numero_ficha", $numero_ficha);
  $sentencia->execute();
  eliminar($numero_ficha);

  $respuesta = eliminar($numero_ficha);

  function eliminar($num){
    $instancia_conexion2 = new Conexion();
    $conexion2 = $instancia_conexion2->establecer_conexion();
    $consulta_eliminar = "DELETE FROM tbl_fichas WHERE numero_ficha = :numero_ficha";
    $sentencia2 = $conexion2->prepare($consulta_eliminar);
    $sentencia2->bindParam(":numero_ficha", $num);
    $sentencia2->execute();
    $res = "Ficha Eliminada";
    return $res;
  }

  echo json_encode($respuesta);

?>
