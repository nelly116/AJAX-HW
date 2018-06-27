$(document).ready(function () {

    var addButton;
    //create variable to hold favorite comedy shows
    var shows = ['Always Sunny', 'Archer', 'Arrested Development', 'Eastbound and Down', 'Family Guy', 'The Last Man on Earth', 'The Office', 'Parks and Recreation', 'Scrubs', 'You\'re the Worst']

    //create a function to add buttons to the bank
    var printButton = function (buttonToAdd) {
        //new var to hold HTML for dynamically created button
        var gifButton = $('<button class="searchButton" data-value="' + buttonToAdd + '">' + buttonToAdd + '</button>')
        //append newly created button into header
        $('.buttonBank').append(gifButton);
    };

    // loop through the default bank array
    for (var i = 0; i < shows.length; i++) {
        printButton(shows[i]);
    }

    //append new buttons from search bar into header
    //create onclick event for createButton class
    $('.createButton').on('click', function () {
        //set animal button value equal to the value in the userValue ID
        addButton = $('#userValue').val().trim();
        //create variable called newButton...uses jquery to create a button element with the class searchButton and data-value of animalButton var
        printButton(addButton);
        //changes userValue input field back to blank string
        $('#userValue').val('');
    })

    //declare a blank variable for the search criteria
    var searchQuery;
    //create var for base url with query operator
    var queryURL;
    //create a future event for dynamically created searchButton fields
    $('body').on('click', '.searchButton', function () {
        //empty current contents of div
        $('.putGifsHere').empty();
        //set searchQuery variable equal to value of the button clicked
        var searchQuery = $(this).data('value');
        console.log(searchQuery);
        //store key
        var key = 'mEtRfxSjHJg6JF51Jj1P78YzhbVfKZ28';
        //set the query string to the the button clicked
        queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchQuery + '&api_key=' + key + '&limit=10';
        //call AJAX
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            //when AJAX is complete, do the following
            .done(function (response) {
                //log the data for reference
                console.log(response);
                //create a loop to run through each response in the array
                for (var i = 0; i < response.data.length; i++) {
                    //abbreviate response
                    var result = response.data[i];
                    //create an image dynamically in the document
                    var resultImage = $('<img>');
                    //set class equal to gif
                    resultImage.addClass('gif');
                    //set still image source attribute
                    resultImage.attr("src", result.images.fixed_height_small_still.url);
                    //store image attribute for a "static-image" option
                    resultImage.attr("data-still", result.images.fixed_height_small_still.url);
                    //store image attriute for an "animated-image" option
                    resultImage.attr("data-animate", result.images.fixed_height_small.url);
                    //set the default image state
                    resultImage.attr("data-state", "still");
                    //set image alt attribute
                    resultImage.attr('alt', result.slug);

                    //append image to existing putGifsHere div
                    $('.putGifsHere').append(resultImage);
                }
            });
    });

    //create click function to toggle animations; select "gif" class
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state == "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});