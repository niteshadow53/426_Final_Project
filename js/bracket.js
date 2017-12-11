GameStates = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    FINISHED: 2
}

function Team(jsonObj){
    this.name = jsonObj.name;
    this.nickname = jsonObj.nickname;
    this.img = jsonObj.img;
    this.bgcolor = jsonObj.bgcolor;
    this.textcolor = jsonObj.textcolor;
    this.rank = jsonObj.rank;
}

function Game(jsonObj){
    this.team1 = jsonObj.team1;
    this.team2 = jsonObj.team2;
    this.id = jsonObj.id;
    this.round = jsonObj.round;
    this.region = jsonObj.region;
    this.status = jsonObj.status;
    this.score = jsonObj.score;

}
Game.prototype.getWinner = function(){
    if (this.score.team1Score > this.score.team2Score){
        return this.team1;
    } else {
        return this.team2;
    }
}

Game.prototype.updateScore = function(a, b){
    this.score.team1Score = a;
    this.score.team2Score = b;
}

function generateBracket(data, pickable){
    for (key in data){
        generateRegion(key, data[key], pickable)
    }
}

function generateRegion(coords, rounds, pickable){
    id = "#region-"+coords;
    if (rounds.length === undefined){
        for(var i in rounds){
            if(coords == 'ff' && i < 2){
                generateRound(id, rounds[i], coords, i, pickable);
                $("#ff02").before($("#ff10"));
            } else if (coords == 'ff' && i >= 2){
                console.log(rounds[i]);
            } else {
                generateRound(id, rounds[i], coords, i, pickable);
            }
        }
    } else {
        for(var i = 0; i < rounds.length; i++){
            if(coords == 'ff'){
                generateRound(id, rounds[i], coords, i, pickable);
                $("#ff02").before($("#ff10"));
            } else {
                generateRound(id, rounds[i], coords, i, pickable);
            }
        }
    }
}


function generateGameDict(gameId, team1 = null, team2 = null){
    var re = gameId.substring(0, 2);
    var ro = gameId.substring(2,3);
    t1 = (team1 == null) ? generateNullTeam() : team1;
    t2 = (team2 == null) ? generateNullTeam() : team2;
    game = {
        team1: t1,
        team2: t2,
        id: gameId,
        round: ro,
        region: re,
        status: GameStates.NOT_STARTED,
        score: {
            team1Score: 0,
            team2Score: 0
        }
    };
    return game;

}

function generateNullGame(gameId){
    return new Game(generateGameDict(gameId));
}

function generateNullTeam(){
    var team = {
        name: "",
        nickname: "",
        img: "",
        bgcolor: "black",
        textcolor: "white",
        rank: 0
    };
    return new Team(team);
}

function generateRound(id, games, region, round, pickable){
    var firstRound = [];
    var roundId = ""+region+round;
    var isChamp = false;
    if (region == "ff"){
        if(roundId == 'ff2'){
            var roundDiv = "<div class='row'><div id='" + roundId + "' class=champion></div></div>";
            isChamp = true;
        } else {
            var roundDiv = "<span id='"+roundId+"' class='round'></div>";                
        }
    } else {
        var roundDiv = "<div id='"+roundId+"' class='round'></div>";
    }
    if (region == "00" || region == "10" || region == "ff0" || region == "ff1" || region == "ff"){            
        $(id).append(roundDiv);
    } else {
        $(id).prepend(roundDiv);
    }
    if (region == "00" || region == "01"){
        roundLabel = generateRoundLabel(round);
        $("#"+roundId).append(roundLabel);
    } else {
        roundLabel = generateRoundLabel(4);
        $("#"+roundId).append(roundLabel);    
    }

    for (var key in games){
        if(games.hasOwnProperty(key)){
            if(games[key] != null){
                var team1 = games[key].team1;
                var team2 = games[key].team2;
                bracketGame = new Game(games[key]);
                addGame(bracketGame, "#"+roundId, region, pickable, isChamp);
                firstRound.push(bracketGame);
            }
        }
    }

    /*for (var game of games){
        var team1 = game.team1;
        var team2 = game.team2;
        bracketGame = new Game(game);
        addGame(bracketGame, "#"+roundId, region, pickable);
        firstRound.push(bracketGame);
    }*/
    return firstRound;
}

function generateNextRound(games, id, round, region){
    var nextRound = [];
    var numGames = 2**(3-round);
    var roundId = ""+region+round;
    var roundDiv = "<div id='"+roundId+"' class='round'></div>";
    if (region == "00" || region == "10"){
        $(id).append(roundDiv);
    } else {
        $(id).prepend(roundDiv);
    }
    if (region == "00" || region == "01"){
        roundLabel = generateRoundLabel(round);
        $("#"+roundId).append(roundLabel);    
    } else {
        roundLabel = generateRoundLabel(-1);
        $("#"+roundId).append(roundLabel);    
    }
    for (i = 0; i < games.length; i+=2){
        var gameId = ""+region+round+i;
        if(games[i].status == GameStates.FINISHED && games[i+1].status == GameStates.FINISHED){
            var gameDict = generateGameDict(gameId, games[i].getWinner(), games[i+1].getWinner());
            var game = new Game(gameDict);
            addGame(game, "#"+roundId, region, games[i], games[i+1]);
            nextRound.push(game);
        } else if (games[i].status == GameStates.FINISHED && games[i+1].status != GameStates.FINISHED){
            var gameDict = generateGameDict(gameId, games[i].getWinner(), null);
            new Game(gameDict);
            //game.status = GameStates.NOT_STARTED;                
            addGame(game, "#"+roundId, region, games[i], games[i+1]);
            nextRound.push(game);    
        } else if (i < games.length && (games[i].status != GameStates.FINISHED && games[i+1].status == GameStates.FINISHED)){
            var gameDict = generateGameDict(gameId, null, games[i+1].getWinner());
            var game = new Game(gameDict);
            //game.status = GameStates.NOT_STARTED;
            addGame(game, "#"+roundId, region, games[i], games[i+1]);
            nextRound.push(game);    
        } else {
            var game = generateNullGame(gameId);
            addGame(game, "#"+roundId, region, games[i], games[i+1]);
            nextRound.push(game);    
        }
    }
    for(i = nextRound.length; i < nextRound.length; i++){
        var gameId = "#"+region+round+i;
        var game = generateNullGame(gameId);
        game.status = GameStates.NOT_STARTED;
        addGame(game, "#"+roundId, region, games[i], games[i+1])
        nextRound.push(game);
    }
    return nextRound;
}

