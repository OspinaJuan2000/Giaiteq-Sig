function obtenerFecha() {
  let tiempo = new Date();
  let año = tiempo.getFullYear();
  let mes = tiempo.getMonth() + 1;
  let dia = tiempo.getDate();
  let fecha = año + "-" + mes + "-" + dia;
  return fecha;
}

let formularioRegistro = document.getElementById('formularioRegistro');

formularioRegistro.addEventListener('submit', (e) => {
  e.preventDefault();
  let informacion = new FormData(formularioRegistro);
  informacion.append('fechaRegistro', obtenerFecha());

  fetch('./modelo/modeloRegistroEstudiantes/guardarEstudiante.php', {
    method: 'POST',
    body: informacion
  })
  .then(respuesta => respuesta.json())
  .then(datos => {
    if(datos == 'Solicitud enviada'){
      Swal.fire({
        icon: 'success',
        title: 'Solicitud Enviada',
        text: 'Sus datos serán revisados por un instructor, si es aceptado o rechazado, la respuesta llegará al correo proporcionado'
      })
    } else if(datos == 'Llene todos los campos'){
      Swal.fire({
        icon: 'error',
        title: 'Campos sin completar',
        text: 'Por favor complete todos los campos'
      })
    } else {
      console.log(datos);
    }
  })
});
