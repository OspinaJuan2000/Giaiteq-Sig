document.addEventListener('DOMContentLoaded', listaInstructores);

let formulario_instructores = document.getElementById('formulario_instructores');

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
  clave: /^.{4,40}$/,
  ruta_hoja_vida: /^.{1,160}$/
}

const campos = {
  primerNombre: false,
  segundoNombre: false,
  primerApellido: false,
  segundoApellido: false,
  documento: false,
  correo: false,
  clave: false,
  ruta_hoja_vida: false
}

const validarFormulario = () => {
  let primerNombre = document.getElementById('primerNombre').value;
  let segundoNombre = document.getElementById('segundoNombre').value;
  let primerApellido = document.getElementById('primerApellido').value;
  let segundoApellido = document.getElementById('segundoApellido').value;
  let documento = document.getElementById('documento').value;
  let correo = document.getElementById('correo').value;
  let clave = document.getElementById('clave').value;
  let ruta_hoja_vida = document.getElementById('hojaVida').value;

  if (expresiones.primerNombre.test(primerNombre)) {
    campos['primerNombre'] = true;
  }

  if (expresiones.segundoNombre.test(segundoNombre)) {
    campos['segundoNombre'] = true;
  }

  if (expresiones.primerApellido.test(primerApellido)) {
    campos['primerApellido'] = true;
  }

  if (expresiones.segundoApellido.test(segundoApellido)) {
    campos['segundoApellido'] = true;
  }

  if (expresiones.documento.test(documento)) {
    campos['documento'] = true;
  }

  if (expresiones.correo.test(correo)) {
    campos['correo'] = true;
  }

  if (expresiones.clave.test(clave)) {
    campos['clave'] = true;
  }

  if (expresiones.ruta_hoja_vida.test(ruta_hoja_vida)) {
    campos['ruta_hoja_vida'] = true;
  }
}

formulario_instructores.addEventListener('submit', (e) => {
  e.preventDefault();
  validarFormulario();
  if (campos.primerNombre && campos.segundoNombre && campos.primerApellido && campos.segundoApellido && campos.documento && campos.correo && campos.clave && campos.ruta_hoja_vida) {
    let informacion = new FormData(formulario_instructores);
    informacion.append('fecha_registro', obtenerFecha());

    fetch('../../modelo/modeloGestionInstructores/guardarInstructor.php', {
      method: 'POST',
      body: informacion
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
      if (datos == '1') {
        Swal.fire({
          icon: 'success',
          title: 'Instructor Registrado',
          text: 'El instructor ha sido registrado, será notificado por el correo que proporcionó'
        })
        formulario_instructores.reset();
        campos.primerNombre = false;
        campos.segundoNombre = false;
        campos.primerApellido = false;
        campos.segundoApellido = false;
        campos.documento = false;
        campos.correo = false;
        campos.clave = false;
        campos.ruta_hoja_vida = false;
        listaInstructores();
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: datos
        })
        formulario_instructores.reset();
        campos.primerNombre = false;
        campos.segundoNombre = false;
        campos.primerApellido = false;
        campos.segundoApellido = false;
        campos.documento = false;
        campos.correo = false;
        campos.clave = false;
        campos.ruta_hoja_vida = false;
      }
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Datos erroneos',
      text: 'Tiene campos sin llenar o los datos que ingresó no son correctos'
    })
  }
})

function listaInstructores(){
  fetch('../../modelo/modeloGestionInstructores/listaInstructores.php')
    .then(respuesta => respuesta.json())
    .then(datos => {
      let plantilla = '';
      datos.forEach((dato) => {
        plantilla += `
        <div class="instructor">
          <div class="instructor__datos">
            <p><b>Nombre: </b>${dato.primer_nombre} ${dato.segundo_nombre} ${dato.primer_apellido} ${dato.segundo_apellido}</p>
            <p><b>Tipo de documento: </b>${dato.nombre_tipo_documento}</p>
            <p><b>Documento: </b>${dato.documento_usuario}</p>
            <p><b>Correo: </b>${dato.correo}</p>
            <p><b>Fecha de registro: </b>${dato.fecha_ingreso}</p>
            </div>
          <div class="instructor__opciones">
            <i class="fas fa-edit editar_instructor" title="Editar"><input type="hidden" value="${dato.documento_usuario}"></i>
            <i class="fas fa-trash-alt eliminar_instructor" title="Eliminar"><input type="hidden" value="${dato.documento_usuario}"></i>
          </div>
        </div>
        `
      });
      document.getElementById('contenedor_instructores').innerHTML = plantilla;
    })
}