function addGame(game, id, region, pickable, isChamp, prevOne = null, prevTwo = null){
    if(isChamp){
        $(id).append(generateChamp(game, region, pickable));                
    } else {
        if (region == "ff"){
            $(id).append(generateGame(game, region, pickable));        
        } else {
            $(id).append(generateGame(game, region, pickable) + "<br>");
        }
        var width = Math.min($("#bracket").width() / 8 - 20, 160);
        $("#"+game.id).width(width);    
    }

    /*$("#"+game.id + " tr.teamOne").css({
        'background-color': game.team1.bgcolor,
        'color': game.team1.textcolor
    })
    $("#"+game.id + " tr.teamTwo").css({
        'background-color': game.team2.bgcolor,
        'color': game.team2.textcolor
    })*/
}

function generateRoundLabel(round){
    var roundLabel = "";
    switch(round){
        case 0:
            roundLabel = "First Round";
            break;
        case 1:
            roundLabel = "Second Round";
            break;
        case 2:
            roundLabel = "Sweet Sixteen";
            break;
        case 3:
            roundLabel = "Elite Eight";
            break;
        case 4:
            roundLabel = "";
            break;
        default:
            roundLabel = "Final Four";
    }
    html = "<h4 class='round-label'>"+roundLabel+"</h4>";
    return html;
}

function generateGame(game, region, pickable){
    html = "<table class='game' id='"+game.id + "'>";
    if (region == "01" || region == "11"){
        if(pickable){
            html += "<tr class='teamOne pickable'><td class='score left'>" + game.score.team1Score + "</td><td class='team'>" + game.team1.name + "</td></tr>";
            html += "<tr class='teamTwo pickable'><td class='score left'>" + game.score.team2Score + "</td><td class='team'>" + game.team2.name + "</td></tr>";    
        } else {
            html += "<tr class='teamOne'><td class='score left'>" + game.score.team1Score + "</td><td class='team'>" + game.team1.name + "</td></tr>";
            html += "<tr class='teamTwo'><td class='score left'>" + game.score.team2Score + "</td><td class='team'>" + game.team2.name + "</td></tr>";    
        }
    } else {
        if (pickable){
            html += "<tr class='teamOne pickable'><td class='team'>" + game.team1.name + "</td><td class='score right'>" + game.score.team1Score + "</td></tr>";
            html += "<tr class='teamTwo pickable'><td class='team'>" + game.team2.name + "</td><td class='score right'>" + game.score.team2Score + "</td></tr>";    

        } else {
            html += "<tr class='teamOne'><td class='team'>" + game.team1.name + "</td><td class='score right'>" + game.score.team1Score + "</td></tr>";
            html += "<tr class='teamTwo'><td class='team'>" + game.team2.name + "</td><td class='score right'>" + game.score.team2Score + "</td></tr>";        
        }
    }
    html += "</table>";
    return html;
}

function generateChamp(game, region, pickable){
    html = "<table class='game' id='"+game.id + "'>";
    html += "<tr class='teamOne pickable'><td class='team'>National Champion</td></tr>";    
    html += "<tr class='teamTwo pickable'><td class='team'>" + game.team1.name + "</td></tr>"; 
    /*if (region == "01" || region == "11"){
        if(pickable){
            html += "<tr class='teamOne pickable'><td class='score left'>" + game.score.team1Score + "</td><td class='team'>National Champion</td></tr>";
            html += "<tr class='teamTwo pickable'><td class='score left'>" + game.score.team2Score + "</td><td class='team'>" + game.team1.name + "</td></tr>";    
        } else {
            html += "<tr class='teamOne'><td class='score left'>" + game.score.team1Score + "</td><td class='team'>" + game.team1.name + "</td></tr>";
            html += "<tr class='teamTwo'><td class='score left'>" + game.score.team2Score + "</td><td class='team'>" + game.team2.name + "</td></tr>";    
        }
    } else {
        if (pickable){
            html += "<tr class='teamOne pickable'><td class='team'>" + game.team1.name + "</td><td class='score right'>" + game.score.team1Score + "</td></tr>";
            html += "<tr class='teamTwo pickable'><td class='team'>" + game.team2.name + "</td><td class='score right'>" + game.score.team2Score + "</td></tr>";    

        } else {
            html += "<tr class='teamOne'><td class='team'>" + game.team1.name + "</td><td class='score right'>" + game.score.team1Score + "</td></tr>";
            html += "<tr class='teamTwo'><td class='team'>" + game.team2.name + "</td><td class='score right'>" + game.score.team2Score + "</td></tr>";        
        }
    }*/
    html += "</table>";
    return html;
}