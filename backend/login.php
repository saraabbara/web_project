<?php
// allows React to send requests to this PHP file from a different port
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
// to allow React to send JSON data in the request
header("Access-Control-Allow-Headers: Content-Type");
// Allows these request methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//this is added because react and php are running on different ports so the browser may first send an OPTIONS request, its basically called the preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}
// Connects PHP to the MySQL database
$conn = new mysqli("localhost", "root", "", "albaytdecor", 3306);

// Checks if the database connection failed
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "We couldn’t connect to the system right now. Please try again in a moment."
    ]);
    exit;
}

//only for testing
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode([
        "success" => true,
        "message" => "login.php is working"
    ]);
    exit;
}

// POST is used when React sends the login form data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Gets the JSON data sent from React
    $data = json_decode(file_get_contents("php://input"), true);

    // Gets email and password from the request and trim removes extra spaces before and after the input
    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $password = isset($data["password"]) ? trim($data["password"]) : "";

    //check if empty
    if ($email === "" || $password === "") {
        echo json_encode([
            "success" => false,
            "message" => "Please enter your email and password."
        ]);
        exit;
    }

    // SQL query to find a user with the entered email
    $sql = "SELECT * FROM users WHERE email = ?";
    // this is for security purposes as it helps protect the database from SQL injection using prepare statements
    $stmt = $conn->prepare($sql);

    // Checks if the SQL query failed to prepare
    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "message" => "Something went wrong while checking your account. Please try again."
        ]);
        exit;
    }

     // Replaces the ? in the SQL query with the email value
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    //to check if the user exists or not in the database
    if ($result->num_rows === 0) {
        echo json_encode([
            "success" => false,
            "message" => "We couldn’t find an account with this email. Please sign up first."
        ]);
        exit;
    }

    //else if it exists, get the user row
    $user = $result->fetch_assoc();

    //check if the password is matching with the hashed one in our database
    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "The password you entered is incorrect. Please try again."
        ]);
        exit;
    }

     // If email and password are correct, the data is sent back to React
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

//just to check if the request method is valid
echo json_encode([
    "success" => false,
    "message" => "Invalid request method."
]);
?>