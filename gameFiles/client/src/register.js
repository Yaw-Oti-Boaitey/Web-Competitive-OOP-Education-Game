/*
This javascript holds functions and variables necessary for registering a new account
*/

function validateInput(email, password, passwordConfirm) {
let foundErrors = false;

//Check E-mail
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
if (regex.test(email)) {
    $('#player-email').removeClass("is-invalid");
} else {
    $('#player-email').addClass("is-invalid");
    foundErrors = true;
}

//Check Password
if(password.length >= 8){
    $('#player-password').removeClass("is-invalid");
} else {
    $('#player-password').addClass("is-invalid");
    foundErrors = true;
}

//Check Confirm Password
if(passwordConfirm === password){
    $('#player-password-confirm').removeClass("is-invalid");
} else {
    $('#player-password-confirm').addClass("is-invalid");
    foundErrors = true;
}

if(foundErrors == true)
    return true;
else return false;
}

$(document).ready(function () {
    $('#submitbtn').click(function(event){
        event.preventDefault();

    let username = $('#player-username').val();
    let email = $('#player-email').val();
    let password = $('#player-password').val();
    let passwordConfirm = $('#player-password-confirm').val();

    let datacheck = validateInput(email, password, passwordConfirm);

    if(!datacheck){
        $.ajax({
            url: `${window.location.origin}/register-new-user`,
            method: "POST",
            data: {username: username, email: email, password: password},
            success: function(data){
                alert("User has been created successfully");
                window.location.href = "/login"
            },
            error: function(err){
                alert(err.responseText);
            }
        });
    }
    });
})


