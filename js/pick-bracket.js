$(document).ready(function(){
    var bData = {
        '00': 'p00.json',
        '01': 'p01.json',
        '10': 'p10.json',
        '11': 'p11.json',
        'ff0': 'pff0.json',
        'ff1': 'pff1.json',
        'ff': 'pff.json'
    };
    var picks = {
        'name': 'bracket_name',
        'user': 'username',
        'bracket': {}
    };

    for (key in bData){
        picks['bracket'][key] = {};
        var limit = (key == '00' || key == '01' || key == '10' || key == '11') ? 4 : 1;
        for(var i = 0; i < limit; i++){
            picks['bracket'][key][i.toString()] = {};
            for (var j = 0; j < 2**(limit - i); j+=2){
                picks['bracket'][key][i.toString()][j.toString()] = null;
            }
        }
    }
    generateBracket(bData, true);
    $('.region').on('click', '.pickable', function(){
        var gameid = $($($(this).parent()).parent()[0]).attr('id');
        var nextGame = calculateNextGame(gameid);
        var nextGameId = nextGame[0];
        var isTeamOne = nextGame[1];
        winner = $(this).find('.team')[0].textContent;
        console.log("" + gameid.substring(0,2) + " " + gameid.charAt(2) + " " + gameid.substring(3))
        picks['bracket'][gameid.substring(0,2)][gameid.charAt(2)][gameid.substring(3)] = winner;
        if(isTeamOne){
            currentWinner = $($("#"+nextGameId).find('.teamOne')).find('.team')[0].textContent;
            removeEntries(currentWinner, nextGameId, isTeamOne);    
            $($("#"+nextGameId).find('.teamOne')).find('.team')[0].textContent = winner;
        } else {
            currentWinner = $($("#"+nextGameId).find('.teamTwo')).find('.team')[0].textContent;
            removeEntries(currentWinner, nextGameId, isTeamOne);    
            $($("#"+nextGameId).find('.teamTwo')).find('.team')[0].textContent = winner;            
        }
        console.log(picks);
    });

    $("#submit-picks").click(function(){
        data = JSON.stringify(picks);
        console.log(data);
    });

    function calculateNextGame(gameId){
        if(gameId == 'ff'){
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
            nextGamePrefix = 'ff' + nextGamePrefix.charAt(1);
            isTeamOne = (fNum == 0) ? true : false;
        } else if (nextGameRegion == 'ff'){
            gameNum = parseInt(gameId.charAt(2));
            isTeamOne = (gameNum == 0) ? true : false;
            nextGameId = 'ff';
        } else {
            nextGamePrefix = nextGamePrefix.substring(0,2) + (parseInt(nextGamePrefix.charAt(2)) + 1).toString();            
        }
        var nextGameId = (nextGameId == 'ff') ? nextGameId : nextGamePrefix + nextGameNum;
        return [nextGameId, isTeamOne];
    }

    function removeEntries(team, startingPoint, isTeamOne){
        if(isTeamOne){
            pageTeam =  $($("#"+startingPoint).find('.teamOne')).find('.team')[0].textContent;            
        } else {
            pageTeam =  $($("#"+startingPoint).find('.teamTwo')).find('.team')[0].textContent;            
        }
        while(pageTeam == team && pageTeam != ""){
            picks['bracket'][startingPoint.substring(0,2)][startingPoint.charAt(2)][startingPoint.substring(3)] = null;
            if(isTeamOne){
                $($("#"+startingPoint).find('.teamOne')).find('.team')[0].textContent = '';
            } else {
                $($("#"+startingPoint).find('.teamTwo')).find('.team')[0].textContent = '';            
            }
            nextGame = calculateNextGame(startingPoint);
            if(nextGame == null){ return }
            startingPoint = nextGame[0];
            console.log(startingPoint);
            isTeamOne = nextGame[1];
            if(isTeamOne){
                pageTeam = $($("#"+startingPoint).find('.teamOne')).find('.team')[0].textContent                
            } else {
                pageTeam = $($("#"+startingPoint).find('.teamTwo')).find('.team')[0].textContent
                
            }
        }
        
    }
});