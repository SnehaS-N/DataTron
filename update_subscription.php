<?php
require 'config.php';

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['userId'])) {
    echo json_encode(["status" => "error", "message" => "No userId received"]);
    exit;
}

$userId = intval($data['userId']);

// Update subscription in database
$stmt = $conn->prepare("UPDATE users SET is_subscribed = 1 WHERE id = ?");
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Subscription updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update subscription"]);
}

$stmt->close();
$conn->close();
?>
