<?php
session_start();
include "connect_db.php";
include "corsHeader.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!empty($input['user']) && !empty($input['password'])) {
    try {
        $email = $input['user'];
        $password = $input['password'];

        $query = "SELECT user_cred_id FROM user_creds WHERE email = :email AND password = :password";

        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':email' => $email,
            ':password' => $password
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode([
                "status" => "success",
            ]);

            $_SESSION['email'] = $email;
            $_SESSION['user_id'] = $result['user_cred_id'];
        } else {
            echo json_encode([
                "status" => "fail",
                "message" => "Invalid credentials"
            ]);
        }

    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Error: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "status" => "fail",
        "message" => "Missing input"
    ]);
}
exit;
