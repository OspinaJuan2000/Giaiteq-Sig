<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../externo/sendEmail-PHP/Exception.php';
require '../../externo/sendEmail-PHP/PHPMailer.php';
require '../../externo/sendEmail-PHP/SMTP.php';

function enviarEmailPHP($nombreOrigen, $nombreDestino, $correoDestino, $correoAsunto, $correoMensaje) {

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com
        ';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = '';                     // SMTP username
        $mail->Password   = '';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Correo desde el cual va a ser enviado el correo.
        $mail->setFrom('', $nombreOrigen);

        //Correo al cual va a ser enviado el correo.
        $mail->addAddress($correoDestino);

        //Enviar archivos.
        // $mail->addAttachment('../../externo/sendEmail-PHP/descarga.jpg');

        //Contenido del correo electrónico.
        $mail->isHTML(true); // Si se va a enviar HTML.
        $mail->Subject = $correoAsunto;
        $mail->Body    = $correoMensaje;
        $mail->CharSet = 'UTF-8';
        $mail->send(); // Envia el correo electrónico.

        return 1;
    } catch (Exception $e) {
        return 2;
    }
}
