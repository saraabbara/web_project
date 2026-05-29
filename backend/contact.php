<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "vendor/autoload.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$conn = new mysqli("localhost", "root", "", "albaytdecor", 3306);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

function sendContactEmail($contact) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;

        // Sender email account
        $mail->Username = "albaytdecorinfo@gmail.com";

        // Use Gmail App Password, not normal Gmail password
        $mail->Password = "vdeg hngq gavt qmzi";

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Website sender
        $mail->setFrom("albaytdecorinfo@gmail.com", "Albayt Decor Website");

        // Receiver email
        $mail->addAddress("abbarahsara12@gmail.com");

        // When you reply, it replies to the customer
        $mail->addReplyTo($contact["email"], $contact["name"]);

        $mail->isHTML(true);
        $mail->Subject = "New Contact Message: " . $contact["subject"];

        $mail->Body =
            "<h2>New Contact Message</h2>" .
            "<p><strong>Name:</strong> " . htmlspecialchars($contact["name"]) . "</p>" .
            "<p><strong>Email:</strong> " . htmlspecialchars($contact["email"]) . "</p>" .
            "<p><strong>Subject:</strong> " . htmlspecialchars($contact["subject"]) . "</p>" .
            "<p><strong>Message:</strong></p>" .
            "<p>" . nl2br(htmlspecialchars($contact["message"])) . "</p>";

        $mail->AltBody =
            "New Contact Message\n\n" .
            "Name: " . $contact["name"] . "\n" .
            "Email: " . $contact["email"] . "\n" .
            "Subject: " . $contact["subject"] . "\n\n" .
            "Message:\n" . $contact["message"];

        $mail->send();

        return true;
    } catch (Exception $e) {
        return false;
    }
}

$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data["name"]) ? trim($data["name"]) : "";
$email = isset($data["email"]) ? trim($data["email"]) : "";
$subject = isset($data["subject"]) ? trim($data["subject"]) : "";
$message = isset($data["message"]) ? trim($data["message"]) : "";

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit;
}

$sql = "INSERT INTO ContactUs (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Could not prepare contact query."
    ]);
    exit;
}

$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    $contact = [
        "name" => $name,
        "email" => $email,
        "subject" => $subject,
        "message" => $message
    ];

    $emailSent = sendContactEmail($contact);

    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "email_sent" => $emailSent
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Message could not be saved."
    ]);
}

$stmt->close();
$conn->close();
?>