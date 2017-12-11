$(window).on('load', function(){
    host = 'http://127.0.0.1:8888/php/Brackets.php?id=1';
    $.ajax({
        type: "GET",
        url: 'http://localhost:8888/php/Brackets.php?id=1',
        contentType: "text/plain",
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
        success: function (data) {
            console.log(data);
            jdata = JSON.parse(data);
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
                    }
                }
            }

            realdata = {'00': {},
                '01': {},
                '10': {},
                '11': {},
                'ff': {}
            };

            for (key in bracketData){
                //console.log(key);
                if (key == 'ff'){
                    console.log('hi');
                }
                limit = (key == 'ff') ? 2 : 4;
                //realdata[key] = {};
                for (var i  = 0; i < limit; i++){
                    if(i == 0){realdata[key][i.toString()] = {};}
                    realdata[key][(i+1).toString()] = {};
                    for(var j = 0; j < 2**(limit - i); j += 4){
                        if(i == 0){
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
                        }
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
                            realdata[id.substring(0,2)][id.charAt(2)][id.substring(3)] = game;    
                        }
                    }
                }
            }

            console.log(realdata);
            generateBracket(realdata, false);
        },
        complete: function(jqXHR, textStatus){
            //console.log(jqXHR);
            //console.log(textStatus);
        }
    });

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