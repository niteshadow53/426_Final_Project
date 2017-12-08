$(document).ready(function(){
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
    var teams = [
        new Team('Boston College', 'Eagles', null,  '#862633', '#8B6F4E'),
        new Team('Clemson', 'Tigers', null, '#F66733', '#522D80'),
        new Team('Florida State', 'Seminoles', null, '#782F40', '#CEB888'), 
        new Team('Louisville', 'Cardinals', null, '#AD0000', '#000000'), 
        new Team('NC State', 'Wolfpack', null, '#CC0000', '#000000'),
        new Team('Notre Dame', 'Fighting Irish', null, '#0C2340', '#c99700'),
        new Team('Syracuse', 'Orange', null, '#D44500', ' #3E3D3C'),
        new Team('Wake Forest', 'Deamon Deacons', null, '#9E7E38', '#000000'),
        new Team('Duke', 'Blue Devils', null, '#001A57', '#E5E5E5'),
        new Team('Georgia Tech', 'Yellow Jackets', null, '#C59353', '#ffffff'),
        new Team('Miami', 'Hurricanes', null, '#F47321', '#005030'),
        new Team('North Carolina', 'Tar Heels', null, '#4B9CD3', '#13294B'),
        new Team('Pittsburgh', 'Panthers', null, '#1c2957', '#cdb87d'),
        new Team('Virginia', 'Cavaliers', null, '#232d4b', '#F36F21'),
        new Team('Virginia Tech', 'Hokies', null, '#8A1E41', '#EE7623'),
        new Team('Florida', 'Gators', null, '#FA4616', '#0021A5'),
        new Team('Georgia', 'Bulldogs', null, '#000000', '#BA0C2F'),
        new Team('Kentucky', 'Wildcats', null,'#0033A0','#ffffff'),
        new Team('Missouri', 'Tigers', null, '#F1B82D', '#000000'),
        new Team('South Carolina', 'Gamecocks', null, '#73000a', '#000000'),
        new Team('Tennessee', 'Volunteers', null, '#FF8200', '#ffffff'),
        new Team('Vanderbilt', 'Commodores', null, '#D8AB4C', '#ffffff'),
        new Team('Alabama', 'Crimson Tide', null, '#990000', '#eeeeee '),
        new Team('Arkansas', 'Razorbacks', null, '#9D2235', '#ffffff'),
        new Team('Auburn', 'Tigers', null, '#03244d', '#dd550c'),
        new Team('LSU', 'Tigers', null, '#461D7C', '#FDD023'),
        new Team('Mississippi', 'Rebels', null, '#C8102E', '#13294B'),
        new Team('Mississippi State', 'Bulldogs', null, '#660000', '#CCCCCC'),
        new Team('Texas A&M', 'Aggies', null, '#500000', '#ffffff'),
        new Team('Indiana', 'Hoosiers', null, '#990000', '#EDEBEB'),
        new Team('Maryland', 'Terrapins', null, '#FF0000', '#000000'),
        new Team('Michigan', 'Wolverines', null, '#00274c', '#ffcb05')
        //new Team('Michigan State', 'Spartans', null, '#18453b', '#97A2A2')
    ];

    //generateRegion("01", teams.slice(16, 32));
    var region1 = JSON.parse('{"games": [{"team1": {"name": "Villanova", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Mt St Marys", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0000", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Wisconsin", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Virginia Tech", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0002", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Virginia", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "UNCW", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0004", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Florida", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "East Tennessee St", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0006", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "SMU", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "USC", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0008", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Baylor", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "New Mexico St", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "00010", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "South Carolina", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Marquette", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "00012", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Duke", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Troy", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "00014", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}]}');
    var region2 = JSON.parse('{"games": [{"team1": {"name": "Kansas", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "UC Davis", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0100", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Miami", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Michigan St", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0102", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Iowa State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Nevada", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0104", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Purdue", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Vermont", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0106", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Creighton", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Rhode Island", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "0108", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Oregon", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Iona", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "01010", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Michigan", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Oklahoma State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "01012", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Louisville", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Jacksonville St", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "01014", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}]}');
    var region3 = JSON.parse('{"games": [{"team1": {"name": "Gonzaga", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "South Dakota State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1000", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Northwestern", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Vanderbilt", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1002", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Notre Dame", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Princeton", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1004", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "West Virginia", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Bucknell", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1006", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Maryland", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Xavier", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1008", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Florida State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "FGCU", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "10010", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "St Marys", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "VCU", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "10012", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Arizona", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "North Dakota", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "10014", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}]}');
    var region4 = JSON.parse('{"games": [{"team1": {"name": "North Carolina", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Texas Southern", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1100", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Arkansas", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Seton Hall", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1102", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Minnesota", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Middle Tennessee", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1104", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Butler", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Winthrop", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1106", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Cincinnati", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Kansas State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "1108", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "UCLA", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Kent State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "11010", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Dayton", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Wichita State", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "11012", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}, {"team1": {"name": "Kentucky", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "team2": {"name": "Northern Kentucky", "nickname": "", "img": null, "bgcolor": "black", "textcolor": "white", "rank": 0}, "id": "11014", "round": 0, "region": "00", "started": 0, "score": {"team1Score": 0, "team2Score": 0}}]}');
    generateRegion("00", region1['games']);
    generateRegion("01", region2['games']);
    generateRegion("10", region3['games']);
    generateRegion("11", region4['games']);

    function generateRegion(coords, games){
        id = "#region-"+coords;
        var next = generateFirstRound(id, games, coords);
        for(var i = 1; i < 4; i++){
            next = generateNextRound(next, id, i, coords);
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

    function generateFirstRound(id, games, region){
        var firstRound = [];
        var roundId = ""+region+"0";
        var roundDiv = "<div id='"+roundId+"' class='round'></div>";
        $(id).append(roundDiv);
        if (region == "00" || region == "01"){
            roundLabel = generateRoundLabel(0);
            $("#"+roundId).append(roundLabel);    
        } else {
            roundLabel = generateRoundLabel(-1);
            $("#"+roundId).append(roundLabel);    
        }
        for  (var game of games){
            var team1 = game.team1;
            var team2 = game.team2;
            bracketGame = new Game(game);
            addGame(bracketGame, "#"+roundId, region);
            firstRound.push(bracketGame);
        }
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
                /*outcome = Math.floor(Math.random() * 3);
                switch (outcome){
                    case 0:
                        game.status = GameStates.NOT_STARTED;
                        break;
                    case 1:
                        score1 = Math.floor(Math.random() * (30) + 60);
                        score2 = Math.floor(Math.random() * (30) + 60);
                        game.updateScore(score1, score2);
                        game.status = GameStates.IN_PROGRESS;
                        break;
                    case 2:
                    default:
                        score1 = Math.floor(Math.random() * (30) + 60);
                        score2 = Math.floor(Math.random() * (30) + 60);
                        game.updateScore(score1, score2);
                        game.status = GameStates.FINISHED
                }*/
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

    function addGame(game, id, region, prevOne = null, prevTwo = null){
        $(id).append(generateGame(game, region) + "<br>");
        var width = Math.min($("#bracket").width() / 8 - 20, 160);
        $("#"+game.id).width(width);
        $("#"+game.id + " tr.teamOne").css({
            'background-color': game.team1.bgcolor,
            'color': game.team1.textcolor
        })
        $("#"+game.id + " tr.teamTwo").css({
            'background-color': game.team2.bgcolor,
            'color': game.team2.textcolor
        })
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
            default:
                roundLabel = "";
        }
        html = "<h4 class='round-label'>"+roundLabel+"</h4>";
        return html;
    }
    
    function generateGame(game, region){
        html = "<table class='game' id='"+game.id+"'>";
        if (region == "01" || region == "11"){
            html += "<tr class='teamOne'><td class='score left'>" + game.score.team1Score + "</td><td>" + game.team1.name + "</td></tr>";
            html += "<tr class='teamTwo'><td class='score left'>" + game.score.team2Score + "</td><td>" + game.team2.name + "</td></tr>";    
        } else {
            html += "<tr class='teamOne'><td>" + game.team1.name + "</td><td class='score right'>" + game.score.team1Score + "</td></tr>";
            html += "<tr class='teamTwo'><td>" + game.team2.name + "</td><td class='score right'>" + game.score.team2Score + "</td></tr>";    
        }
        html += "</table>";
        return html;
    }
})