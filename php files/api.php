<?php

//THIS PHP FILE IS FOR TESTING ONLY - TESTING REACT JS TO PHP CONNECTION

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$response = ["message" => "Welcome to TUA Marketplace!"];
echo json_encode($response);

?>