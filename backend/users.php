<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "albaytdecor");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode([
        "success" => true,
        "message" => "users.php is working"
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $fullName = isset($data["fullName"]) ? trim($data["fullName"]) : "";
    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $password = isset($data["password"]) ? trim($data["password"]) : "";

    if ($fullName === "" || $email === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required"
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $fullName, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "User signed up successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Email already exists or user could not be created"
        ]);
    }

    $stmt->close();
    $conn->close();
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Invalid request method"
]);
?>