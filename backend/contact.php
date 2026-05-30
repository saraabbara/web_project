<?php
/*
php backend file created to allow contact functionality. Users can send an email throught the 
website contact us page. User enters subject, message, and email, and sends message to company admin
*/

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//load PHPMailer from composer
require "vendor/autoload.php";

//headers used to allow frontend to interact with the php backend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

//connect to database
$conn = new mysqli("localhost", "root", "", "albaytdecor", 3306);

//in case of an error in database
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

// function for sedning an email upon sending message as the client requested
function sendContactEmail($contact) {
    $mail = new PHPMailer(true);

    try {
        //PHPMailer will send an email using SMTP (standard email protocol)
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;

    
        //sent from this credential
        $mail->Username = "albaytdecorinfo@gmail.com";

        // we use gmail app password, not normal gmail password
        $mail->Password = "vdeg hngq gavt qmzi"; 

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // website sender
        $mail->setFrom("albaytdecorinfo@gmail.com", "Albayt Decor Website");

        // receiver email
        $mail->addAddress("abbarahsara12@gmail.com"); //actual email: info@albaytdecor.com

        // When you reply, it replies to the customer
        $mail->addReplyTo($contact["email"], $contact["name"]);


        //set email format to html and create subject line
        $mail->isHTML(true);
        $mail->Subject = "New Contact Message: " . $contact["subject"];


        //create html  versions of the email from the contact form
        $mail->Body =
            "<h2>New Contact Message</h2>" .
            "<p><strong>Name:</strong> " . htmlspecialchars($contact["name"]) . "</p>" .
            "<p><strong>Email:</strong> " . htmlspecialchars($contact["email"]) . "</p>" .
            "<p><strong>Subject:</strong> " . htmlspecialchars($contact["subject"]) . "</p>" .
            "<p><strong>Message:</strong></p>" .
            "<p>" . nl2br(htmlspecialchars($contact["message"])) . "</p>";


        //create plain text versions of the email from the contact form for clients that dont support html
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

//read json data sent from frontend
$data = json_decode(file_get_contents("php://input"), true);


//retrieves contact form input values
$name = isset($data["name"]) ? trim($data["name"]) : "";
$email = isset($data["email"]) ? trim($data["email"]) : "";
$subject = isset($data["subject"]) ? trim($data["subject"]) : "";
$message = isset($data["message"]) ? trim($data["message"]) : "";


//ensure all fields are filled
if ($name === "" || $email === "" || $subject === "" || $message === "") {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit;
}


//insert input into the contactUs table in database
$sql = "INSERT INTO ContactUs (name, email, subject, message) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Could not prepare contact query."
    ]);
    exit;
}

//bind form input values safely
$stmt->bind_param("ssss", $name, $email, $subject, $message);


//run insert query
if ($stmt->execute()) {
    // make an array to store the form data for the email function
    $contact = [
        "name" => $name,
        "email" => $email,
        "subject" => $subject,
        "message" => $message
    ];

    //sends an email to admin with user message and conatct info
    $emailSent = sendContactEmail($contact);

    //returns message to the frontend contact page
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully.",
        "email_sent" => $emailSent
    ]);
} else {

//in case of an error
    echo json_encode([
        "success" => false,
        "message" => "Message could not be saved."
    ]);
}

$stmt->close();
$conn->close();
?>