<?php

//DB CONNECTION

try {
    $pdo = new PDO("pgsql:host=localhost;dbname=tua_marketplace", "postgres", "bangusDevs2025");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

?>

