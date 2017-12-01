<?php require "utils.php";

// ORM mapping for Users table

// returns a $response variable of the form:
// array(error=>"", success=>"")
// where error is any error messages, and success is 1 if successful
function addUser($username, $hash, $salt){
    $response = array("error" => "");

    // Connect to mysqli database
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // $qry = "INSERT INTO Users (username, passwd, salt) VALUES ";
    // $qry .= "(\"".$username."\", \"".$hash."\", \"".$salt."\")";
    $qry = "INSERT INTO Users (username, passwd, salt) VALUES ";
    $qry .= "(?, ?, ?)";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("sss", $username, $hash, $salt);

    // echo "\n".$qry;
    if (!$stmt->execute()){
        $response["error"] = $mysqli->error;
        // echo json_encode($response);
        return $response;
    }

    // If we get here, success!
    $response["success"] = 1;
    // echo json_encode($response);
    return $response;
}

function checkIfUserExists($username){
    // $qry =
}



?>
