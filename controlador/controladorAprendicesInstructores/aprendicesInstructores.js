//Carga la lista de instructores cuando la lista carga
document.addEventListener('DOMContentLoaded', listaInstructores);

//Función que carga y muestra la lista de instructores
function listaInstructores(){
  fetch('../../modelo/modeloGestionInstructores/listaInstructores.php')
    .then(respuesta => respuesta.json())
    .then(datos => {
      let plantilla = '';
      datos.forEach((dato) => {
        plantilla += `
          <div class="instructor__datos">
            <p><b>Nombre: </b>${dato.primer_nombre} ${dato.segundo_nombre} ${dato.primer_apellido} ${dato.segundo_apellido}</p>
            <p><b>Tipo de documento: </b>${dato.nombre_tipo_documento}</p>
            <p><b>Documento: </b>${dato.documento_usuario}</p>
            <p><b>Correo: </b>${dato.correo}</p>
            <p><b>Fecha de registro: </b>${dato.fecha_ingreso}</p>
          </div>
        `
      });
      document.getElementById('contenedor_central__contenido').innerHTML = plantilla;
    })
}
