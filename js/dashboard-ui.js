
$(document).ready(function(){
    GameStates = {
        NOT_STARTED: 0,
        IN_PROGRESS: 1,
        FINISHED: 2
    }
    
    function Team(name, nickname = null, img = null, bgcolor = null, textcolor = null, rank = 0){
        this.name = name;
        this.nickname = nickname;
        this.img = img;
        this.bgcolor = bgcolor;
        this.textcolor = textcolor;
        this.rank = rank;
    }
    
    function Game(team1, team2, id, round, region = null){
        this.team1 = team1;
        this.team2 = team2;
        this.id = id;
        this.round = round;
        this.region = region;
        this.status = GameStates.NOT_STARTED;
        this.score = {
            team1Score: 0,
            team2Score: 0
        }
    
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
    var firstRound = [];
    var secondRound = [];
    var thirdRound = [];

    /*firstRound = generateFirstRound(teams);
    secondRound = generateNextRound(firstRound, 1);
    thirdRound = generateNextRound(secondRound, 2);
    lastRound = generateNextRound(thirdRound, 3);
    actualLastRound = generateNextRound(lastRound, 4);*/
    generateRegion("00", teams.slice(0, 16));
    generateRegion("01", teams.slice(16, 32));

    function generateRegion(coords, teams){
        id = "#region-"+coords;
        var next = generateFirstRound(id, teams, coords);
        for(var i = 1; i < 4; i++){
            next = generateNextRound(next, id, i, coords);
        }
    }

    function generateNullGame(gameId){
        var region = gameId.substring(0, 2);
        var round = gameId.substring(2,3);
        console.log(round);
        console.log(region);
        return new Game(generateNullTeam(), generateNullTeam(), round, region)
    }

    function generateNullTeam(){
        return new Team("");
    }

    function generateFirstRound(id, teams, region){
        var firstRound = [];
        for (i = 0; i < teams.length; i+= 2){
            game = new Game(teams[i], teams[i+1], region + "0" + i, 0);
            score1 = Math.floor(Math.random() * (30) + 60);
            score2 = Math.floor(Math.random() * (30) + 60);
            game.updateScore(score1, score2);
            game.status = GameStates.FINISHED;
            addGame(game, id, region);
            firstRound.push(game);
        }
        return firstRound;
    }
    
    function generateNextRound(games, id, round, region){
        var nextRound = [];
        var numGames = 2**(3-round);
        for (i = 0; i < games.length; i+=2){
            var gameId = ""+region+round+i;
            if(games[i].status == GameStates.FINISHED && games[i+1].status == GameStates.FINISHED){
                var game = new Game(games[i].getWinner(), games[i+1].getWinner(), gameId, round);
                outcome = Math.floor(Math.random() * 3);
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
                        break;  
                }
                addGame(game, id, region, games[i], games[i+1]);
                nextRound.push(game);
            } else if (games[i].status == GameStates.FINISHED && games[i+1].status != GameStates.FINISHED){
                var game = new Game(games[i].getWinner(), generateNullTeam(), gameId, round);
                game.status = GameStates.NOT_STARTED;                
                addGame(game, id, region, games[i], games[i+1]);
                nextRound.push(game);    
            } else if (i < games.length && (games[i].status != GameStates.FINISHED && games[i+1].status == GameStates.FINISHED)){
                var game = new Game(generateNullTeam(), games[i+1].getWinner(), gameId, round);
                game.status = GameStates.NOT_STARTED;
                addGame(game, id, region, games[i], games[i+1]);
                nextRound.push(game);    
            } else {
                var game = new Game(generateNullTeam(), generateNullTeam(), gameId, round);
                game.status = GameStates.NOT_STARTED;
                addGame(game, id, region, games[i], games[i+1]);
                nextRound.push(game);    
            }
        }
        for(i = nextRound.length; i < nextRound.length; i++){
            var gameId = ""+region+round+i;
            var game = generateNullGame(gameId);
            game.statuS = GameStates.NOT_STARTED;
            addGame(game, id, region, gam)
            nextRound.push(game);
        }
        return nextRound;
    }

    function addGame(game, id, region, prevOne = null, prevTwo = null){
        $(id).append(generateGame(game) + "<br>");
        var width = $(window).width() / 8 - 20;
        console.log(width);
        $("#"+game.id).width(width);
        //console.log($("#"+game.id + " tr.teamOne").css('background-color'));
        $("#"+game.id + " tr.teamOne").css({
            'background-color': game.team1.bgcolor,
            'color': game.team1.textcolor
        })
        $("#"+game.id + " tr.teamTwo").css({
            'background-color': game.team2.bgcolor,
            'color': game.team2.textcolor
        })
        if (prevOne != null && prevTwo != null){
                prevOnej = $("#"+prevOne.id);
                prevTwoj = $("#"+prevTwo.id);
                vPos = Math.floor((prevTwoj.offset().top - prevOnej.offset().top) / 2) + Math.floor(prevOnej.offset().top) - 5;                
                if (region == "00" || region == "10"){
                    hPos = (width + 20)*game.round;    
                } else {
                    hPos = prevTwoj.offset().left - width - 20;                        
                }
                $("#"+game.id).css({
                    position: 'absolute',
                    top: vPos,
                    left: hPos
                });
        }
    }
    
    function generateGame(game){
        html = "<table class='game' id='"+game.id+"'>";
        html += "<tr class='teamOne'><td>" + game.team1.name + "</td><td class='score'>" + game.score.team1Score + "</td></tr>";
        html += "<tr class='teamTwo'><td>" + game.team2.name + "</td><td class='score'>" + game.score.team2Score + "</td></tr>";
        html += "</table>";
        return html;
    }
})