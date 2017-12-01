<?php
require "Users.php";

function register(){
    // Given a username and password, create an entry for that user
    // in the database
    $username = $_POST["username"];
    $password_hash = "ABCDEF";
    $passwd = $_POST["password"];

    // Generate random salt
    $salt = bin2hex(openssl_random_pseudo_bytes(16));
    // echo "salt: ".$salt;

    // Hash the password with sha256 + the salt
    $password_hash = hash('sha256', $_POST["password"].$salt);
    // echo "\nsalted and hashed: ".$password_hash;

    // Store the username, password hash, and salt
    $result = addUser($username, $password_hash, $salt);

    // $qry = "INSERT INTO Users (username, passwd, salt) VALUES ";
    // $qry .= "(\"".$username."\", \"".$password_hash."\", \"".$salt."\")";
    // // echo "\n".$qry;
    // if (!$mysqli->query($qry)){
    //     $response["error"] = $mysqli->error;
    //     echo json_encode($response);
    //     return;
    // }

    echo json_encode($result);
}

register();
?>
