<?php

  header("Content-Type: application/xls");
  header("Content-Disposition: attachment; filename= estudiantes.xls");

?>

<table>

  <tr>
    <th>Nombre</th>
    <th>Apellido</th>
    <th>Ficha</th>
    <th>Tipo de documento</th>
    <th>Documento</th>
    <th>Correo</th>
    <th>Fecha de Ingreso</th>
  </tr>

  <?php

    require_once('../conexion.php');

    $instancia_conexion = new Conexion();
    $conexion = $instancia_conexion->establecer_conexion();
    $consulta = "SELECT tbl_usuarios.primer_nombre,
    tbl_usuarios.segundo_nombre,
    tbl_usuarios.primer_apellido,
    tbl_usuarios.segundo_apellido,
    tbl_usuarios.numero_ficha,
    tbl_tipo_documentos.nombre_tipo_documento,
    tbl_usuarios.documento_usuario,
    tbl_usuarios.correo,
    tbl_usuarios.fecha_ingreso
    FROM tbl_usuarios
    INNER JOIN tbl_tipo_documentos ON (tbl_usuarios.id_tipo_documento = tbl_tipo_documentos.id_tipo_documento)
    WHERE id_estado = 3 AND id_perfil = 2";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->execute();
    while($resultado = $sentencia->fetch()){



  ?>

  <tr>
    <td><?php echo $resultado[0] . $resultado[1] ?></td>
    <td><?php echo $resultado[2] . $resultado[3] ?></td>
    <td><?php echo $resultado[4] ?></td>
    <td><?php echo $resultado[5] ?></td>
    <td><?php echo $resultado[6] ?></td>
    <td><?php echo $resultado[7] ?></td>
    <td><?php echo $resultado[8] ?></td>
  </tr>

  <?php } ?>

</table>
