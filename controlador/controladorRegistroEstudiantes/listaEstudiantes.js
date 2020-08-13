document.addEventListener('DOMContentLoaded', estudiantesActivos);
document.addEventListener('DOMContentLoaded', solicitudesIngreso);

function estudiantesActivos(){
  fetch('../../modelo/modeloRegistroEstudiantes/listaEstudiantesActivos.php')
    .then(respuesta => respuesta.json())
    .then(datos => {
      let plantilla = '';
      datos.forEach((dato) => {
        plantilla += `
        <div class="estudiante">
          <div>
            <p><b>Nombre: </b>${dato.primer_nombre} ${dato.segundo_nombre} ${dato.primer_apellido} ${dato.segundo_apellido}</p>
            <p><b>Ficha: </b>${dato.numero_ficha}</p>
            <p><b>Tipo de documento: </b>${dato.nombre_tipo_documento}</p>
            <p><b>Documento: </b>${dato.documento_usuario}</p>
            <p><b>Correo: </b>${dato.correo}</p>
            <p><b>Fecha de registro: </b>${dato.fecha_ingreso}</p>
          </div>
          <div class="estudiante__opciones">
            <i class="fas fa-edit editar" title="Editar"></i>
            <i class="fas fa-trash-alt eliminar" title="Eliminar"></i>
          </div>
        </div>
        `
      });
      document.getElementById('estudiantesActivos').innerHTML = plantilla;
    })
}

function solicitudesIngreso(){
  fetch('../../modelo/modeloRegistroEstudiantes/listaSolicitudesIngreso.php')
    .then(respuesta => respuesta.json())
    .then(datos => {
      let plantilla = '';
      datos.forEach((dato) => {
        plantilla += `
        <div class="estudiante">
          <div>
            <p><b>Nombre: </b>${dato.primer_nombre} ${dato.segundo_nombre} ${dato.primer_apellido} ${dato.segundo_apellido}</p>
            <p><b>Ficha: </b>${dato.numero_ficha}</p>
            <p><b>Tipo de documento: </b>${dato.nombre_tipo_documento}</p>
            <p><b>Documento: </b>${dato.documento_usuario}</p>
            <p><b>Correo: </b>${dato.correo}</p>
            <p><b>Fecha de registro: </b>${dato.fecha_ingreso}</p>
          </div>
          <div class="estudiante__opciones">
            <i class="fas fa-user-check aceptar" title="Aceptar"><input type="hidden" value="${dato.documento_usuario}"></i>
            <i class="fas fa-times rechazar" title="Rechazar"><input type="hidden" value="${dato.documento_usuario}"></i>
          </div>
        </div>
        `
      });
      document.getElementById('solicitudesIngreso').innerHTML = plantilla;
    })
}

setTimeout(function(){
  let aceptar = document.getElementsByClassName('aceptar');
  for(let i = 0; i < aceptar.length; i++) {
    aceptar[i].addEventListener("click", function() {
      let identificacion = this.firstChild.value;
      Swal.fire({
        title: '¿Desea aceptar este aprendiz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, aceptar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          let datos = new FormData();
          datos.append('identificacion', identificacion);
          fetch('../../modelo/modeloRegistroEstudiantes/aceptarEstudiante.php', {
            method: 'POST',
            body: datos
          })
            .then(respuesta => respuesta.json())
            .then(res => {
              Swal.fire(
                'Aceptado',
                res,
                'success'
              )
              solicitudesIngreso();
              estudiantesActivos();
            })
        }
      })
    })
  }
}, 100);

setTimeout(() => {
  let rechazar = document.getElementsByClassName('rechazar');

  for(let i = 0; i < rechazar.length; i++){
    rechazar[i].addEventListener('click', function(){
      let identificacion = this.firstChild.value;
      Swal.fire({
        title: '¿Desea rechazar este estudiante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D33',
        cancelButtonColor: '#28A745',
        confirmButtonText: 'Rechazar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          let dato = new FormData();
          dato.append('identificacion', identificacion);
          fetch('../../modelo/modeloRegistroEstudiantes/rechazarEstudiante.php', {
            method: 'POST',
            body: dato
          })
          .then(respuesta => respuesta.json())
          .then(res => {
            Swal.fire(
              'Rechazado',
              res,
              'success'
            )
            solicitudesIngreso();
            estudiantesActivos();
          })
        }
      })
    });
  }
}, 100);
