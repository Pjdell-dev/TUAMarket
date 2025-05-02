<?php
session_start();
include "corsHeader.php";

if (isset($_SESSION['email'])) {
    echo json_encode(["email" => $_SESSION['email']]);
} else {
    echo json_encode(["email" => null]);
}
?>
