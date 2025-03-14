<?php
// Start session
session_start();

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm-password"];
    
    // Validate passwords match
    if ($password !== $confirm_password) {
        header("Location: ../register.html?error=passwords_dont_match");
        exit;
    }
    
    // In a real application, you would:
    // 1. Check if email already exists in database
    // 2. Hash the password
    // 3. Insert the new user into the database
    
    // For this example, we'll just set session variables
    $_SESSION["loggedin"] = true;
    $_SESSION["email"] = $email;
    $_SESSION["name"] = $name;
    
    // Redirect to home page
    header("Location: ../home.html");
    exit;
} else {
    // If not a POST request, redirect to registration page
    header("Location: ../register.html");
    exit;
}
?>

