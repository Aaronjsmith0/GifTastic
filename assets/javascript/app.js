$(document).ready(function () {
    var topics = [];

    function displayGIF() {
        var gifs = $(this).data("search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=fzllleNYXiQPRkOHwxgK8Ryi2e9fJOid&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var showDiv = $("<div class='col-md-4'>");
                var rating = results[i].rating;
                var title = results[i].title;
                var AnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
                var p2 = $("<p>").text("Title: " + title);
                showImage.attr("src", staticSrc);
                showImage.addClass("themeGiphy");
                p.addClass("rating");
                p2.addClass("rating");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", AnimatedSrc);
                showDiv.append(showImage);
                showDiv.append(p);
                showDiv.append(p2);
                $("#gifArea").prepend(showDiv);
            }
        });
    }

    $("#addGIF").on("click", function (event) {
        event.preventDefault();
        var newGIF = $("#searchInput").val().trim();
        topics.push(newGIF);
        $("#searchInput").val('');
        displayButtons();
    });

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "buttons");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }
    displayButtons();
    $(document).on("click", "#buttons", displayGIF);
    $(document).on("click", ".themeGiphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
});