$(document).ready(function(){
    var bData = {
        '00': 'p00.json',
        '01': 'p01.json',
        '10': 'p10.json',
        '11': 'p11.json',
        'ff': 'pff.json'
    };
    var picks = {
        'name': 'bracket_name',
        'user': 'username',
        'bracket': {}
    };

    var leftToPick = 64;

    for (key in bData){
        var limit = (key == '00' || key == '01' || key == '10' || key == '11') ? 4 : 2;
        for(var i = 0; i < limit; i++){
            for (var j = 0; j < 2**(limit - i); j+=2){
                bkey = key + i.toString() + j.toString();
                picks['bracket'][bkey] = null;
            }
        }
    }

    realData = {
        '00': {},
        '01': {},
        '10': {},
        '11': {},
        'ff': {}
    }

    for (key in bData){
        $.ajax({
            async: false,
            type: "GET",
            url: bData[key],
            contentType: "text/plain",
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            success: function (data) {
                console.log(data);
                for (var i in data['rounds']){
                    data['rounds'][i] = data['rounds'][i]['games']
                }
                realData[key] = data['rounds'];
                //console.log(jdata);
            },
            complete: function(jqXHR, textStatus){
                //console.log(jqXHR);
                //console.log(textStatus);
            }
        });
    
    }

    console.log(realData);
    generateBracket(realData, true);
    $('.region').on('click', '.pickable', function(){
        var isThisTeamOne = $(this).hasClass('teamOne');
        var gameid = $($($(this).parent()).parent()[0]).attr('id');
        var nextGame = calculateNextGame(gameid);
        winner = $(this).find('.team')[0].textContent;
        if (nextGame == null){
                picks['bracket']['ff10'] = winner;
        } else {
            var nextGameId = nextGame[0];
            var isTeamOne = nextGame[1];    
            if(isTeamOne){
                currentWinner = $($("#"+nextGameId).find('.teamOne')).find('.team')[0].textContent;
                removeEntries(currentWinner, winner, gameid, isThisTeamOne);
                $($("#"+nextGameId).find('.teamOne')).find('.team')[0].textContent = winner;
            } else {
                currentWinner = $($("#"+nextGameId).find('.teamTwo')).find('.team')[0].textContent;
                removeEntries(currentWinner, winner, gameid, isThisTeamOne);    
                $($("#"+nextGameId).find('.teamTwo')).find('.team')[0].textContent = winner;            
            }
            key = gameid.substring(0,2) + gameid.charAt(2) + gameid.substring(3);
            picks['bracket'][key] = winner;
        }
        if(leftToPick > 0){
            leftToPick--;
        }
        console.log(leftToPick);
    });

    $("#submit-picks").click(function(){
        console.log(leftToPick);            
        if(leftToPick > 0){
            alert("Bracket incomplete");
        } else {
            postdata = JSON.stringify(picks);
            console.log(postdata);
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8888/php/Brackets.php',
                data: postdata,
                contentType: 'text/plain',
                success: function(data){
                    console.log(data);
                }
            });
        }
    });

    function calculateNextGame(gameId){
        if(gameId == 'ff10'){
            return null;
        }
        var gameNum = parseInt(gameId.substring(3));
        var isTeamOne = (gameNum % 4 == 0) ? true : false;
        var nextGameNum = (isTeamOne) ? gameNum : gameNum - 2;
        nextGameNum = 2*(nextGameNum / 4);
        var nextGamePrefix = ($("#"+gameId).attr('id').substring(0,2) == 'ff') ? 'ff' : $($("#"+gameId).parent()[0]).attr('id');
        nextGameRegion = nextGamePrefix.substring(0,2);
        nextGameRound = parseInt(nextGamePrefix.charAt(2)) + 1;
        if(nextGameRound == 4){
            fNum = parseInt(gameId.charAt(0));
            nextGameNum =  (parseInt(nextGamePrefix.charAt(1)) * 2).toString();
            nextGamePrefix = 'ff0';
            isTeamOne = (fNum == 0) ? true : false;
        } else if (nextGameRegion == 'ff'){
            nextGameId = 'ff10';
        } else {
            nextGamePrefix = nextGamePrefix.substring(0,2) + (parseInt(nextGamePrefix.charAt(2)) + 1).toString();            
        }
        var nextGameId = (nextGameId == 'ff10') ? nextGameId : nextGamePrefix + nextGameNum;
        return [nextGameId, isTeamOne];
    }

    function removeEntries(team, newTeam, startingPoint, isTeamOne){
        pageTeam = team;
        while(pageTeam != newTeam && pageTeam != ""){
            var key = startingPoint.substring(0,2) + startingPoint.charAt(2) + startingPoint.substring(3);
            picks['bracket'][key] = null;
            if(leftToPick < 63){
                leftToPick++;                
            }
            nextGame = calculateNextGame(startingPoint);
            startingPoint = nextGame[0];
            console.log(startingPoint);
            isTeamOne = nextGame[1];
            oldPageTeam = pageTeam;
            if(isTeamOne){
                pageTeam = $($("#"+startingPoint).find('.teamOne')).find('.team')[0].textContent                
            } else {
                pageTeam = $($("#"+startingPoint).find('.teamTwo')).find('.team')[0].textContent   
            }
            if(isTeamOne){
                $($("#"+startingPoint).find('.teamOne')).find('.team')[0].textContent = '';
            } else {
                $($("#"+startingPoint).find('.teamTwo')).find('.team')[0].textContent = '';            
            }
            key = startingPoint.substring(0,2) + startingPoint.charAt(2) + startingPoint.substring(3);
            if(pageTeam != picks['bracket'][key]){
                return;
            }
        }
        
    }
});