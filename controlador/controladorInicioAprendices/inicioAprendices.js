document.addEventListener('DOMContentLoaded', listaPublicaciones);

//Función que carga la lista de publicaciones
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
        //Se hace la patición para obtener las imágenes relacionadas con esta publicación
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
      document.getElementById('contenedor_central__contenido').innerHTML = plantilla;
    })
}
