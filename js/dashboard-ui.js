
$(document).ready(function(){
    function Team(name, nickname = null, img = null, bgcolor = null, textcolor = null){
        this.name = name;
        this.nickname = nickname;
        this.img = img;
        this.bgcolor = bgcolor;
        this.textcolor = textcolor;
    }
    
    function Game(team1, team2, id, round, region = null){
        this.team1 = team1;
        this.team2 = team2;
        this.id = id;
        this.round = round;
        this.region = region;
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
        new Team('South Carolina', 'Gamecocks', null, '##73000a', '#000000'),
        new Team('Tennessee', 'Volunteers', null, '#FF8200', '#ffffff'),
        new Team('Vanderbilt', 'Commodores', null, '#D8AB4C', '#ffffff'),
        new Team('Alabama', 'Crimson Tide', null, '#990000', '#eeeeee '),
        new Team('Arkansas', 'Razorbacks', null, '#9D2235', '#ffffff'),
        new Team('Auburn', 'Tigers', null, '#03244d', '#dd550c'),
        new Team('Louisiana State', 'Tigers', null, '#461D7C', '#FDD023'),
        new Team('Mississippi', 'Rebels', null, '', ''),
        new Team('Mississippi State', 'Bulldogs', null, '', ''),
        new Team('Texas A&M', 'Aggies', null, '', '')
    ];

    var firstRound = [];
    var secondRound = [];
    var thirdRound = [];

    firstRound = generateFirstRound(teams);
    secondRound = generateNextRound(firstRound, 1);
    thirdRound = generateNextRound(secondRound, 2);
    lastRound = generateNextRound(thirdRound, 3);

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