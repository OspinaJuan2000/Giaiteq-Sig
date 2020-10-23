<?php

class Conexion
{
    /*
        Método encargado de establecer la conexión con la base de datos MYSQL llamada giaiteq.
    */
    public function establecer_conexion()
    {
        $usuario = "b9b0b286d7afd0";
        $clave = "4be836b3";
        $host = "us-cdbr-east-02.cleardb.com";
        $bd = "heroku_3a4f9a42dbee8cf";
        $conexion = new PDO("mysql:host=$host;dbname=$bd;charset=utf8", $usuario, $clave);
        $conexion->exec("set names utf8");
        
        return $conexion;
    }
}
