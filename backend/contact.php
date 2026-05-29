<?php
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
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Message sent successfully."
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