<?php

function getMysqliObject(){
    // SQL stuff...

    $sql_user = 'root';
    $sql_password = 'root';
    $db = 'ncaa_web_app';
    // $host = 'localhost';
    $host = '127.0.0.1';
    $port = 0;

    // MAMP uses 8889 instead of default 3306
    $mysqli = new mysqli($host, $sql_user, $sql_password, $db, 8889);

    return $mysqli;
}

?>
