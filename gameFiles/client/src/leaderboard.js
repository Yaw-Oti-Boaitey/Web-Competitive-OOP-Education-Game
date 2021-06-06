/*
This javascript holds functions and variables necessary for getting scores
*/

let playerUsername = $('#player-username').html();

//Hides everything on the page excpet the loader
function hideEverything() {
    $('#player-leaderboard-table').hide();//Hide table by default
    $('#no-data').hide();//Hide the "No Data" message
    $('#error-occured').hide();//Hide the "Error" message
}

//Removes 'time' from the date
function removeTime(dateTime){
    let dateTimeCharList = dateTime.split('');

for(var i = 0; i < dateTimeCharList.length; i++){
    if(dateTimeCharList[i] == 'T'){
        dateTimeCharList.splice(i, 20);
        break;
    }
}

return dateTimeCharList.join('');
}

//Displays the table and the data it holds
function displayData(dbData) {
    for (i = 0; i < dbData.length; i++) {

        let row = document.createElement('tr');

        let cell1 = document.createElement('th');
        cell1.innerHTML = dbData[i].username;
        cell1.scope = 'row';

        let cell2 = document.createElement('td');
        cell2.innerHTML = dbData[i].Score;

        let cell3 = document.createElement('td');
        let date = removeTime(dbData[i].Date);
        cell3.innerHTML = date;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        $('#player-leaderboard-table tbody').append(row);
    }

    $('#player-leaderboard-table').show();
}

$(document).ready(function () {
    hideEverything();
    $('#loader').hide();

    //Show the scores for General OOP concepts
    $('#button-1').click(function () {

        hideEverything();

        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked

        $('#loader').show();//Show the loader

        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/leaderboard`,
            method: "POST",
            data: { playerUsername: playerUsername, catNum: 1 },
            success: function (data) {

                $('#loader').hide();//Hide the loader

                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }
            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })

    //Show the scores for Java
    $('#button-2').click(function () {

        hideEverything();

        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked

        $('#loader').show();//Show the loader

        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/leaderboard`,
            method: "POST",
            data: { playerUsername: playerUsername, catNum: 2 },
            success: function (data) {

                $('#loader').hide();//Hide the loader

                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }

            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })

    //Show the scores for Python
    $('#button-3').click(function () {

        hideEverything();

        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked

        $('#loader').show();//Show the loader

        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/leaderboard`,
            method: "POST",
            data: { playerUsername: playerUsername, catNum: 3 },
            success: function (data) {

                $('#loader').hide();//Hide the loader

                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }

            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })

    //Show the worldwide scores for General OOP concepts
    $('#button-1-worldwide').click(function () {
        hideEverything();

        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked

        $('#loader').show();//Show the loader

        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/worldleaderboard`,
            method: "POST",
            data: { catNum: 1 },
            success: function (data) {

                $('#loader').hide();//Hide the loader

                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }
            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })

    //Show the worldwide scores for Java
    $('#button-2-worldwide').click(function () {
        hideEverything();
    
        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked
    
        $('#loader').show();//Show the loader
    
        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/worldleaderboard`,
            method: "POST",
            data: { catNum: 2 },
            success: function (data) {
    
                $('#loader').hide();//Hide the loader
    
                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }
            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })

    //Show the worldwide scores for Python
    $('#button-3-worldwide').click(function () {
        hideEverything();
    
        $("#player-leaderboard-table tbody").empty();//Empty the table
        $(':button').prop('disabled', false);//Enable all buttons
        $(this).prop('disabled', true)//Disable the button that was just clicked
    
        $('#loader').show();//Show the loader
    
        //Get the data from the database and display it
        $.ajax({
            url: `${window.location.origin}/worldleaderboard`,
            method: "POST",
            data: { catNum: 3 },
            success: function (data) {
    
                $('#loader').hide();//Hide the loader
    
                if (data.length != 0) {
                    displayData(data);
                } else {
                    $('#no-data').show();
                }
            },
            error: function (err) {
                $('#loader').hide();//Hide the loader
                $('#error-occured').show();
            }
        });
    })
})

