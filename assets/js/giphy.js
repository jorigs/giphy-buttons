$(document).ready(function() {
    var buttons = ["ROTFL", "Sarcasm", "Big Bang Theory", "The Office", "Tina Fey", "Chandler Bing", "Kittens", "Wine", "SMH", "Girl Please", "tacos", "Puppy", "SOS", "Coding", "Mr. Robot"];

    function displayGiphyButtons() {
        $("#giphyButtons").empty();
        for (var i = 0; i < buttons.length; i++) {
            var gButton = $("<button>");
            gButton.addClass("action");
            gButton.addClass("btn btn-primary");
            gButton.attr("data-name", buttons[i]);
            gButton.text(buttons[i]);
            $("#giphyButtons").append(gButton);
        }
    }

    function addNewButton() {
        $("#addButton").on("click", function() {
            var newButton = $("#action-input").val().trim();
            if (newButton === "") {
                return false;
            }
            buttons.push(newButton);
            displayGiphyButtons();
            return false;
        });
    }

    function removeAddedButton() {
        $("#removeButton").on("click", function() {
            buttons.pop(newButton);
            displayGiphyButtons();
        });
    }
    $("button").on("click", function() {
        var subject = $(this).attr("data-name")
    });

    function showGiphs() {
        var action = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryUrl);
        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                $("#viewGiphs").empty();
                var results = response.data;
                if (results == "") {
                    alert("No Giphs For This One!");
                }
                for (var i = 0; i < results.length; i++) {
                    var giphyDiv = $("<div>");
                    giphyDiv.addClass("giphDiv");
                    var giphyRating = $("<p>").html("Rating: " + results[i].rating);
                    giphyDiv.append(giphyRating);
                    // insert Giphy images
                    var giphyImage = $("<img>");
                    giphyImage.attr("src", results[i].images.fixed_height_small_still.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_small_still.url); // image is still
                    giphyImage.attr("data-animate", results[i].images.fixed_height_small.url); // makes image move
                    giphyImage.attr("data-state", "still"); // makes image still
                    giphyImage.addClass("image");
                    giphyDiv.append(giphyImage);
                    $("#viewGiphs").prepend(giphyDiv);
                }
            });
    }
    displayGiphyButtons();
    addNewButton();
    removeAddedButton();
    $(document).on("click", ".action", showGiphs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});