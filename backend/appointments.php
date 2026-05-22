<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    "message" => "appointments.php is connected"
]);
?>