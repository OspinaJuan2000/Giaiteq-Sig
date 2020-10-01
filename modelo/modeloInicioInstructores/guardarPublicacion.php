<?php

  require_once("../conexion.php");

  $instancia_conexion = new Conexion();
  $conexion = $instancia_conexion->establecer_conexion();
  $imagenes_recibidas = 0;

  $texto_publicacion = $_POST['texto_publicacion'];
  $documento_usuario = "1007318038";
  $tipo_contenido = 1;
  $respuesta = "";
  $imagenes_permitidas = 0;
  $formatos_permitidos = array("image/jpeg", "image/png", "image/gif", "image/tiff");
  $peso_maximo_kb = 25600;

  if(empty($_FILES['archivos']['name'])){
    $respuesta_funcion = guardarDescripcion($conexion, $texto_publicacion, $documento_usuario, $tipo_contenido);

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

      $continuar = guardarDescripcion($conexion, $texto_publicacion, $documento_usuario, $tipo_contenido);
      $identificacion = obtenerId($conexion);

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
          guardarImagenes($conexion, $identificacion, $ruta);
        }
        $respuesta = "1";
      } else {
        $respuesta = "0";
      }

    } else {
      $respuesta = "2";
    }
  }

  function guardarDescripcion($conexion, $texto, $documento, $tipo){
    $consulta = "INSERT INTO tbl_contenido(descripcion, documento_usuario, id_tipo_contenido) VALUES(:descripcion, :documento_usuario, :id_tipo_contenido)";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(":descripcion", $texto);
    $sentencia->bindParam(":documento_usuario", $documento);
    $sentencia->bindParam(":id_tipo_contenido", $tipo);
    $sentencia->execute();
    if($sentencia->rowCount() > 0){
      return true;
    } else {
      return false;
    }
  }

  function obtenerId($conexion){
    $consulta_id = "SELECT id_contenido FROM tbl_contenido ORDER BY id_contenido DESC LIMIT 1";
    $sentencia_id = $conexion->prepare($consulta_id);
    $sentencia_id->execute();
    $id;
    while($resultado = $sentencia_id->fetch()){
      $id = $resultado['id_contenido'];
    }
    return $id;
  }

  function guardarImagenes($conexion, $id_contenido, $ruta_contenido){
    $consulta = "INSERT INTO tbl_rutas_contenido(id_contenido, ruta) VALUES(:id_contenido, :ruta)";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bindParam(":id_contenido", $id_contenido);
    $sentencia->bindParam(":ruta", $ruta_contenido);
    $sentencia->execute();
  }

  echo json_encode($respuesta);

?>
