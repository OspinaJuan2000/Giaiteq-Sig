<?php

class Sesiones
{
    /*
        Cuando se instancie la clase Sesiones, usamos la función session_start() para poder trabajar con sesiones.ss
    */
    public function __construct()
    {
        session_start();
    }

    /*
        Cuando un usuario inicie sesión, de acuerdo a que perfil ingrese, se creará una sesión para ese usuario.
    */
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

    /*
        Verificar si existe la sesión del instructor, en caso que no exista, redigirir a la vista de inicio de aprendices.
    */
    public function verificarSesion()
    {
        if (isset($_SESSION['instructor'])) {
            header('Location: vista/html/inicio_instructores.php');
        } else if (isset($_SESSION['aprendiz'])) {
            header('Location: vista/html/inicio_aprendices.php');
        }
    }

    /*
        Verificar si existe la sección del aprendiz.
    */
    public function accesoAprendiz()
    {
        if (isset($_SESSION['aprendiz'])) {
            header('Location: inicio_aprendices.php');
        }
    }

    /*
        Verificar si no existe ninguna sesión, en caso de que no, se redirige al login.
    */
    public function accesoGeneral()
    {
        if ($_SESSION == null) {
            header('Location: ../../index.php');
        }
    }

    /*
        Cuando se presione en cerrar sesión.
    */
    public function cerrarSesion()
    {
        session_unset();
        session_destroy();
    }
}
