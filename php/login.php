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
    if(!($computed_hash == $stored_hash)){
        $result["error"] = "Password incorrect";
        $result["status"] = "Password incorrect. Please try again.";
        echo json_encode($result);
        return;
    }

    // set session variable "auth" to true and "user" to username
    $_SESSION["username"] = $username;
    $result["status"] = "Successfully authenticated as: ".$_SESSION["user"];
    echo json_encode($result);
}

function checkIfUsernameIsTaken($username){
    $response = array();

    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // form prepared statement
    $qry = "SELECT username FROM users ";
    $qry .= "WHERE username=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("s", $username);

    // execute statement
    if (!$stmt->execute()){
        $response["error"] = $mysqli->error;
        $response["error"] .= "statement failed to execute";
        // echo json_encode($response);
        return $response;
    }

    // Parse response
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $response['username'] = $row['username'];
    }
    if(!($response['username'] == "")){
        $response["status"] = "username is taken";
        $response["taken"] = 1;
        return $response;
    }
    $response["status"] = "username is free";
    $response["taken"] = 0;
    return $response;
}


// print ($_SERVER['REQUEST_METHOD']);

$pathinfo = $_SERVER["PATH_INFO"];

$pathinfo = explode("/", $pathinfo);

// print_r ($pathinfo);
// print_r $_GET;
// print_r ($_POST['bracket']);

// Check if GET or POST
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    // echo "This is a get method";
    echo json_encode(checkIfUsernameIsTaken($_GET['user']));

    if(array_key_exists("1", $pathinfo)){
        // implement logic here
    }
    else{
        // implement logic here
    }
}
else{ // POST
    // implement post logic here

    login();
    // echo $_SESSION['user'];

}

?>
