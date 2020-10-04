<?php

class Conexion
{
    /*
        Método encargado de establecer la conexión con la base de datos MYSQL llamada giaiteq.
    */
    public function establecer_conexion()
    {
        $usuario = "root";
        $clave = "";
        $host = "localhost";
        $bd = "giaiteq";
        $conexion = new PDO("mysql:host=$host;dbname=$bd;charset=utf8", $usuario, $clave);
        $conexion->exec("set names utf8");
        
        return $conexion;
    }
}
