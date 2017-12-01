<?php
require_once "orm/Users.php";

session_start();

function login(){
    $result = array("error" => "");

    // User sends username and password
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check if username exists
    $user_data = getUserByUsername($username)["data"];
    if(empty($user_data)){
        $result["error"] = "User does not exist";
        echo json_encode($result);
        return;
    }

    // Access salt for username
    $salt = $user_data["salt"];
    $stored_hash = $user_data["hash"];

    // Hash password with the salt
    $computed_hash = hash('sha256', $password.$salt);

    // Check if the hashes match
    if(!$computed_hash == $stored_hash){
        $result["error"] = "Password incorrect";
        echo json_encode($result);
    }

    // set session variable "auth" to true and "user" to username
    $_SESSION["user"] = $username;
    $result["status"] = "Successfully authenticated as: ".$_SESSION["user"];
    echo json_encode($result);
}



login();
?>
