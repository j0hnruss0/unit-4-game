window.onload = function() {
    $(".fighter").on("click", chooseFighter);
}

function chooseFighter() {
    console.log("this is " + $(this).attr("id"));
    $("#your-char").append($(this));
    $(this).removeClass("fighter col-sm-2");
}