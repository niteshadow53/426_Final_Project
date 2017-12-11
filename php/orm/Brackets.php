<?php
require_once "utils.php";

// Get bracket picks for a specific round and region in a bracket
function getPicksForBracketIDRoundAndRegion($bracket_id, $round, $region){
    $response = array();

    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // form prepared statement
    $qry = "SELECT game, winner, bracket, round, teams.name FROM picks, teams ";
    $qry .= "WHERE bracket=? AND winner=team_id AND round=? AND region=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("iis", $bracket_id, $round, $region);

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
        // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
        // $response[] = $currentPick;
        $response[$row['game']] = $row['name'];
    }
    return (object)$response;
}

// // Get bracket game results
// function getGamesResultsForRoundAndRegion($round, $region){
//     $response = array();
//
//     $mysqli = getMysqliObject();
//
//     // Check for and return connection errors
//     if ($mysqli->connect_errno){
//         $response["error"] = "Failed to connect";
//         $response["error"] .= $mysqli->error;
//         return $response;
//     }
//
//     // form prepared statement
//     $qry = "SELECT game, winner, round, teams.name FROM games, teams ";
//     $qry .= "WHERE winner=team_id AND round=? AND region=?";
//     $stmt = $mysqli->prepare($qry);
//     $stmt->bind_param("iis", $bracket_id, $round, $region);
//
//     // execute statement
//     if (!$stmt->execute()){
//         $response["error"] = $mysqli->error;
//         $response["error"] .= "statement failed to execute";
//         // echo json_encode($response);
//         return $response;
//     }
//
//     // Parse response
//     $result = $stmt->get_result();
//     while($row = $result->fetch_assoc()){
//         // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
//         // $response[] = $currentPick;
//         $response[$row['game']] = $row['name'];
//         // we want... array($row['game']=>array($row['t1name'], ['t2name'], ['winner']))
//     }
//     return (object)$response;
// }

// Get bracket picks for a specific region in a bracket
function getPicksForBracketIDRegion($bracket_id, $region){
    $response = array();

    $num_of_rounds = 0;
    if ($region == "ff"){
        $num_of_rounds = 2;
        // $round_1_picks = getPicksForBracketIDRoundAndRegion($bracket_id);
        // $round_2_picks = getPicksForBracketIDRoundAndRegion()
    }
    else{
        $num_of_rounds = 4;
    }

    $region_picks=array();
    for($round = 0; $round < $num_of_rounds; $round++){
        $picks = getPicksForBracketIDRoundAndRegion($bracket_id, $round, $region);

        if(array_key_exists("error", $picks)){
            return $picks;
        }

        $region_picks[$round] = $picks;
    }
    $response[$region] = (object)$region_picks;

    // print_r($response);

    return $response;
}

function getPicksForBracketID($bracket_id){
    $regions = array("10", "11", "00", "01", "ff");

    $all_picks = array();
    for($region = 0; $region < 5; $region++){
        $region_picks = getPicksForBracketIDRegion($bracket_id, $regions[$region]);
        if(array_key_exists("error", $region_picks)){
            return $region_picks;
        }
        $all_picks[$regions[$region]] = $region_picks[$regions[$region]];
    }

    return (object)$all_picks;
}

function getBracketData($bracket_id){
    $result = array();

    // get username and bracket name
    $username_result = getUsernameAssociatedWithBracketID($bracket_id);
    $bracket_name_result = getNameOfBracketWithID($bracket_id);

    if(array_key_exists("error", $username_result)){
        return $username_result;
    }
    if(array_key_exists("error", $bracket_name_result)){
        return $bracket_name_result;
    }

    $username = $username_result["username"];
    $bracket_name = $bracket_name_result["bracket_name"];

    $picks = getPicksForBracketID($bracket_id);

    if(array_key_exists("error", $picks)){
        return $picks;
    }

    $result["name"] = $bracket_name;
    $result["user"] = $username;
    $result["bracket"] = $picks;

    return $result;


}

function getNameOfBracketWithID($bracket_id){
    $response = array();

    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // form prepared statement
    $qry = "SELECT name FROM brackets ";
    $qry .= "WHERE bracket_id=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("i", $bracket_id);

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
        $currentPick = $row['name'];
        $response['bracket_name'] = $currentPick;
    }

    return $response;
}

function getUsernameAssociatedWithBracketID($bracket_id){
    $response = array();

    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // form prepared statement
    $qry = "SELECT name, username FROM brackets, users ";
    $qry .= "WHERE bracket_id=? AND user=user_id";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("i", $bracket_id);

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
        $currentPick = $row['username'];
        $response['username'] = $currentPick;
    }

    return $response;
}

