<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $class_level = $_POST['class_level'];
    $gender = $_POST['gender'];
    $phone = $_POST['phone'];

    // Handle File Upload
    $document = '';
    if (isset($_FILES['document'])) {
        $target_dir = "../uploads/";
        $document = time() . '_' . basename($_FILES["document"]["name"]);
        move_uploaded_file($_FILES["document"]["tmp_name"], $target_dir . $document);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO students (fullname, email, password, class_level, gender, phone, document) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$fullname, $email, $password, $class_level, $gender, $phone, $document]);
        echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Email already exists or database error.']);
    }
}
?>