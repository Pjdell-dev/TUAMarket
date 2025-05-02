<?php
// List of allowed origins
$allowed_origins = [
    "http://localhost:3000",     // For local development
    "http://192.168.1.7:3000",   // Your laptop's IP address
    //"https://tuamarketplace.online"   // Your production domain
];

// Only allow CORS if the Origin is in the allowed list
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// IMPORTANT: Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
