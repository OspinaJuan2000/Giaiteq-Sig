
import * as peticiones from './fetch.js';
import { mensajeCamposVacios } from '../controladorSesion/funciones.js';

const formEventos = document.querySelector('#form-eventos');

export function validarFormulario() {
    formEventos.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosEvento = new FormData(formEventos);

        if (datosEvento.get('nombre').trim() === '' || datosEvento.get('descripcion').trim() === '' || datosEvento.get('lugar').trim() === '' || datosEvento.get('fecha-comienzo').trim() === '' || datosEvento.get('hora-comienzo').trim() === '' || datosEvento.get('fecha-finalizacion').trim() === '' || datosEvento.get('hora-finalizacion').trim() === '') {
            mensajeCamposVacios('Todos los campos son obligatorios', 'campos-vaciosError', document.querySelector('.contenedor-publicacion'));
        } else {
            peticiones.peticionSubirEvento(datosEvento);
        }

    });
}