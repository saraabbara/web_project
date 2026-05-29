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
        "message" => "We couldn’t connect to the system right now. Please try again in a moment."
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode([
        "success" => true,
        "message" => "login.php is working"
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $password = isset($data["password"]) ? trim($data["password"]) : "";

    if ($email === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "Please enter your email and password."
        ]);
        exit;
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "message" => "Something went wrong while checking your account. Please try again."
        ]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            "success" => false,
            "message" => "We couldn’t find an account with this email. Please sign up first."
        ]);
        exit;
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "The password you entered is incorrect. Please try again."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "user" => [
            "user_id" => $user["user_id"],
            "full_name" => $user["full_name"],
            "fullName" => $user["full_name"],
            "email" => $user["email"]
        ]
    ]);
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Invalid request method."
]);
?>