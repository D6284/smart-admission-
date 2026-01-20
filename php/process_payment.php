<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['student_id'])) {
    die(json_encode(['status' => 'error', 'message' => 'Unauthorized']));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $student_id = $_SESSION['student_id'];
    $mobile = $_POST['mobile_number'];
    $amount = 50000; // Fixed Fee

    try {
        $pdo->beginTransaction();
        
        // Record payment
        $stmt = $pdo->prepare("INSERT INTO payments (student_id, mobile_number, amount) VALUES (?, ?, ?)");
        $stmt->execute([$student_id, $mobile, $amount]);
        
        // Update student paid status
        $stmt2 = $pdo->prepare("UPDATE students SET paid = 'Yes' WHERE id = ?");
        $stmt2->execute([$student_id]);
        
        $pdo->commit();
        echo json_encode(['status' => 'success', 'message' => 'Payment processed successfully!']);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Payment failed.']);
    }
}
?>