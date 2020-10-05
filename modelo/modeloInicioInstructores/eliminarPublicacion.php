<?php

  require_once('../conexion.php');

  $id_publicacion = $_POST['id_contenido'];

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();

  eliminarImagenes($conexion, $id_publicacion);

  function eliminarImagenes($conexion, $id_contenido){
    $consulta = "DELETE FROM tbl_rutas_contenido WHERE id_contenido = :id_contenido";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':id_contenido', $id_contenido);
    $sentencia->execute();

    eliminarContenido($conexion, $id_contenido);
  }

  function eliminarContenido($conexion, $id_contenido){
    $consulta = "DELETE FROM tbl_contenido WHERE id_contenido = :id_contenido";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':id_contenido', $id_contenido);
    $sentencia->execute();

    if($sentencia->rowCount() > 0){
      echo json_encode("La publicación ha sido eliminada");
    } else {
      echo json_encode("Ocurrió un error al eliminar");
    }
  }

?>
