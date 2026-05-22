<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $fullName = $data["fullName"] ?? "";
    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";

    if ($fullName === "" || $email === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "User signed up successfully",
        "user" => [
            "fullName" => $fullName,
            "email" => $email
        ]
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "users.php is working"
]);
?>