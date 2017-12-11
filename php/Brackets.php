<?php

require_once "orm/Brackets.php";

// print ($_SERVER['REQUEST_METHOD']);

$pathinfo = $_SERVER["PATH_INFO"];

$pathinfo = explode("/", $pathinfo);

// print_r ($pathinfo);
// print_r $_GET;
// print_r ($_POST);

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

    if(array_key_exists("1", $pathinfo) && $pathinfo[1] == "updateGames"){
        echo "updating games";
        // TODO finish implementing
        return;
    }
    if(array_key_exists("1", $pathinfo) && $pathinfo[1] == "createBracket"){
        // echo "create bracket with name: \n";
        $bracket_name = $_POST['bracket_name'];
        $username = $_POST['username'];
        // echo $name."\n";
        // echo "username: ".$username;

        echo json_encode(createBracket($username, $bracket_name));

        return;
    }
    $json = json_decode($_POST['bracket']);
    echo json_encode(saveBracketDataFromPOST($json, $_POST['name'], $_POST['user']));

}
?>
