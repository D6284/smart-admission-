<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['admin_id'])) {
    die(json_encode(['status' => 'error', 'message' => 'Unauthorized']));
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    try {
        $stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
        $stmt->execute([$id]);
        header("Location: ../admin_dashboard.php?msg=Deleted");
    } catch (PDOException $e) {
        die("Error deleting record: " . $e->getMessage());
    }
}
?>