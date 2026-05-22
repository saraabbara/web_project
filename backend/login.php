<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
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

    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";

    if ($email === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "Email and password are required"
        ]);
        exit;
    }

    // Temporary users until MySQL is connected
    $users = [
        [
            "user_id" => 1,
            "fullName" => "Sara Abbara",
            "email" => "test@email.com",
            "password" => "123456"
        ],
        [
            "user_id" => 2,
            "fullName" => "Maha Shaheen",
            "email" => "maha@email.com",
            "password" => "123456"
        ]
    ];

    foreach ($users as $user) {
        if ($user["email"] === $email && $user["password"] === $password) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "user_id" => $user["user_id"],
                    "fullName" => $user["fullName"],
                    "email" => $user["email"]
                ]
            ]);
            exit;
        }
    }

    echo json_encode([
        "success" => false,
        "message" => "Incorrect email or password"
    ]);
    exit;
}

echo json_encode([
    "success" => false,
    "message" => "Invalid request method"
]);
?>