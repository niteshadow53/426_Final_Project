$(document).ready(function(){
    var user = '';
    
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost:8888/426_final_project/php/login.php/getAuthenticatedUser',
        success: function(data){
            jdata = JSON.parse(data);
            user = jdata['username'];
        },
        error: function(a,b){
            console.log(a);
        }
    });
    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8888/426_final_project/php/Brackets.php/getBracketsForUser',
        data: {
            'username': user
        },
        success: function(data){
            console.log(data);
            brackets = JSON.parse(data);
            console.log(brackets);
            generateTable(brackets);
        }
    });
        
});

function generateTable(brackets){
    var alt = false;
    for(key in brackets){
        console.log(alt);
        if(alt){
            $("#bracket-table > tbody:last-child").append("<tr class='bracket-entry alt'><td><a href='bracket-viewer.html?bracket_id="+key+"'>" + brackets[key] + "</a></td></tr>");            
            alt = false;
        } else {
            $("#bracket-table > tbody:last-child").append("<tr class='bracket-entry'><td><a href='bracket-viewer.html?bracket_id="+key+"'>" + brackets[key] + "</a></td></tr>");            
            alt = true;
        }
    }
}