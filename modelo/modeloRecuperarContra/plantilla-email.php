<?php
$mensaje = "
    <!DOCTYPE html>
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
                height: 30rem;
            }
    
            .titulo {
                font-size: 1.2em;
                position: relative;
                padding: .75rem 1.25rem;
                margin: 2rem 0;
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
        </style>
    </head>
    
    <body>
        <div class='contenedor-correo'>
            <div class='fondo'>
                <div class='titulo'>
                    <h3>Instrucciones para restablecer la contraseña</h3>
                </div>
                <div class='mensaje'>
                    <div class='texto'>
                        <p>Hola {$primerNombreUsuario},</p>
                        <p>Presiona el botón para restablecer tu contraseña de GIAITEQ-SIG</p>
                        <a class='boton' href='http://giaiteq-semillero.test/vista/html/recuperar_contra.php?code=${tokenClave}'>Restablecer
                            contraseña</a>
                        <p>Si el botón no funciona copie el siguiente enlace en su navegador</p>
                        <a href='http://giaiteq-semillero.test/vista/html/recuperar_contra.php?code=${tokenClave}'>http://giaiteq-semillero.test/vista/html/recuperar_contra.php?code=${tokenClave}</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>";