function saveBracketDataFromPOST($data, $bracket_name, $username){
    $response = array();

    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // get user's ID
    $user_id_response = getIDOfUser($username);
    if(array_key_exists("error", $user_id_response)){
        return $user_id_response;
    }
    $user_id = $user_id_response['user_id'];

    // get bracket's ID
    $bracket_id_response = getIDOfBracket($bracket_name, $user_id);
    if(array_key_exists("error", $bracket_id_response)){
        return $bracket_id_response;
    }
    $bracket_id = $bracket_id_response['bracket_id'];

    // Clear out any entries that are already there
    $remove_result = removeEntriesForBracket($bracket_id);
    if(array_key_exists("error", $remove_result)){
        return $remove_result;
    }

    foreach ($data as $property => $value){
        // get winner's ID
        $team_id_response = getIDOfTeam($value);
        if(array_key_exists("error", $team_id_response)){
            return $team_id_response;
        }
        $team_id = $team_id_response['team_id'];

        $region = substr($property, 0, 2);
        $round = substr($property, 2, 1);
        $game_num = substr($property, 3);

        // print "property: ".$property;
        // print "\n";
        // print "value: ".$value;
        // print "\n";
        // print "region: ".$region;
        // print "\n";
        // print "round: ".$round;
        // print "\n";
        // print "game_num: ".$game_num;
        // print "\n";
        // print "team_id: ".$team_id;
        // print "\n";
        // print "user_id: ".$user_id;
        // print "\n";
        // print "bracket_id: ".$bracket_id;
        // print "\n";

        $qry = "INSERT INTO picks (game, round, region, winner, bracket) VALUES ";
        $qry .= "(?, ?, ?, ?, ?)";
        $stmt = $mysqli->prepare($qry);
        $stmt->bind_param("iisii", $game_num, $round, $region, $team_id, $bracket_id);

        print_r($team_id . "\n");

        // execute statement
        if (!$stmt->execute()){
            $response["error"] = $mysqli->error;
            $response["error"] .= "statement failed to execute";
            // echo json_encode($response);
            return $response;
        }
    }
    return array("success"=>"1");
}

function removeEntriesForBracket($bracket_id){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    $qry = "DELETE FROM picks WHERE bracket=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("i", $bracket_id);

    // execute statement
    if (!$stmt->execute()){
        $response["error"] = $mysqli->error;
        $response["error"] .= "statement failed to execute";
        // echo json_encode($response);
        return $response;
    }

    return array("success"=>"1");
}

function getIDOfTeam($teamname){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    $qry = "SELECT team_id FROM teams WHERE name=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("s", $teamname);

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
        // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
        // $response[] = $currentPick;
        $response['team_id'] = $row['team_id'];
    }

    return $response;
}

function getIDOfBracket($bracket_name, $user_id){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    $qry = "SELECT bracket_id FROM brackets WHERE name=? AND user=?";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("si", $bracket_name, $user_id);

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
        // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
        // $response[] = $currentPick;
        $response['bracket_id'] = $row['bracket_id'];
    }

    return $response;
}

function getIDOfUser($username){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    $qry = "SELECT user_id FROM users WHERE username=?";
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
        // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
        // $response[] = $currentPick;
        $response['user_id'] = $row['user_id'];
    }

    return $response;
}

function createBracket($username, $bracket_name){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // get user's ID
    $user_id_response = getIDOfUser($username);
    if(array_key_exists("error", $user_id_response)){
        return $user_id_response;
    }
    $user_id = $user_id_response['user_id'];

    // get bracket's ID (check to see if it already exists)
    $bracket_id_response = getIDOfBracket($bracket_name, $user_id);
    if(array_key_exists("error", $bracket_id_response)){
        return $bracket_id_response;
    }
    $bracket_id = $bracket_id_response['bracket_id'];

    if(!($bracket_id == null)){
        return array("error"=>"Bracket already exists");
    }


    $qry = "INSERT INTO brackets (name, user) VALUES (?,?)";
    $stmt = $mysqli->prepare($qry);
    $stmt->bind_param("si", $bracket_name, $user_id);



    // execute statement
    if (!$stmt->execute()){
        $response["error"] = $mysqli->error;
        $response["error"] .= "statement failed to execute";
        // echo json_encode($response);
        return $response;
    }

    // return bracket_id at the end
    $bracket_id_response = getIDOfBracket($bracket_name, $user_id);
    if(array_key_exists("error", $bracket_id_response)){
        return $bracket_id_response;
    }
    $bracket_id = $bracket_id_response['bracket_id'];


    return array("status"=>"Bracket successfully added", "bracket_id"=>$bracket_id);
}

