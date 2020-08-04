<?php

include_once './sesiones.php';
$cerrarSesion = new Sesiones();
$cerrarSesion->cerrarSesion();

header('Location: ../../index.php');
