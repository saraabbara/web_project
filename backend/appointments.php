<?php
/* php backend api for booking appointments. It connects to mysql database to save user appointment 
details, allowing the frontend to recieve appoitnments and for users to create or cancel appointments and then
notify the admin through email. 
*/

//import PHPMailer that will be used to send emails
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


//load PHPMailer from composer
require "vendor/autoload.php";

//headers used to allow frontend to interact with the php backend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


//establish connection with mysql database

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$conn = new mysqli("127.0.0.1", "root", "", "albaytdecor", 3306);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];


// function for sedning an email upon the booking of an appointment
function sendAppointmentEmail($appointment) {
    $mail = new PHPMailer(true);

    try {
        //PHPMailer will send an email using SMTP (standard email protocol)
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;

        //sent from these credentials
        $mail->Username = "albaytdecorinfo@gmail.com";
        $mail->Password = "YOUR_GMAIL_APP_PASSWORD"; 

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        //sent to the admin of te company through these credentials
        $mail->setFrom("albaytdecorinfo@gmail.com", "Albayt Decor Website");
        $mail->addAddress("abbarahsara12@gmail.com"); //actual email: info@albaytdecor.com

        $mail->isHTML(true);
        $mail->Subject = "New Appointment Booked";


        // create html and plain text versions of the appointment email using the appointment details.
        $mail->Body = "
            <h2>New Appointment Booked</h2>

            <p><strong>Name:</strong> {$appointment["full_name"]}</p>
            <p><strong>Email:</strong> {$appointment["email"]}</p>
            <p><strong>Phone:</strong> {$appointment["phone_number"]}</p>
            <p><strong>Decor Plan:</strong> {$appointment["decor_plan"]}</p>
            <p><strong>Style:</strong> {$appointment["style"]}</p>
            <p><strong>Date:</strong> {$appointment["date"]}</p>
            <p><strong>Time:</strong> {$appointment["time"]}</p>
            <p><strong>Status:</strong> {$appointment["status"]}</p>
        ";

        $mail->AltBody =
            "New Appointment Booked\n" .
            "Name: " . $appointment["full_name"] . "\n" .
            "Email: " . $appointment["email"] . "\n" .
            "Phone: " . $appointment["phone_number"] . "\n" .
            "Decor Plan: " . $appointment["decor_plan"] . "\n" .
            "Style: " . $appointment["style"] . "\n" .
            "Date: " . $appointment["date"] . "\n" .
            "Time: " . $appointment["time"] . "\n" .
            "Status: " . $appointment["status"];

        $mail->send();

        return true;
    } catch (Exception $e) {
        return false;
    }
}

//retrieve all appointments for the user and display on dashboard
if ($method === "GET") {
    $userId = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : 0;

    if ($userId === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Missing user ID"
        ]);
        exit;
    }

    //get all of the appointments made by the user and display them from newest to oldest.
    $sql = "SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    //store all records before sening as json
    $appointments = [];

    //loop through database to retrieve info and display it for the user
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

    //send the appointment details to frontend
    echo json_encode([
        "success" => true,
        "appointments" => $appointments
    ]);

    $stmt->close();
    $conn->close();
    exit;
}

//handle creating and canceling appointments
if ($method === "POST") {

    //convert json from frontend into php array
    $data = json_decode(file_get_contents("php://input"), true);

    //check if user requests to cancel appointment
    if (isset($data["action"]) && $data["action"] === "cancel") {
        $appointmentId = isset($data["appointment_id"]) ? intval($data["appointment_id"]) : 0;
        $userId = isset($data["user_id"]) ? intval($data["user_id"]) : 0;

        //make sure no missing appointmentid/userid
        if ($appointmentId === 0 || $userId === 0) {
            echo json_encode([
                "success" => false,
                "message" => "Missing appointment ID or user ID"
            ]);
            exit;
        }

        //if canceled, update appointment status only if it belongs to same user
        $sql = "UPDATE appointments 
                SET status = 'canceled'
                WHERE appointment_id = ? AND user_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $appointmentId, $userId);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Appointment canceled successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Appointment could not be canceled"
            ]);
        }

        $stmt->close();
        $conn->close();
        exit;
    }


    //retrieve appointment informatioon sent from frontend
    $userId = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
    $fullName = isset($data["full_name"]) ? trim($data["full_name"]) : "";
    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $phoneNumber = isset($data["phone_number"]) ? trim($data["phone_number"]) : "";


    //get selected the selected style 
    $decorPlan = isset($data["decor_plan"]) ? trim($data["decor_plan"]) : "";
    if ($decorPlan === "" && isset($data["plan"])) {
        $decorPlan = trim($data["plan"]);
    }

    $style = isset($data["style"]) ? trim($data["style"]) : "";

    //retrieve the uploaded floor plan if any was uploaded
    $floorPlanUpload = isset($data["floor_plan_upload"]) ? trim($data["floor_plan_upload"]) : "";
    if ($floorPlanUpload === "" && isset($data["floor_plan_file_name"])) {
        $floorPlanUpload = trim($data["floor_plan_file_name"]);
    }

    //retrieve appointment date: day, time
    $date = isset($data["date"]) ? trim($data["date"]) : "";
    $time = isset($data["time"]) ? trim($data["time"]) : "";
    $status = isset($data["status"]) ? trim($data["status"]) : "confirmed";


    //ensure all fields are inputed, nothing missing
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

    //insert new appointments info into database
    $sql = "INSERT INTO appointments 
            (user_id, full_name, email, phone_number, decor_plan, style, floor_plan_upload, date, time, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);


    //bind appointment values safely
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

    //saves the appointment. if insert successful, prepares the response
    if ($stmt->execute()) {

        // make an array using the saved data and new appointment id
        $appointment = [
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
        ];

        // send an email with the new appointment details
        $emailSent = sendAppointmentEmail($appointment);

        // return the saved appointment details and status to frontend
        echo json_encode([
            "success" => true,
            "message" => "Appointment saved successfully",
            "email_sent" => $emailSent,
            "appointment_id" => $stmt->insert_id,
            "appointment" => $appointment
        ]);
    } else {
        //if error
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