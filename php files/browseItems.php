<?php

include "connect_db.php"; // returns a $pdo instance

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {

    //fetching items

    $query = "SELECT item_id, item_name, price, condition, category, description, preview_pic FROM posted_items ORDER BY listing_date DESC";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON (array of objects)
    echo json_encode($results);
 } 
 
 catch (PDOException $e) {
     echo json_encode(["message" => "Error: " . $e->getMessage()]);
 }


?>