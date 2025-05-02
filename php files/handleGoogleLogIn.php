<?php
session_start();
include "corsHeader.php";

// Read JSON body
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email'])) {
    $_SESSION['email'] = $data['email'];
    echo json_encode(["status" => "success", "message" => "Email saved in session"]);
} else {
    echo json_encode(["status" => "error", "message" => "No email provided"]);
}
?>
