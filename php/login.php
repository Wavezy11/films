<?php
// Start session
session_start();

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = $_POST["password"];
    
    // In a real application, you would validate against a database
    // For this example, we'll use a hardcoded user
    $valid_email = "user@example.com";
    $valid_password = "password123"; // In reality, this would be hashed
    
    if ($email === $valid_email && $password === $valid_password) {
        // Set session variables
        $_SESSION["loggedin"] = true;
        $_SESSION["email"] = $email;
        
        // Redirect to home page
        header("Location: ../home.html");
        exit;
    } else {
        // Invalid credentials, redirect back to login with error
        header("Location: ../index.html?error=invalid_credentials");
        exit;
    }
} else {
    // If not a POST request, redirect to login page
    header("Location: ../index.html");
    exit;
}
?>

