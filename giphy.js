//JavaScript for GifTastic Application

//Initial array of All the feels buttons
var topics = ["Happy", "Excited", "Confused", "Shocked", "Sad", "Angry", "Content", "Annoyed", "Overwhelmed"];

//Function that will take array and display items as buttons
function renderButtons () {

    //Clear the buttons before new buttons are added to ensure there are no repeats
    $(".button-display").empty();
    
    //Loop through array of topics 
    for (var i = 0; i < topics.length; i++) {

        //Generate a button for each item in the array
        var buttons = $("<button>");
        //Give each button a class
        buttons.addClass("topic");
        //Add a data-attribute with a value of the topic at index i
        buttons.attr("data-name", topics[i]);
        //Take the value of the topic at index i and display that within the button
        buttons.text(topics[i]);
        //Display buttons within the button display div
        $(".button-display").append(buttons);
    }
}
//Set up the on-click function so that each button is clickable
$(".topic").on("click", function(){

    //let newFeeling hold the value from the button and pass it into query URL
    var newFeeling = $(this).attr(".topic");

    //Set the queryURL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xFCooYB4dsiU7R308VsDj9EPZ3lahNLn&q=" + newFeeling + "&rating=g&limit=10";

    //Use Ajax API call to get the applicable gif from Giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    //Call the .then method on the return promise and pass in a callback
    .then(function(response) {

    //Get the image URL from the response
    var imageURL = response.data.images.original_still.url;
    var imageAnimated = response.data.images.original.url;

    //Create a new jQuery object for the image
    var newImage = $("<img>");

    //Set the image's still image to the image URL and add an alt-image attribute and a class of "gif"
    newImage.attr("src", imageURL);
    newImage.attr("alt", "feeling gif");
    newImage.addClass("gif");
    newImage.attr("data-state", "still");


    //Display the images in the image-results div
    $(".image-results").prepend(newImage);

    //When a gif is clicked, animate, when clicked again, pause the gif
    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", imageAnimated);
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", imageURL);
            $(this).attr("data-state", "still");
        }
    });


    });
});

//Function for when a new feeling is added
$("#search").on("click", function(event) {
    event.preventDefault();

//Take input from search-form
var searchTerm = $("#search-input").val().trim();

//Add feeling from form to topics array
topics.push(searchTerm);

renderButtons();
});

//Call renderButtons function to display initial topics array buttons
renderButtons();








    

    


    

