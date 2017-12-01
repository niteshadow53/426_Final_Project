<?php require "utils.php";

function register(){
    // Given a username and password, create an entry for that user
    // in the database
    $response = array("error" => "");
    $username = $_POST["username"];
    $password_hash = "ABCDEF";
    $passwd = $_POST["password"];

    $mysqli = getMysqliObject();

    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        echo json_encode($response);
        return;
    }

    // Generate random salt
    $salt = bin2hex(openssl_random_pseudo_bytes(16));
    // echo "salt: ".$salt;

    // Hash the password with sha256 + the salt
    $password_hash = hash('sha256', $_POST["password"].$salt);
    // echo "\nsalted and hashed: ".$password_hash;

    // Store the username, password hash, and salt
    $qry = "INSERT INTO Users (username, passwd, salt) VALUES ";
    $qry .= "(\"".$username."\", \"".$password_hash."\", \"".$salt."\")";
    // echo "\n".$qry;
    if (!$mysqli->query($qry)){
        $response["error"] = $mysqli->error;
        echo json_encode($response);
        return;
    }

    // If we get here, success!
    $response["success"] = 1;
    echo json_encode($response);
}

register();
?>
