document.addEventListener('DOMContentLoaded', listaFichas);

let formularioRegistro = document.getElementById('formularioRegistro');

function obtenerFecha() {
  let tiempo = new Date();
  let año = tiempo.getFullYear();
  let mes = tiempo.getMonth() + 1;
  let dia = tiempo.getDate();
  let fecha = año + "-" + mes + "-" + dia;
  return fecha;
}

const expresiones = {
	primerNombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  segundoNombre: /^[a-zA-ZÀ-ÿ\s]{0,40}$/,
  primerApellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  segundoApellido: /^[a-zA-ZÀ-ÿ\s]{0,40}$/,
  documento: /^\d{3,20}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	clave: /^.{4,40}$/
}

const campos = {
  primerNombre: false,
  segundoNombre: false,
  primerApellido: false,
  segundoApellido: false,
  documento: false,
  correo: false,
	clave: false
}

const validarFormulario = () => {
  let primerNombre = document.getElementById('primerNombre').value;
  let segundoNombre = document.getElementById('segundoNombre').value;
  let primerApellido = document.getElementById('primerApellido').value;
  let segundoApellido = document.getElementById('segundoApellido').value;
  let documento = document.getElementById('documento').value;
  let correo = document.getElementById('correo').value;
  let clave = document.getElementById('clave').value;

  if(expresiones.primerNombre.test(primerNombre)){
    campos['primerNombre'] = true;
  }

  if(expresiones.segundoNombre.test(segundoNombre)){
    campos['segundoNombre'] = true;
  }

  if(expresiones.primerApellido.test(primerApellido)){
    campos['primerApellido'] = true;
  }

  if(expresiones.segundoApellido.test(segundoApellido)){
    campos['segundoApellido'] = true;
  }

  if(expresiones.documento.test(documento)){
    campos['documento'] = true;
  }

  if(expresiones.correo.test(correo)){
    campos['correo'] = true;
  }

  if(expresiones.clave.test(clave)){
    campos['clave'] = true;
  }
}

formularioRegistro.addEventListener('submit', (e) => {
  e.preventDefault();
  validarFormulario();
  if(campos.primerNombre && campos.segundoNombre && campos.primerApellido && campos.segundoApellido && campos.documento && campos.correo && campos.clave){
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
        formularioRegistro.reset();
        campos.primerNombre = false;
        campos.segundoNombre = false;
        campos.primerApellido = false;
        campos.segundoApellido = false;
        campos.documento = false;
        campos.correo = false;
        campos.clave = false;
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'Ocurrió un error al enviar'
        })
      }
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Datos erroneos',
      text: 'Tiene campos sin llenar o los datos que ingresó no son correctos'
    })
  }
});

function listaFichas(){
  fetch('./modelo/modeloRegistroEstudiantes/listaFichas.php')
    .then(respuesta => respuesta.json())
    .then(informacion => {
      let plantilla = '';
      informacion.forEach((ficha) => {
        plantilla += `
        <option value="${ficha.numero_ficha}">${ficha.numero_ficha} - ${ficha.nombre_programa}</option>
        `
      });
      document.getElementById('ficha').innerHTML = plantilla;
    })
}
