
-- Create Database
CREATE DATABASE IF NOT EXISTS admission_system;
USE admission_system;

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    class_level VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    admission_no VARCHAR(30) DEFAULT NULL,
    document VARCHAR(255) DEFAULT NULL,
    status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
    paid ENUM('Yes','No') DEFAULT 'No',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Insert Default Admin (Password is admin123)
INSERT INTO admin (username, password) 
VALUES ('admin', '$2y$10$8W3nE/S1.vH.6UoWfX.vO.zU8U9u6eW3nE/S1.vH.6UoWfX.vO.zU8U9u6'); 
-- Note: Use password_hash('admin123', PASSWORD_DEFAULT) in PHP for the above.
