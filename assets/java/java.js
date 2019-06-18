$(document).ready(function() {
  var subjects = [
    "Dragon Quest",
    "Monsters",
    "Roleplaying Game",
    "Warrior",
    "Treasure Chest"
  ];
  //Buttons

  //music?
  var fun = $("<img>");
  fun.attr("id", "music");
  var music = document.createElement("audio");
  music.setAttribute("src", "assets/music/dqtheme.mp3");
  fun.attr("status", "pause");
  fun.attr("src", "assets/images/speakers.jpg");
  fun.on("click", function() {
    if (fun.attr("status") === "pause") {
      music.play();
      fun.attr("src", "assets/images/pause.jpg");
      fun.attr("status", "playing");
    } else {
      fun.attr("src", "assets/images/speakers.jpg");
      music.pause();
      fun.attr("status", "pause");
    }
  });
  $(".clear2").append(fun);
  console.log(fun);

  //Clear Searches
  var clear = $("<button>").text("Clear Searches");
  clear.attr("id", "clear");
  clear.addClass("btn cookie btn-success");
  $(clear).on("click", function() {
    $(".test").empty();
    subjects = [];
  });
  $(".clear2").append(clear);

  //Clears Gifs
  var clearGifs = $("<button>").text("Clear Gifs");
  clearGifs.attr("id", "clearGifs");
  clearGifs.addClass("btn cookie btn-success");
  $(clearGifs).on("click", function() {
    $("#gifs-appear-here").empty();
  });
  $(".clear2").append(clearGifs);

  //Search
  $("#search-button").on("click", function() {
    newSubject = $("#input").val();
    if (newSubject !== "") {
      subjects.push(newSubject);
      console.log(subjects);
      test();
      $("#input").val("");
    }
  });

  //Loops through the subjects to create buttons
  function test() {
    $(".test").empty();
    for (var i = 0; i < subjects.length; i++) {
      var button = $("<button>");
      button.text(subjects[i]);
      var searchResult = subjects[i];
      button.attr("data-test", searchResult);
      console.log(button.attr("data-test"));
      button.addClass("buttonz btn btn-success");

      $(".test").append(button);
    }
    buttonsonline();
  }

  //Grabs GIFs
  function buttonsonline() {
    $(".buttonz").on("click", function() {
      var imagetest = $(this).attr("data-test");
      console.log(imagetest);
      // QueryURL
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        imagetest +
        "&api_key=kgRKvr92j8D7GLdtKVzlIrkHKdJ7yhv1&limit=10";

      // Ajax Stuff
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        // Grabs ups to 10 gifs based on the button pressed
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            gifImage.addClass("gif");

            gifImage.attr(
              "data-still",
              results[i].images.fixed_height_still.url
            );
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("src", gifImage.attr("data-still"));
            gifDiv.append(p);
            gifDiv.append(gifImage);
            console.log(gifImage.attr("class"));
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          console.log(state);
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
    });
  }

  test();
});
