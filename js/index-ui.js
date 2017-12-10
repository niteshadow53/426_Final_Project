$(document).ready(function(){
    $("#registerchoice").click(function(){
        $("#options").slideUp();
        $("#register").slideDown();
    })
    $("#loginchoice").click(function(){
        $("#options").slideUp();
        $("#login").slideDown();
    })
})

// Displays an error inside a given div
// element: div to append error to
// message: error message to display
function displayError(element, message){
    $(element).append("<p class='error-message'>" + message + "</p>");
    $(element).show();
}

// Displays an error in a given div and puts a red border on an input element
// element: div to append error to
// message: error message to display
// input: input element to border in red
function displayError(element, message, input){
    $(element).append("<p class='error-message'>" + message + "</p>");
    $(element).show();
    $(input).addClass("error");
}