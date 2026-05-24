<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$name = isset($_POST["name"]) ? trim($_POST["name"]) : '';
$email = isset($_POST["email"]) ? trim($_POST["email"]) : '';
$betreff = isset($_POST["betreff"]) ? trim($_POST["betreff"]) : '';
$nachricht = isset($_POST["nachricht"]) ? trim($_POST["nachricht"]) : '';

// Grundlegende Validierung
if ($name === '' || $email === '' || $nachricht === '') {
    echo "Bitte füllen Sie alle Felder aus.";
    exit;
}

// Länge begrenzen
if (mb_strlen($name) > 100 || mb_strlen($email) > 320 || mb_strlen($nachricht) > 5000 || mb_strlen($betreff) > 150) {
    echo "Eingaben zu lang.";
    exit;
}

// Header-Injection verhindern (keine CR/LF in Feldern verwenden)
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $betreff)) {
    echo "Ungültige Eingabe.";
    exit;
}

// Email validieren
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    exit;
}

// Empfänger (deine DomainAdresse)
$empfaenger = "kontakt@mario-wiecha.de";

// From / Envelope (muss zu deiner Domain passen)
$fromDomain = 'mario-wiecha.de'; // ggf. anpassen
$fromEmail = 'kontakt@' . $fromDomain;
$fromName = 'Mario Wiecha | Webdesigner';

// Subject und Inhalt (UTF-8) – Betreff optional einbauen
$betreffRaw = ($betreff !== '' ? $betreff . ' – ' : '') . "Nachricht von $name";
$betreff = mb_encode_mimeheader($betreffRaw, 'UTF-8', 'B', "\r\n");

$inhalt = "Name: $name\n";
$inhalt .= "E-Mail: $email\n";
if ($betreff !== '') {
  $inhalt .= "Betreff: $betreffRaw\n";
}
$inhalt .= "\nNachricht:\n$nachricht\n\n";
// $inhalt .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'n/a') . "\n";
// $inhalt .= "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'n/a') . "\n";

// Header (From = Domain-Adresse, Reply-To = Absender)
$headers = [];
$headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
$headers[] = 'Reply-To: ' . $email;
// $headers[] = 'MIME-Version: 1.0';
// $headers[] = 'Content-Type: text/plain; charset=UTF-8';
// $headers[] = 'Content-Transfer-Encoding: 8bit';
// $headers[] = 'X-Mailer: PHP/' . phpversion();

$headers_str = implode("\r\n", $headers);

// Envelope-Sender (-f) setzen, damit Return-Path korrekt ist
$parameters = '-f' . $fromEmail;

if (mail($empfaenger, $betreff, $inhalt, $headers_str, $parameters)) {
    echo "success";
} else {
    echo "Serverfehler beim Senden.";
}
?>