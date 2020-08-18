let abrirFormularioIngreso = document.getElementById('boton1');
let contenedorVentana = document.getElementById('contenedorVentana');
let ventanaEmergente = document.getElementById('ventanaEmergente');
let cerrarVentana = document.getElementById('cerrarVentana');

let abrirFormularioRegistro = document.getElementById('boton2');
let contenedorFormularioRegistro = document.getElementById('contenedorFormularioRegistro');
let ventanaFormularioRegistro = document.getElementById('ventanaFormularioRegistro');
let cerrarFormularioRegistro = document.getElementById('cerrarFormularioRegistro');

abrirFormularioIngreso.addEventListener('click', function () {
    contenedorVentana.classList.add('visible');
    ventanaEmergente.classList.add('visible');
});

cerrarVentana.addEventListener('click', function () {
    contenedorVentana.classList.remove('visible');
    ventanaEmergente.classList.remove('visible');
    document.querySelector('.recuperar').style.display = 'none';
    document.querySelector('.contenedorInputs').style.display = 'block';
});

abrirFormularioRegistro.addEventListener('click', function () {
    contenedorFormularioRegistro.classList.add('formularioVisible');
    ventanaFormularioRegistro.classList.add('formularioVisible');
});

cerrarFormularioRegistro.addEventListener('click', function () {
    contenedorFormularioRegistro.classList.remove('formularioVisible');
    ventanaFormularioRegistro.classList.remove('formularioVisible');
});
