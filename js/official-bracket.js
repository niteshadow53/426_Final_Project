$(window).on('load', function(){

    var vars = window.location.search.split('?');
    bid = vars[1].split("=")[1];

    var bData = {
        '00': 'p00.json',
        '01': 'p01.json',
        '10': 'p10.json',
        '11': 'p11.json',
        'ff': 'pff.json'
    };

    realdata = {
        '00': {},
        '01': {},
        '10': {},
        '11': {},
        'ff': {}
    };

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
                //console.log(data);
                for (var i in data['rounds']){
                    data['rounds'][i] = data['rounds'][i]['games']
                }
                realdata[key] = data['rounds'];
                //console.log(jdata);
            },
            complete: function(jqXHR, textStatus){
                //console.log(jqXHR);
                //console.log(textStatus);
            }
        });
    
    }

    // console.log(realdata);

    for (key in bData){
        var limit = (key == 'ff')? 2 : 4;
        for (var k2 in realdata[key]){
            if(k2 != 0){
                for(var k3 in realdata[key][k2]){
                    realdata[key][k2][k3] = null;
                }   
            }
        }
    }
    
    // console.log(realdata);
    
    var picks ={
        'bracket': {},
        'user': {},
        'bracketName': {}
    };
    var leftToPick = 0;
    $.ajax({
        async: false,
        type: "GET",
        url: 'http://localhost:8888/426_final_project/php/Brackets.php?id=' + bid,
        contentType: "text/plain",
        error: function(jqXHR, textStatus, errorThrown){
            //console.log(jqXHR);
            //console.log("Status: " + textStatus);
            //console.log("Error: " + errorThrown);
        },
        success: function (data) {
            //console.log(data);
            jdata = JSON.parse(data);
            //console.log(jdata);
            reg00 = jdata['bracket']['00'];
            reg01 = jdata['bracket']['01'];
            reg10 = jdata['bracket']['10'];
            reg11 = jdata['bracket']['11'];
            regff = jdata['bracket']['ff'];
            bracketData = {
                '00': reg00,
                '01': reg01,
                '10': reg10,
                '11': reg11,
                'ff': regff
            }


            for (key in bracketData){
                limit = (key == 'ff') ? 2 : 4;
                for (var i  = 0; i < limit; i++){
                    for(var j = 0; j < 2**(limit - i); j += 2){
                        if (bracketData[key][i][j] === undefined){
                            bracketData[key][i][j] = ' ';
                        }
                            picks['bracket'][key + i + j] = bracketData[key][i][j];
                    }
                }
            }

            for (key in bracketData){
                //console.log(key);
                if (key == 'ff'){
                    //console.log('hi');
                }
                limit = (key == 'ff') ? 2 : 4;
                //realdata[key] = {};
                for (var i  = 0; i < limit; i++){
                    if(key == 'ff') {
                        //console.log('hi');
                    }
                    /*if(i == 0 && key != 'ff'){
                        realdata[key][i.toString()] = {};
                    }*/
                    //realdata[key][(i+1).toString()] = {};
                    if(i + 1 == 4){
                        realdata['ff']['0'] = {};
                    }
                    for(var j = 0; j < 2**(limit - i); j += 4){
                        /*if(i == 0 && key != 'ff'){
                            t1 = new Team({
                                'name': ""
                            });
                            t2 = new Team({
                                'name': ""
                            });
                            for (k = 0; k < 2; k++){
                                id = "" + key + (i) + (j + 2*k);                                
                                game = new Game(generateGameDict(id,t1,t2));
                                realdata[id.substring(0,2)][id.charAt(2)][id.substring(3)] = game;        
                            }
                        }*/
                        if ((i+1) < 4){
                            t1 = new Team({
                                'name': bracketData[key][i][j]
                            });
                            t2 = new Team({
                                'name': bracketData[key][i][j + 2]
                            });
                            id = "" + key + (i+1) + (j/2);
                            //console.log(id);
                            game = new Game(generateGameDict(id,t1,t2));
                            if(key == 'ff' && i+1 > 1){
                                realdata['ff'][(i+1)] = {};
                                realdata['ff'][(i+1)][0] = {};
                            }
                            realdata[id.substring(0,2)][id.charAt(2)][id.substring(3)] = game;    
                        } else if ((i+1) == 4){
                            t1 = new Team({
                                'name': bracketData['00'][3][0]
                            });
                            t2 = new Team({
                                'name': bracketData['10'][i][0]
                            });

                            //console.log(t1.name);
                            id = "ff0" + (j/2);
                            //console.log(id + "t1: " + t1.name + " | " + t2.name);
                            game = new Game(generateGameDict(id,t1,t2));
                            realdata['ff']['0']['0'] = game;  
                            t1 = new Team({
                                'name': bracketData['01'][3][0]
                            });
                            t2 = new Team({
                                'name': bracketData['11'][3][0]
                            });

                            //console.log(t1.name);
                            id = "ff02"
                            //console.log(id + "t1: " + t1.name + " | " + t2.name);
                            game = new Game(generateGameDict(id,t1,t2));
                            realdata['ff'][0][2] = game;
                            //console.log(realdata['ff']);
                        }
                    }
                }
            }
            //console.log(realdata);
            generateBracket(realdata, true);
        },
        complete: function(jqXHR, textStatus){
            //console.log(jqXHR);
            //console.log(textStatus);
        }
    });

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
        var bracket_name;
        $.ajax({
            async: false,
            type: 'POST',
            url: 'http://localhost:8888/426_final_project/php/Brackets.php/getBracketsForUser',
            data: {
                'username': 'user11'
            },
            success: function(data){
                brackets = JSON.parse(data);
                bracket_name = brackets[bid];
                console.log(bracket_name);
                alert("Picks Successfully Saved");
            }
        });


        picks['name'] = $("#bracket-name").val();
        postdata = JSON.stringify(picks);

        console.log(postdata);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/426_final_project/php/Brackets.php/',
            data: {
                'bracket': JSON.stringify(picks['bracket']),
                'name': bracket_name,
                'user': 'user11'
            },
            success: function(data){
                console.log(data);
            },
            error: function(jqXHR, exception){
                console.log(jqXHR);
                console.log(exception);
            }
        });
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




    /*var bData = {
        '00': '00.json',
        '01': '01.json',
        '10': '10.json',
        '11': '11.json',
        'ff0': 'ff0.json',
        'ff1': 'ff1.json',
        'ff': 'ff.json'
    }
    generateBracket(bData, false);*/
});