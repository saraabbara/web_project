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

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    $userId = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : 0;

    if ($userId === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Missing user ID"
        ]);
        exit;
    }

    $sql = "SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    $appointments = [];

    while ($row = $result->fetch_assoc()) {
        $appointments[] = [
            "appointment_id" => $row["appointment_id"],
            "id" => $row["appointment_id"],
            "user_id" => $row["user_id"],
            "full_name" => $row["full_name"],
            "email" => $row["email"],
            "phone_number" => $row["phone_number"],
            "decor_plan" => $row["decor_plan"],
            "plan" => $row["decor_plan"],
            "style" => $row["style"],
            "floor_plan_upload" => $row["floor_plan_upload"],
            "date" => $row["date"],
            "time" => $row["time"],
            "status" => $row["status"]
        ];
    }

    echo json_encode([
        "success" => true,
        "appointments" => $appointments
    ]);

    $stmt->close();
    $conn->close();
    exit;
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $userId = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
    $fullName = isset($data["full_name"]) ? trim($data["full_name"]) : "";
    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $phoneNumber = isset($data["phone_number"]) ? trim($data["phone_number"]) : "";

    $decorPlan = isset($data["decor_plan"]) ? trim($data["decor_plan"]) : "";
    if ($decorPlan === "" && isset($data["plan"])) {
        $decorPlan = trim($data["plan"]);
    }

    $style = isset($data["style"]) ? trim($data["style"]) : "";

    $floorPlanUpload = isset($data["floor_plan_upload"]) ? trim($data["floor_plan_upload"]) : "";
    if ($floorPlanUpload === "" && isset($data["floor_plan_file_name"])) {
        $floorPlanUpload = trim($data["floor_plan_file_name"]);
    }

    $date = isset($data["date"]) ? trim($data["date"]) : "";
    $time = isset($data["time"]) ? trim($data["time"]) : "";
    $status = isset($data["status"]) ? trim($data["status"]) : "confirmed";

    if (
        $userId === 0 ||
        $fullName === "" ||
        $email === "" ||
        $phoneNumber === "" ||
        $decorPlan === "" ||
        $style === "" ||
        $date === "" ||
        $time === ""
    ) {
        echo json_encode([
            "success" => false,
            "message" => "Missing appointment information"
        ]);
        exit;
    }

    $sql = "INSERT INTO appointments 
            (user_id, full_name, email, phone_number, decor_plan, style, floor_plan_upload, date, time, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "isssssssss",
        $userId,
        $fullName,
        $email,
        $phoneNumber,
        $decorPlan,
        $style,
        $floorPlanUpload,
        $date,
        $time,
        $status
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Appointment saved successfully",
            "appointment_id" => $stmt->insert_id,
            "appointment" => [
                "appointment_id" => $stmt->insert_id,
                "id" => $stmt->insert_id,
                "user_id" => $userId,
                "full_name" => $fullName,
                "email" => $email,
                "phone_number" => $phoneNumber,
                "decor_plan" => $decorPlan,
                "plan" => $decorPlan,
                "style" => $style,
                "floor_plan_upload" => $floorPlanUpload,
                "date" => $date,
                "time" => $time,
                "status" => $status
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Appointment could not be saved"
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