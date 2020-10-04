import {eliminarListaEventos, mensajeSinEventos} from '../controladorEventos/funciones.js';
import * as funciones from './funciones.js';

/*
    Esta función hace una petición al backend (PHP), recibe todos los registros que hay en la tabla de eventos para mostrarlos en la vista en caso que si haya eventos publicados.
*/
export function peticionListarEventos() {

    fetch('../../modelo/modeloEventos/listar-eventos.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje == 'sin_eventos') {
                eliminarListaEventos();
                mensajeSinEventos('No se ha publicado ningún evento', 'sinRegistrosBD');
            } else {
                funciones.listarEventos(data);
            }
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los eventos que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarEventos(datosEvento) {

    fetch('../../modelo/modeloEventos/buscar-eventos.php', {
        method: 'POST',
        body: datosEvento
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'evento_noencontrado') {
                mensajeSinEventos('No se ha encontrado ningún evento con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.listarEventos(data);
            }
        }).catch(err => console.log(err));
}