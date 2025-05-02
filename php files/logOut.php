<?php
// logout.php

session_start();

include "corsHeader.php";

// Unset all session variables
$_SESSION = [];

// Destroy the session
session_destroy();

// Optionally, send a response back
header('Content-Type: application/json');
echo json_encode(['message' => 'Logged out successfully']);

?>
