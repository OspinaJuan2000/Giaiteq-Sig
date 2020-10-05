document.addEventListener('DOMContentLoaded', listaPublicaciones);

let formulario_publicacion = document.getElementById('publicar__formulario');
let imagenes = document.querySelector("#imagenes");

const expresion_regular = {
  descripcion: /^.{1,1280}$/
}

const campo = {
  descripcion: false
}

const validar_campo = () => {
  let descripcion = document.getElementById('texto_publicacion').value;

  if(expresion_regular.descripcion.test(descripcion)){
    campo['descripcion'] = true;
  }
}

formulario_publicacion.addEventListener('submit', (e) => {
  e.preventDefault();
  validar_campo();
  if(campo.descripcion){

    let accion = document.getElementById('id_actualizacion').value;

    if(accion.length > 0){
      let contenido = new FormData(formulario_publicacion);

      contenido.append("id_contenido", accion);

      if(imagenes.files.length > 0){
        for(let archivo of imagenes.files){
          contenido.append("archivos[]", archivo);
        }
      }

      fetch('../../modelo/modeloInicioInstructores/actualizarDescripcion.php', {
        method: 'POST',
        body: contenido
      })
      .then(peticion => peticion.json())
      .then(res => {
        if(res == "1"){
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'La publicación ha sido actualizada'
          })
          formulario_publicacion.reset();
          campo['descripcion'] = false;
          document.getElementById('id_actualizacion').value = "";
          document.getElementById('boton_publicaciones').value = "Publicar";
        } else if(res == "0") {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ocurrió un error al intentar actualizar'
          })
          campo['descripcion'] = false;
          formulario_publicacion.reset();
          document.getElementById('id_actualizacion').value = "";
          document.getElementById('boton_publicaciones').value = "Publicar";
        } else if(res == "2"){
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Una de las imágenes no tiene el formato permitido o supera el peso máximo, verifique'
          })
          campo['descripcion'] = false;
          formulario_publicacion.reset();
          document.getElementById('id_actualizacion').value = "";
          document.getElementById('boton_publicaciones').value = "Publicar";
        }
        listaPublicaciones();
      })
    } else {

      let contenido = new FormData(formulario_publicacion);

      if(imagenes.files.length > 0){
        for(let archivo of imagenes.files){
          contenido.append("archivos[]", archivo);
        }
      }

      fetch('../../modelo/modeloInicioInstructores/guardarPublicacion.php', {
        method: 'POST',
        body: contenido
      })
      .then(respuestaPeticion => respuestaPeticion.json())
      .then(respuesta => {
        if(respuesta == "1"){
          Swal.fire({
            icon: 'success',
            title: 'Publicado',
            text: 'La información ha sido publicada'
          })
          formulario_publicacion.reset();
          campo['descripcion'] = false;
        } else if(respuesta == "0") {
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Ocurrió un error al intentar guardar'
          })
          campo['descripcion'] = false;
          formulario_publicacion.reset();
        } else if(respuesta == "2"){
          Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: 'Una de las imágenes no tiene el formato permitido o supera el peso máximo, verifique'
          })
          campo['descripcion'] = false;
          formulario_publicacion.reset();
        }
        listaPublicaciones();
      })
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Vacío',
      text: 'Por favor escriba algo'
    })
  }
});

function listaPublicaciones(){
  fetch('../../modelo/modeloInicioInstructores/listaPublicaciones.php')
    .then(respuesta => respuesta.json())
    .then(publicaciones => {
      let plantilla = '';
      let plantilla_imagenes = '';
      publicaciones.forEach((publicacion) => {
        plantilla += `
          <div class="publicacion">
            <p>${publicacion.descripcion}</p>
            <div class="contenedor_imagenes" id="${publicacion.id_contenido}"></div>
            <div class="opciones_publicacion">
              <i class="fas fa-edit editar_publicacion" title="Editar"><input type="hidden" value="${publicacion.id_contenido}"></i>
              <i class="fas fa-trash-alt eliminar_publicacion" title="Eliminar"><input type="hidden" value="${publicacion.id_contenido}"></i>
            </div>
          </div>
        `

        let dato = new FormData();
        dato.append("id_publicacion", publicacion.id_contenido);

        fetch('../../modelo/modeloInicioInstructores/listaImagenes.php', {
          method: 'POST',
          body: dato
        })
        .then(respuesta_peticion => respuesta_peticion.json())
        .then(imagen => {

          if(imagen.length > 0){
            imagen.forEach((ruta_imagenes) => {
              plantilla_imagenes += `
                <img src="../../modelo/modeloInicioInstructores/${ruta_imagenes.ruta}" alt="imagen">
              `
            });
            document.getElementById(publicacion.id_contenido).innerHTML = plantilla_imagenes;
            plantilla_imagenes = '';
          }
        })

      });
      document.getElementById('contenedor_central__publicaciones').innerHTML = plantilla;
      eliminarPublicacion();
      cargarDescripcion();
    })
}

function eliminarPublicacion(){
  let eliminar_publicacion = document.getElementsByClassName('eliminar_publicacion');
  for (let i = 0; i < eliminar_publicacion.length; i++) {
    eliminar_publicacion[i].addEventListener("click", function () {
      let id_publicacion = this.firstChild.value;
      Swal.fire({
        title: '¿Desea eliminar esta publicación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#D33',
        cancelButtonColor: '#28A745',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          let dato = new FormData();
          dato.append('id_contenido', id_publicacion);
          fetch('../../modelo/modeloInicioInstructores/eliminarPublicacion.php', {
            method: 'POST',
            body: dato
          })
          .then(respuesta_peticion => respuesta_peticion.json())
          .then(respuesta => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: respuesta,
              showConfirmButton: false,
              timer: 1500
            })
            listaPublicaciones();
          })
        }
      })
    })
  }
}

function cargarDescripcion(){
  let editar_publicacion = document.getElementsByClassName('editar_publicacion');
  for (let i = 0; i < editar_publicacion.length; i++) {
    editar_publicacion[i].addEventListener("click", function () {
      let id_publicacion = this.firstChild.value;
      let dato = new FormData();
      dato.append('id_contenido', id_publicacion);
      fetch('../../modelo/modeloInicioInstructores/cargarDescripcion.php', {
        method: 'POST',
        body: dato
      })
      .then(peticion => peticion.json())
      .then(respuesta => {
        document.getElementById('id_actualizacion').value = respuesta.id_contenido;
        document.getElementById('texto_publicacion').value = respuesta.descripcion;
        document.getElementById('boton_publicaciones').value = "Actualizar";
        listaPublicaciones();
      })
    })
  }
}
