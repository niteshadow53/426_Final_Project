
function register(){
    // get the username and password from the text fields
    var username_text = $("#register .username").value;
    var passwd_text = $("#register .password").value;

    console.log(username_text);
    console.log(passwd_text);
    
    // hash the password with sha256

    // make a data object with the following structure:
    // data: {username: xxx, hashed_password: xxx}

};