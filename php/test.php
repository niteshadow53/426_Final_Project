<?php
require_once "orm/Users.php";

print_r(checkIfUserExists("alsdfkj"));
print_r(checkIfUserExists("user11"));
print json_encode(checkIfUserExists("user11"));
print json_encode(checkIfUserExists("asdflkj"));

?>
