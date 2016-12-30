var sportsList = ["cricket", "baseball", "soccer", "gymnastics"];
var sportSelected;




function renderButtons() {

    for (var i = 0; i < sportsList.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("sport_btn");
        newButton.attr("data-name", sportsList[i]);
        newButton.text(sportsList[i]);
        $(".btnHolder").append(newButton);
    }
}

function loadGIF() {
$(".gifHolder").show();
    $(".gifHolder").empty();
    sportSelected = $(this).attr("data-name");
    var no_of_records = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sportSelected + "&api_key=dc6zaTOxFJmzC&limit=" + no_of_records;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        for (var i = 0; i < no_of_records; i++) {

            
            var newDiv = $("<div>");

            newDiv.addClass("col-md-6 gif");


            $(".gifHolder").append(newDiv);

           var newSec=$("<section>");
           newSec.addClass("image-wrapper");
           newDiv.append(newSec);

            newSec.append("<p>Rating:" + response.data[i].rating + "</p>");
            var newImg = $("<img>");
            newImg.addClass("gifImg");
            newImg.data("gif_src", response.data[i].images.fixed_width_downsampled.url);
            newImg.data("still_src", response.data[i].images.fixed_width_still.url);
            newImg.data("gifON", false);
            newImg.attr("src", response.data[i].images.fixed_width_still.url);

            newSec.append(newImg);
            // newDiv.append("<img class='gif_img' src='"+response.data[i].images.downsized_still.url+"' alt='gif_of_"+sportSelected+"'>");

        }

    });



}

// $( "div" ).text( $( "img" ).attr( "alt" ) );



// function(){
// //     var still_src=$(this).attr("data-still_src");
// //     $(this>img).attr("src",still_src);


// // })




$(".addSportBtn").on("click", function() {
    var newSportToBeAdded = $("#new_sport").val().trim();
    if (newSportToBeAdded) {
        var newButton = $("<button>");
        newButton.addClass("sport_btn");
        newButton.attr("data-name", newSportToBeAdded);
        newButton.text(newSportToBeAdded);
        $(".btnHolder").append(newButton);
    } else {
        alert("Enter a sport to add");
    }

})

function playGIF() {
    
    if (($(this).data("gifON")) === false) {
        var gif_src = $(this).data("gif_src");

        $(this).attr("src", gif_src);
        $(this).css("border","5px solid #54E1E1");
        $(this).css("border-radius","10px");
        $(this).css("box-shadow","10px 10px 5px #888888");
        $(this).data("gifON", true);
    } else {
        var still_src = $(this).data("still_src");

        $(this).attr("src", still_src);
        $(this).css("border","none");
        $(this).css("box-shadow","none");
        $(this).data("gifON", false);

    }

}




window.onload = function() {
$(".gifHolder").hide();
    $(document).on("click", ".sport_btn", loadGIF);
    renderButtons();
   $(document).on("click", ".gifImg", playGIF);


}
