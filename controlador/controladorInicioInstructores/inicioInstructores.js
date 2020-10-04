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
          }
        })

      });
      document.getElementById('contenedor_central__publicaciones').innerHTML = plantilla;
    })
}
