<?php

class Sesiones
{
    public function __construct()
    {
        session_start();
    }

    public function crearSesion($datos)
    {
        $perfil = $datos['id_perfil'];

        if ($perfil === '1') {
            unset($_SESSION['aprendiz']);
            return $_SESSION['instructor'] = array(
                'login' => true,
                'documento' => $datos['documento_usuario'],
                'nombre' => $datos['primer_nombre'],
            );
        } else if ($perfil == '2') {
            unset($_SESSION['instructor']);
            return $_SESSION['aprendiz'] = array(
                'login' => true,
                'documento' => $datos['documento_usuario'],
                'nombre' => $datos['primer_nombre'],
            );
        }
    }

    public function verificarSesion()
    {
        if (isset($_SESSION['instructor'])) {
            header('Location: vista/html/inicio_instructores.php');
        } else if (isset($_SESSION['aprendiz'])) {
            header('Location: vista/html/inicio_aprendices.php');
        }
    }

    public function accesoAprendiz()
    {
        if (isset($_SESSION['aprendiz'])) {
            header('Location: inicio_aprendices.php');
        }
    }

    public function accesoGeneral()
    {
        if ($_SESSION == null) {
            header('Location: ../../index.php');
        }
    }

    public function cerrarSesion()
    {
        session_unset();
        session_destroy();
    }
}
