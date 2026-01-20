<?php
session_start();
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM students WHERE email = ?");
    $stmt->execute([$email]);
    $student = $stmt->fetch();

    if ($student && password_verify($password, $student['password'])) {
        $_SESSION['student_id'] = $student['id'];
        $_SESSION['student_name'] = $student['fullname'];
        echo json_encode(['status' => 'success', 'redirect' => 'student_dashboard.php']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
    }
}
?>