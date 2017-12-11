$(document).ready(function(){
    
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