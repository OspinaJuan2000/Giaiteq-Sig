import {eliminarListaDocumentos, mensajeSinDocumentos} from '../controladorDocumentos/funciones.js';
import * as funciones from './funciones.js';

/*
    Esta función hace una petición al backend (PHP), recibe todos los documentos que hay en la base de datos y los renderiza en el HTML si hay.
*/
export function peticionListarDocumentos() {
    fetch('../../modelo/modeloDocumentos/listar-documentos.php')
        .then(response => response.json())
        .then(data => {
            const { mensaje } = data;
            if (mensaje === 'sin_documentos') {
                eliminarListaDocumentos();
                mensajeSinDocumentos('No se ha subido ningún documento', 'sinRegistrosBD');
            } else {
                funciones.renderizarListaDocumentos(data);
            }
        })
        .catch(err => console.log(err));
}

/*
    Esta función hace una petición al backend (PHP), recibe lo que se ingrese en el campo de buscar y de acuerdo a eso, va a listar los documentos que coincidan con el criterio de búsqueda.
*/
export function peticionBuscarDocumentos(datosDocumento) {
    fetch('../../modelo/modeloDocumentos/buscar-documentos.php', {
        method: 'POST',
        body: datosDocumento
    }).then(response => response.json())
        .then(data => {
            const { mensaje } = data;

            if (mensaje === 'documento_noencontrado') {
                mensajeSinDocumentos('No se ha encontrado ningún documento con el título ingresado', 'sinFiltrosBD');
            } else {
                funciones.renderizarListaDocumentos(data);
            }
        }).catch(err => console.log(err));
}