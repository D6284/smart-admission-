<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['admin_id'])) {
    die("Unauthorized");
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $admission_no = "ADM2026-" . rand(1000, 9999);
    
    $stmt = $pdo->prepare("UPDATE students SET status = 'Approved', admission_no = ? WHERE id = ?");
    $stmt->execute([$admission_no, $id]);
    
    header("Location: admin_dashboard.php?msg=Approved");
}
?>