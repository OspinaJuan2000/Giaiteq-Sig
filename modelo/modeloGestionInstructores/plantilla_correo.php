<?php

$plantilla = "<!DOCTYPE html>
<html lang='es'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Mensaje</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .contenedor-correo {
            max-width: 800px;
            width: 90%;
            margin: 0 auto;
            text-align: center;
            font-family: sans-serif;
        }

        .fondo {
            background: #e6e8eb;
            margin-top: 40px;
            padding: 20px 0;
            text-align: center;
            height: auto;
        }

        .titulo {
            font-size: 1.2em;
            position: relative;
            margin: 1rem 0;
            border: 1px solid transparent;
            border-radius: .25rem;
            color: black;
        }

        .img-fluid {
            max-width: 100%;
            height: auto;
        }

        .mensaje {
            width: 80%;
            font-size: 16px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            text-align: left;
            word-break: break-all;
        }

        .mensaje p {
            margin-bottom: 20px;
        }

        .texto {
            margin-top: 20px;
        }

        .boton {
            text-decoration: none;
            padding: 14px;
            background-color: #235E3D;
            display: block;
            border-radius: 3px;
            color: white !important;
            width: 50%;
            margin: 20px 0;
            font-size: 15px;
            text-align: center;
        }

        @media (max-width: 768px) {

            .contenedor-correo {
                width: 100%;
            }

            .boton {
                width: 60%;
            }
        }

        @media (max-width: 440px) {
            .boton {
                width: 75%;
            }
        }

        @media (max-width: 400px) {

            .boton {
                width: 98%;
            }
        }
    </style>
</head>

<body>
  <div class='contenedor-correo'>
    <div class='fondo'>
      <div class='titulo'>
        <h3>Bienvenido a GIAITEQ</h3>
      </div>
      <div class='mensaje'>
        <div class='texto'>
          <p>Cordial saludo,</p>
          <p>Por medio del presente mensaje se le informa que ha sido registrado en el semillero de investigación GIAITEQ.
          Su usuario es su número de identificación, recomendamos que restablesca su contraseña una vez ingrese al sitio</p>
        </div>
      </div>
    </div>
  </div>
</body>

</html>"

?>
