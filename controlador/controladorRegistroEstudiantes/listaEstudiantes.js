//CÓDIGO QUE CARGA LAS LISTAS
document.addEventListener('DOMContentLoaded', estudiantesActivos);
document.addEventListener('DOMContentLoaded', solicitudesIngreso);
document.addEventListener('DOMContentLoaded', listaFichas);
document.addEventListener('DOMContentLoaded', listaEstudiantesInactivos);

//LISTA DE ESTUDIANTES ACTIVOS
function estudiantesActivos() {
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
            <i class="fas fa-edit editar_aprendiz" title="Editar"><input type="hidden" value="${dato.documento_usuario}"></i>
            <i class="fas fa-trash-alt eliminar_aprendiz" title="Eliminar"><input type="hidden" value="${dato.documento_usuario}"></i>
          </div>
        </div>
        `
      });
      document.getElementById('estudiantesActivos').innerHTML = plantilla;
      cargarDatosAprendiz();
      inactivarEstudiante();
    })
}

//LISTA DE SOLICITUDES DE INGRESO
function solicitudesIngreso() {
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
      aceptarEstudiante();
      rechazarEstudiante();
    })
}

//FUNCIÓN QUE PERMITE ACEPTAR QUE UN ESTUDIANTE SE UNA AL SEMILLERO
function aceptarEstudiante() {
  let aceptar = document.getElementsByClassName('aceptar');
  for (let i = 0; i < aceptar.length; i++) {
    aceptar[i].addEventListener("click", function () {
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
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res,
                showConfirmButton: false,
                timer: 1500
              })
              solicitudesIngreso();
              estudiantesActivos();
            })
        }
      })
    })
  }
}

//FUNCIÓN QUE PERMITE RECHAZAR LA SOLICITUD DE INGRESO DE UN ESTUDIANTE
function rechazarEstudiante() {
  let rechazar = document.getElementsByClassName('rechazar');

  for (let i = 0; i < rechazar.length; i++) {
    rechazar[i].addEventListener('click', function () {
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
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res,
                showConfirmButton: false,
                timer: 1500
              })
              solicitudesIngreso();
              estudiantesActivos();
            })
        }
      })
    });
  }
}

//CARGA LA LISTA DE FICHAS QUE HAY ACTUALMENTE EN EL SEMILLERO
function listaFichas() {
  fetch('../../modelo/modeloRegistroEstudiantes/listaFichas.php')
    .then(respuesta => respuesta.json())
    .then(informacion => {
      let plantilla = `
      <tr>
        <th>Ficha</th>
        <th>Programa</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>
      `;
      let plantillaFichas = '';
      informacion.forEach((ficha) => {
        plantilla += `
        <tr>
          <td>${ficha.numero_ficha}</td>
          <td>${ficha.nombre_programa}</td>
          <td><i class="fas fa-edit editar_ficha" title="Editar"><input type="hidden" value="${ficha.numero_ficha}"></i></td>
          <td><i class="fas fa-trash-alt eliminar_ficha" title="Eliminar"></i></td>
        </tr>
        `
        plantillaFichas += `
        <option value="${ficha.numero_ficha}">${ficha.numero_ficha} - ${ficha.nombre_programa}</option>
        `
      });
      document.getElementById('tablaFichas').innerHTML = plantilla;
      document.getElementById('actualizacion__ficha').innerHTML = plantillaFichas;
      cargarFicha();
    })
}

const expresionesFichas = {
  ficha: /^.{3,20}$/,
  nombrePrograma: /^[a-zA-ZÀ-ÿ\s]{2,40}$/
}

const camposFichas = {
  ficha: false,
  nombrePrograma: false
}

const validarFicha = () => {
  let ficha = document.getElementById('formularioFichas__ficha').value;
  let programa = document.getElementById('formularioFichas__programa').value;

  if(expresionesFichas.ficha.test(ficha)){
    camposFichas['ficha'] = true;
  }

  if(expresionesFichas.nombrePrograma.test(programa)){
    camposFichas['nombrePrograma'] = true;
  }
}

//ESTE CÓDIGO PERMITE GUARDAR UNA NUEVA FICHA
let formularioFichas = document.getElementById('formularioFichas');

formularioFichas.addEventListener('submit', (e) => {
  e.preventDefault();
  validarFicha();

  if(camposFichas.ficha && camposFichas.nombrePrograma){
    let accion = document.getElementById('accion').value;

    if(accion == 0){
      let informacion = new FormData(formularioFichas);
      fetch('../../modelo/modeloRegistroEstudiantes/guardarFicha.php', {
        method: 'POST',
        body: informacion
      })
      .then(respuesta => respuesta.json())
      .then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res,
          showConfirmButton: false,
          timer: 1500
        })
        formularioFichas.reset();
        listaFichas();
        camposFichas.ficha = false;
        camposFichas.nombrePrograma = false;
      })
    }

    if(accion == 1) {
      let informacion = new FormData(formularioFichas);
      fetch('../../modelo/modeloRegistroEstudiantes/actualizarFicha.php', {
        method: 'POST',
        body: informacion
      })
      .then(respuesta => respuesta.json())
      .then(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res,
          showConfirmButton: false,
          timer: 1500
        })
        formularioFichas.reset();
        listaFichas();
        camposFichas.ficha = false;
        camposFichas.nombrePrograma = false;
        document.getElementById('accion').value = 0;
      })
    }


  } else {
    Swal.fire({
      icon: 'error',
      title: 'Datos erroneos',
      text: 'Tiene campos sin llenar o los datos que ingresó no son correctos'
    })
  }
});

/*FUNCIÓN UTILIZADA CUANDO SE HACE CLICK EN EDITAR FICHA, CARGA LOS DATOS DE ESA
FICHA A LOS INPUTS DEL FORMULARIO*/
function cargarFicha(){
  let numero_ficha = document.getElementsByClassName('editar_ficha');

    for (let i = 0; i < numero_ficha.length; i++) {
      numero_ficha[i].addEventListener("click", function(){
        let numero = this.firstChild.value;

        let dato = new FormData();
        dato.append('numeroFicha', numero);

        fetch('../../modelo/modeloRegistroEstudiantes/informacionFicha.php', {
          method: 'POST',
          body: dato
        })
        .then(respuesta => respuesta.json())
        .then(res => {
          res.forEach((datos) => {
            document.getElementById('formularioFichas__ficha').value = datos.numero_ficha;
            document.getElementById('formularioFichas__programa').value = datos.nombre_programa;
            document.getElementById('accion').value = 1;
          });
        })
      });
    }
}

//ESTE CÓDIGO CARGA LOS DATOS DEL APRENDIZ SELECCIONADO PARA SU POSTERIOR ACTUALIZACIÓN
function cargarDatosAprendiz() {
  let abrirFormularioActualizacion = document.getElementsByClassName('editar_aprendiz');
  let contenedorFormularioActualizacion = document.getElementById('contenedorFormularioActualizacion');
  let ventanaFormularioActualizacion = document.getElementById('ventanaFormularioActualizacion');
  let cerrarFormularioActualizacion = document.getElementById('cerrarFormularioActualizacion');

  for (let i = 0; i < abrirFormularioActualizacion.length; i++) {
    abrirFormularioActualizacion[i].addEventListener("click", function () {
      contenedorFormularioActualizacion.classList.add('formularioVisible');
      ventanaFormularioActualizacion.classList.add('formularioVisible');
      let numero_documento = this.firstChild.value;

      let dato = new FormData();
      dato.append('documento', numero_documento);

      fetch('../../modelo/modeloRegistroEstudiantes/informacionEstudiante.php', {
        method: 'POST',
        body: dato
      })
        .then(respuesta => respuesta.json())
        .then(res => {
          res.forEach((datos) => {
            document.getElementById('actualizacion__primerNombre').value = datos.primer_nombre;
            document.getElementById('actualizacion__segundoNombre').value = datos.segundo_nombre;
            document.getElementById('actualizacion__primerApellido').value = datos.primer_apellido;
            document.getElementById('actualizacion__segundoApellido').value = datos.segundo_apellido;
            document.getElementById('actualizacion__tipoDocumento').value = datos.id_tipo_documento;
            document.getElementById('actualizacion__documento').value = numero_documento;
            document.getElementById('actualizacion__ficha').value = datos.numero_ficha;
            document.getElementById('actualizacion__correo').value = datos.correo;
          });
        })
    })
  }

  cerrarFormularioActualizacion.addEventListener('click', function () {
    contenedorFormularioActualizacion.classList.remove('formularioVisible');
    ventanaFormularioActualizacion.classList.remove('formularioVisible');
  });
}

//ESTE CÓDIGO ES PARA ACTUALIZAR LOS DATOS DEL ESTUDIANTE
const expresiones = {
  primerNombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  segundoNombre: /^[a-zA-ZÀ-ÿ\s]{0,40}$/,
  primerApellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  segundoApellido: /^[a-zA-ZÀ-ÿ\s]{0,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
  primerNombre: false,
  segundoNombre: false,
  primerApellido: false,
  segundoApellido: false,
  correo: false
}

function validarFormularioActualizacion() {
  let primerNombre = document.getElementById('actualizacion__primerNombre').value;
  let segundoNombre = document.getElementById('actualizacion__segundoNombre').value;
  let primerApellido = document.getElementById('actualizacion__primerApellido').value;
  let segundoApellido = document.getElementById('actualizacion__segundoApellido').value;
  let correo = document.getElementById('actualizacion__correo').value;

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

  if (expresiones.correo.test(correo)) {
    campos['correo'] = true;
  }
}

let formularioActualizacion = document.getElementById('formularioActualizacion');

formularioActualizacion.addEventListener('submit', (e) => {
  e.preventDefault();
  validarFormularioActualizacion();

  if (campos.primerNombre && campos.segundoNombre && campos.primerApellido && campos.segundoApellido && campos.correo) {
    let datos_estudiante = new FormData(formularioActualizacion);

    fetch('../../modelo/modeloRegistroEstudiantes/actualizarDatosEstudiante.php', {
      method: 'POST',
      body: datos_estudiante
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        if (res == "1") {
          Swal.fire({
            icon: 'success',
            title: 'Datos Actualizados',
            text: 'Los datos fueron actualizados'
          })

          campos.primerNombre = false;
          campos.segundoNombre = false;
          campos.primerApellido = false;
          campos.segundoApellido = false;
          campos.correo = false;

          contenedorFormularioActualizacion.classList.remove('formularioVisible');
          ventanaFormularioActualizacion.classList.remove('formularioVisible');

          estudiantesActivos();

        } else {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ocurrió un error al actualizar, intente más tarde'
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

/*ESTA FUNCIÓN ES PARA INACTIVAR ESTUDIANTES, SU ESTADO PASARÁ A SER INACTIVO
POR LO TANTO NO PODRÁN INGRESAR AL SITIO*/
function inactivarEstudiante() {
  let eliminar_aprendiz = document.getElementsByClassName('eliminar_aprendiz');

  for (let i = 0; i < eliminar_aprendiz.length; i++) {
    eliminar_aprendiz[i].addEventListener("click", function () {
      let identificacion = this.firstChild.value;

      Swal.fire({
        title: '¿Desea eliminar este estudiante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D33',
        cancelButtonColor: '#28A745',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          let dato = new FormData();
          dato.append('numero_documento', identificacion);
          fetch('../../modelo/modeloRegistroEstudiantes/inactivarEstudiante.php', {
            method: 'POST',
            body: dato
          })
            .then(respuesta => respuesta.json())
            .then(res => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: res,
                showConfirmButton: false,
                timer: 1500
              })
              estudiantesActivos();
              listaEstudiantesInactivos();
            })
        }
      })
    })
  }
}

//ESTA ES LA LISTA DE TODOS LOS ESTUDIANTES QUE HAN PERTENECIDO AL SEMILLERO
function listaEstudiantesInactivos() {
  fetch('../../modelo/modeloRegistroEstudiantes/listaEstudiantesInactivos.php')
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
        </div>
        `
      });
      document.getElementById('estudiantesInactivos').innerHTML = plantilla;
    })
}
