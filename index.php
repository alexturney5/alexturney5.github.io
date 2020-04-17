<?php
       // from the form
       $email = trim(strip_tags($_POST['email']));

       // set here
       $subject = "Contact form submitted!";
       $to = 'biteboard.io@gmail.com';

       $body = <<<HTML
$message
HTML;

       $headers = "From: $email\r\n";
       $headers .= "Content-type: text/html\r\n";

       // send the email
       mail($to, $subject, $body, $headers);

       // redirect afterwords, if needed
       header("Location:biteboard.io");
?>