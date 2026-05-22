<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

// Temporary fake appointments.
// maha replace this with SELECT from MySQL.
$appointments = [
    [
        "id" => 1,
        "user_id" => 1,
        "date" => "2026-05-19",
        "time" => "10:30",
        "plan" => "Full House",
        "style" => "Modern",
        "designer" => "Sara Abbara",
        "location" => "Riyadh",
        "status" => "canceled"
    ],
    [
        "id" => 2,
        "user_id" => 2,
        "date" => "2026-05-31",
        "time" => "10:30",
        "plan" => "By Room - 2",
        "style" => "Modern",
        "designer" => "Maha Shaheen",
        "location" => "Jeddah",
        "status" => "confirmed"
    ]
];

if ($method === "GET") {
    $user_id = $_GET["user_id"] ?? "";

    $userAppointments = array_values(array_filter($appointments, function ($appointment) use ($user_id) {
        return strval($appointment["user_id"]) === strval($user_id);
    }));

    echo json_encode([
        "success" => true,
        "appointments" => $userAppointments
    ]);
    exit;
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    echo json_encode([
        "success" => true,
        "message" => "Appointment received successfully",
        "appointment" => $data
    ]);
    exit;
}
?>