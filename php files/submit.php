<?php

//THIS PHP FILE IS FOR TESTING ONLY TO SEE IF THE DATA ACTUALLY FETCHES IT - NO DB CONNECTION DONE HERE

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the raw JSON input from React
$input = json_decode(file_get_contents("php://input"), true);

// Check if the required fields are present
if (!empty($input['itemName']) && !empty($input['price']) && !empty($input['category']) && !empty($input['condition']) && !empty($input['description'])) {
    // Just echo back the received data for now
    $response = [
        "received" => $input,
        "message" => "Data received successfully"
    ];
} else {
    // If missing fields, send an error message
    $response = [
        "message" => "Error: Missing Some Details."
    ];
}

echo json_encode($response);