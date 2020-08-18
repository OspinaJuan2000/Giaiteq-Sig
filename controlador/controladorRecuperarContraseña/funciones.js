const contenedorVentana = document.querySelector('.ventanaEmergente');
const botonRecuperarContra = document.querySelector('.recuperar-contra');
const contenedorInputs = document.querySelector('.contenedorInputs');
const formRecuperar = document.querySelector('.recuperar');

export function recuperarContra() {
    botonRecuperarContra.addEventListener('click', () => {

        contenedorInputs.style.display = 'none';
        formRecuperar.style.display = 'block';

        contenedorVentana.classList.add('width-ventana');
    });
}

export function eliminarFormRecuperar() {
    const botonEliminarForm = document.querySelector('.recuperar__enlace');

    botonEliminarForm.addEventListener('click', () => {
        formRecuperar.style.display = 'none';
        contenedorInputs.style.display = 'block';
        contenedorVentana.classList.remove('width-ventana');
    });
}