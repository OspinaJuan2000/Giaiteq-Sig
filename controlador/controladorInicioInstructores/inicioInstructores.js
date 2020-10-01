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

    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Vacío',
      text: 'Por favor escriba algo'
    })
  }
});
