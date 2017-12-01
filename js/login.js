function loginBracketUser(){
    // get the username and password from the text fields
    var username_text = $("#register .username").val();
    var passwd_text = $("#register .password").val();
    // console.log(username_text);
    // console.log(passwd_text);

    // make a data object with the following structure:
    // data: {username: xxx, password: xxx}
    var data = {username: username_text, password: passwd_text}

    var request = $.ajax({
        type: "POST",
        url: "http://localhost:8888/php/login.php", // TODO update when hosted
        data: data,
        success: function(response){
            response = JSON.parse(response);
            console.log("php response:");
            console.log(response);
            if(response.error == ""){
                console.log("User successfully logged in");
            }
            else{
                console.log("User did not successfully login. Reason:");
                console.log(response.error);
            }
        },
        error: function(xhr, status, error){
            console.log("Didn't work");
            console.log(xhr.responseText);
            console.log("status:" + status);
            console.log("error:" + status);

        }
    });

}
