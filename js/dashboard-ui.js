
$(document).ready(function(){
    function Team(name){
        this.name = name;
    }
    
    function Game(team1, team2, id, round){
        this.team1 = team1;
        this.team2 = team2;
        this.id = id;
        this.round = round;
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
    var teamNames = [
        'Boston College', 
        'Clemson', 
        'Florida State', 
        'Louisville', 
        'NC State',
        'Notre Dame',
        'Syracuse',
        'Wake Forest',
        'Duke',
        'Georgia Tech',
        'Miami',
        'North Carolina',
        'Pittsburgh',
        'Virginia',
        'Virginia Tech',
        'DK Explorers'];
    var teams = [];
    var firstRound = [];
    var secondRound = [];
    var thirdRound = [];
    for (i in teamNames){
        teams.push(new Team(teamNames[i]));
    }

    firstRound = generateFirstRound(teams);
    secondRound = generateNextRound(firstRound, 1);
    thirdRound = generateNextRound(secondRound, 2);
    lastRound = generateNextRound(thirdRound, 3);

    // for (i = 0; i < 16; i += 2){
    //     game = new Game(teams[i], teams[i+1], "0" + i, 0);
    //     score1 = Math.floor(Math.random() * (30) + 60);
    //     score2 = Math.floor(Math.random() * (30) + 60);
    //     game.updateScore(score1, score2);
    //     addGame(game);
    //     firstRound.push(game);
    // }

    // console.log(games);
    // for (i = 0;  i < firstRound.length; i+=2){
    //     game = new Game(games[i].getWinner(), games[i+1].getWinner(), "1" + i, 1);
    //     score1 = Math.floor(Math.random() * (30) + 60);
    //     score2 = Math.floor(Math.random() * (30) + 60);
    //     game.updateScore(score1, score2);
    //     addGame(game, games[i], games[i+1]);
    //     secondRound.push(game);
    // }

    function generateFirstRound(teams){
        var firstRound = [];
        for (i = 0; i < teams.length; i+= 2){
            game = new Game(teams[i], teams[i+1], "0" + i, 0);
            score1 = Math.floor(Math.random() * (30) + 60);
            score2 = Math.floor(Math.random() * (30) + 60);
            game.updateScore(score1, score2);
            addGame(game);
            firstRound.push(game);
        }
        return firstRound;
    }
    
    function generateNextRound(games, round){
        var nextRound = [];
        for (i = 0; i < games.length; i+=2){
            game = new Game(games[i].getWinner(), games[i+1].getWinner(), ""+ round + i, round);
            score1 = Math.floor(Math.random() * (30) + 60);
            score2 = Math.floor(Math.random() * (30) + 60);
            game.updateScore(score1, score2);
            addGame(game, games[i], games[i+1]);
            nextRound.push(game);
        }
        return nextRound;
    }

    function addGame(game, prevOne = null, prevTwo = null){
        $("#bracket-area").append(generateGame(game) + "<br>");
        if (prevOne != null && prevTwo != null){
                prevOnej = $("#"+prevOne.id);
                prevTwoj = $("#"+prevTwo.id);
                vPos = Math.floor((prevTwoj.offset().top - prevOnej.offset().top) / 2) + Math.floor(prevOnej.offset().top) - 5;
                hPos = 170*game.round;
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