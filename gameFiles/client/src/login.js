/*
This javascript holds functions and variables necessary for logging into an account
*/

function validateInput(email, password) {
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
    if (password.length >= 8) {
        $('#player-password').removeClass("is-invalid");
    } else {
        $('#player-password').addClass("is-invalid");
        foundErrors = true;
    }

    if (foundErrors == true) return true;
    else return false;

}


$(document).ready(function () {

    $('#submitbtn').click(function(event){
        event.preventDefault();

        let email = $('#player-email').val();
        let password = $('#player-password').val();
    
        let datacheck = validateInput(email, password);
    
        if (!datacheck) {
            $.ajax({
                url: `${window.location.origin}/login`,
                method: "POST",
                data: { email: email, password: password },
                success: function (data) {
                    console.log(data)
                    window.location.href = "/";
                },
                error: function (err) {
                    alert(err.responseText);
                }
            });
    
        }
    });
    
})