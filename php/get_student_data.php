<?php
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit();
}

$id = $_SESSION['student_id'];
$stmt = $pdo->prepare("SELECT id, fullname, email, class_level, gender, phone, admission_no, status, paid, created_at FROM students WHERE id = ?");
$stmt->execute([$id]);
$student = $stmt->fetch();

if ($student) {
    echo json_encode(['status' => 'success', 'data' => $student]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Student not found']);
}
?>