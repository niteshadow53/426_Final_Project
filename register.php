// Given a username and password, create an entry for that user
// in the database

$username = "user1"
$password_hash = "ABCDEF"

// SQL stuff...

$sql_user = 'root'
$sql_password = 'root'
$db = 'FinalProjectDB'
$host = 'localhost'
$port = 0;

$mysqli = new mysqli($host, $sql_user, $sql_password)

if ($mysqli->connect_errno){
    echo "Failed to connect";
}
