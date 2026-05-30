<?php
/*
php file for creating useer accounts. The php file connects with mysql database and validates
and saves user account including the full name, email, and hashes the password and saves it.
*/


//headers used to allow frontend to interact with the php backend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

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

//check if users.php is woring with opened get request
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode([
        "success" => true,
        "message" => "users.php is working"
    ]);
    exit;
}

// for handling user signup
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

    //hash the password before saving it in database for more security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);


    //inserts new user email, full name, and password into the database
    $sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    //bind user input safely
    $stmt->bind_param("sss", $fullName, $email, $hashedPassword);


    //run insert query
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

//retrun if there is an error
echo json_encode([
    "success" => false,
    "message" => "Invalid request method"
]);
?>