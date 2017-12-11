<?php

require_once "orm/Brackets.php";

// print ($_SERVER['REQUEST_METHOD']);

$pathinfo = $_SERVER["PATH_INFO"];

$pathinfo = explode("/", $pathinfo);

// print_r ($pathinfo);
// print_r $_GET;
// print_r ($_POST['bracket']);

// Check if GET or POST
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    // echo "This is a get method";

    if(array_key_exists("1", $pathinfo)){
        // implement logic here
    }
    else{
        // implement logic here
        echo json_encode(getBracketData($_GET['id']));
    }
}
else{ // POST
    // implement post logic here

    $json = json_decode($_POST['bracket']);
    echo json_encode(saveBracketDataFromPOST($json, $_POST['name'], $_POST['user']));

}
?>
