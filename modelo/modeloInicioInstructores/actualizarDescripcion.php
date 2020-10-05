<?php

  require_once('../conexion.php');

  $descripcion = $_POST['texto_publicacion'];
  $id_contenido = $_POST['id_contenido'];
  $imagenes_recibidas = 0;
  $respuesta = "";
  $imagenes_permitidas = 0;
  $formatos_permitidos = array("image/jpeg", "image/png", "image/gif", "image/tiff");
  $peso_maximo_kb = 25600;

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();

  if(empty($_FILES['archivos']['name'])){
    $respuesta_funcion = actualizaDescripcion($conexion, $descripcion, $id_contenido);

    if($respuesta_funcion){
      $respuesta = "1";
    } else {
      $respuesta = "0";
    }

  } else {
    $imagenes_recibidas = count($_FILES['archivos']['name']);

    foreach ($_FILES['archivos']['tmp_name'] as $key => $value) {
      if(in_array($_FILES["archivos"]["type"][$key], $formatos_permitidos) && $_FILES["archivos"]["size"][$key] <= $peso_maximo_kb * 1024){
        $imagenes_permitidas++;
      }
    }

    if($imagenes_permitidas == $imagenes_recibidas){

      $continuar = actualizaDescripcion($conexion, $descripcion, $id_contenido);

      if($continuar){
        foreach ($_FILES['archivos']['tmp_name'] as $key => $value) {
          $tipo_imagen = basename($_FILES['archivos']['type'][$key]);
          $nombre_imagen = strtoupper(uniqid());
          $carpeta = "imagenes/";

          if(!file_exists($carpeta)){
            mkdir($carpeta);
          }

          $ruta = $carpeta . $nombre_imagen . '.' . $tipo_imagen;
          move_uploaded_file($value, $ruta);
          guardarImagenes($conexion, $id_contenido, $ruta);
        }
        $respuesta = "1";
      } else {
        $respuesta = "0";
      }

    } else {
      $respuesta = "2";
    }
  }

  function actualizaDescripcion($conexion, $texto_publicacion, $id_publicacion){
    $consulta = "UPDATE tbl_contenido SET descripcion = :descripcion WHERE id_contenido = :id_contenido";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(':descripcion', $texto_publicacion);
    $sentencia->bindParam(':id_contenido', $id_publicacion);
    $sentencia->execute();

    if($sentencia->rowCount() > 0){
      return true;
    } else {
      return false;
    }
  }

  function guardarImagenes($conexion, $id_contenido, $ruta){
    $consulta = "INSERT INTO tbl_rutas_contenido(id_contenido, ruta) VALUES(:id_contenido, :ruta)";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(":id_contenido", $id_contenido);
    $sentencia->bindParam(":ruta", $ruta);
    $sentencia->execute();
  }

  echo json_encode($respuesta);

?>
