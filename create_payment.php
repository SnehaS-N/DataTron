<?php
require 'vendor/autoload.php'; // If using Composer
require 'config.php'; // Your DB config if needed

\Stripe\Stripe::setApiKey('YOUR_STRIPE_SECRET_KEY'); // Replace with your secret key

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 0; // Amount in cents

try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount,
        'currency' => 'usd',
        'payment_method_types' => ['card'],
    ]);

    echo json_encode([
        'status' => 'success',
        'clientSecret' => $paymentIntent->client_secret
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
