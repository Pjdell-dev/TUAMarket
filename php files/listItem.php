<?php

include "connect_db.php"; // returns a $pdo instance

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if (
    !empty($input['itemName']) &&
    !empty($input['price']) &&
    !empty($input['category']) &&
    !empty($input['condition']) &&
    !empty($input['description']) &&
    !is_null($input['images']) &&
    is_array($input['images'])
) {
    $itemName = $input['itemName'];
    $price = $input['price'];
    $category = $input['category'];
    $condition = $input['condition'];
    $description = $input['description'];
    $images = $input['images'];
    $userID = 1; // this should ideally come from session or auth token

    // Validate and clean images
    $validImages = [];
    foreach ($images as $img) {
        if (preg_match('/^data:image\/(png|jpeg|jpg);base64,/', $img)) {
            $validImages[] = $img;
        }
    }

    try {
        // Insert main item
        $query = "INSERT INTO posted_items (item_name, price, category, condition, description, user_id, preview_pic) 
                VALUES (:item_name, :price, :category, :condition, :description, :user_id, :preview_pic)";
        $stmt = $pdo->prepare($query);

        $result = $stmt->execute([
            ':item_name'   => $itemName,
            ':price'       => $price,
            ':category'    => $category,
            ':condition'   => $condition,
            ':description' => $description,
            ':user_id'     => $userID,
            ':preview_pic' => $validImages[0],
        ]);

        // Get the inserted item ID
        $itemId = $pdo->lastInsertId();

        $imgUploadResult = [];

        if ($result && $itemId) {
            // Insert associated images
            foreach ($validImages as $img) {
                $query2 = "INSERT INTO item_pictures (itempic, item_id) 
                        VALUES (:itempic, :item_id)";
                $stmt2 = $pdo->prepare($query2);

                $result2 = $stmt2->execute([
                    ':itempic'  => $img,
                    ':item_id'   => $itemId
                ]);

                if ($result2) {
                    $imgUploadResult[] = true;
                }
            }

            if (count($imgUploadResult) === count($validImages)) {
                $response = ["message" => "Item posted successfully!"];
            } else {
                $response = ["message" => "Item saved, but some images failed to upload."];
            }
        } else {
            $response = ["message" => "Failed to insert item."];
        }
    } catch (PDOException $e) {
        $response = ["message" => "Database error: " . $e->getMessage()];
    }
} else {
    $response = ["message" => "Error: Missing or invalid item details."];
}

echo json_encode($response);
exit;
