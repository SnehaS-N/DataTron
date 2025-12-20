<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'config.php';

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// Validate input
if (!$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Email and password are required"]);
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("SELECT id, name, password, is_subscribed FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    $stmt->close();
    $conn->close();
    exit;
}

// Bind result
$stmt->bind_result($id, $name, $hashedPassword, $isSubscribed);
$stmt->fetch();

// Verify password
if (password_verify($password, $hashedPassword)) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "user" => [
            "id" => $id,
            "name" => $name,
            "email" => $email,
            "is_subscribed" => $isSubscribed
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}

$stmt->close();
$conn->close();
?>