function checkIfBracketExists($username, $bracket_name){
    // get user's ID
    $user_id_response = getIDOfUser($username);
    if(array_key_exists("error", $user_id_response)){
        return $user_id_response;
    }
    $user_id = $user_id_response['user_id'];

    // get bracket's ID (check to see if it already exists)
    $bracket_id_response = getIDOfBracket($bracket_name, $user_id);
    if(array_key_exists("error", $bracket_id_response)){
        return $bracket_id_response;
    }
    $bracket_id = $bracket_id_response['bracket_id'];

    // print "userid: ".$user_id."\n";
    // print "bracket_id: ".$bracket_id;

    if(!($bracket_id == null)){
        return array("status"=>"Bracket already exists", "taken"=>1);
    }

    return array("status"=>"Bracket name is available", "taken"=>0);
}

function updateGames($input){
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // parse for team1 name
    // TODO
    $team1_name = "";

    // parse for team2 name
    // TODO
    $team2_name = "";

    // get team1 id
    $team1_id_response = getIDOfTeam($team1_name);
    if(array_key_exists("error", $team1_id_response)){
        return $team1_id_response;
    }
    $team1_id = $team1_id_response['team_id'];
    // get team2 id
    $team2_id_response = getIDOfTeam($team2_name);
    if(array_key_exists("error", $team2_id_response)){
        return $team2_id_response;
    }
    $team2_id = $team2_id_response['team_id'];

    // TODO Should I have the lower id always be team1?

    // for each row in input...
        $round = ""; // TODO
        $region = ""; // TODO
        $team1score = ""; // TODO
        $team2score = ""; // TODO
        $status = ""; // TODO
        $winner = ""; // TODO (the actual string name)
        $winner_id = 0;
        if($winner == $team1_name){
            $winner_id = $team1_id;
        }
        else{
            $winner_id = $team2_id;
        }

        $qry = "INSERT INTO games (round, region, team1, team2, team1score, team2score, status, winner) ";
        $qry .= "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $mysqli->prepare($qry);
        $stmt->bind_param("isiiiiii", $round, $region, $team1_id, $team2_id, $team1_score, $team2_score, $status, $winner_id);

        // execute statement
        if (!$stmt->execute()){
            $response["error"] = $mysqli->error;
            $response["error"] .= "statement failed to execute";
            // echo json_encode($response);
            return $response;
        }

}

function getBracketsForUser($username){
    // return bracket names and ids
    $response = array();
    $mysqli = getMysqliObject();

    // Check for and return connection errors
    if ($mysqli->connect_errno){
        $response["error"] = "Failed to connect";
        $response["error"] .= $mysqli->error;
        return $response;
    }

    // get user's ID
    $user_id_response = getIDOfUser($username);
    if(array_key_exists("error", $user_id_response)){
        return $user_id_response;
    }
    $user_id = $user_id_response['user_id'];

    $qry = "SELECT bracket_id, name, username FROM brackets, users ";
    $qry .= "WHERE brackets.user=users.user_id AND username=?";
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
        // $currentPick = array("game"=>$row['game'], "winner"=>$row['winner']);
        // $response[] = $currentPick;
        $response[$row['bracket_id']] = $row['name'];
    }

    return (object)$response;

}


// TESTING ====
// print json_encode(getPicksForBracketIDRoundAndRegion(1, 0, "00"));
// print_r(getPicksForBracketIDRoundAndRegion(1, 1, "00"));
// print json_encode(getPicksForBracketIDRoundAndRegion(1, 1, "00"));

// print json_encode(getNameOfBracketWithID(1));
// print json_encode(getUsernameAssociatedWithBracketID(1));
// print_r (getNameOfBracketWithID(1));
// print_r (getUsernameAssociatedWithBracketID(1));

//print json_encode(getPicksForBracketIDRegion(1, "00"));

// print json_encode(getPicksForBracketID(1))

// print json_encode(getBracketData(1));

// print_r (getIDOfTeam("North Carolina"));

// print_r (getIDOfBracket("bestbracket", 0));

// print_r(getIDOfUser("user128"));

// print_r(removeEntriesForBracket(1));

// createBracket($user11, "best bracket ever!");
// createBracket($user11, "bestbracket");

// print_r (checkIfBracketExists("user11", "bestbracket"));

// print json_encode(getBracketsForUser("user11"));
?>
