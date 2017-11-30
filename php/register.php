<?php

// Given a username and password, create an entry for that user
// in the database

$username = "user1";
$password_hash = "ABCDEF";

// SQL stuff...

$sql_user = 'root';
$sql_password = 'root';
$db = 'ncaa_web_app';
// $host = 'localhost';
$host = '127.0.0.1';
$port = 0;

// MAMP uses 8889 instead of default 3306
$mysqli = new mysqli($host, $sql_user, $sql_password, $db, 8889);

if ($mysqli->connect_errno){
    echo "Failed to connect";
    echo ($mysqli->error);
}

?>
