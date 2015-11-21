var boxopened = "";
var imgopened = "";
var count = 0;
var found =  0;

function myRandom(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
    var children = $("#cards").children();
    var child = $("#cards div:first-child");
    var images_table = new Array();

    var i = 0;
    while (child.attr("id") != undefined) {
        images_table[++i] = $("#"+child.attr("id")+" img").attr("src");
        child = child.next();
    }

    var child = $("#cards div:first-child");

    while (images_table != "") {
        randIndex = myRandom(images_table.length - 1, 0);

        $("#"+child.attr("id")+" img").attr("src", images_table[randIndex]);
        images_table.splice(randIndex, 1);

        child = child.next();
    }
}

function resetGame() {
    shuffle();
    $("img").hide();
    count = 0;
    $("#count").html("" + count);
    boxopened = "";
    imgopened = "";
    found = 0;
    return false;
}

$(document).ready(function() {
    $("img").hide();
    $("#cards div").click(openCard);

    shuffle();

    function openCard() {

        id = $(this).attr("id");

        if ($("#"+id+" img").is(":hidden")) {
            $("#cards div").unbind("click", openCard);
            $("#"+id+" img").fadeIn('fast');

            if (imgopened == "") {
                boxopened = id;
                imgopened = $("#"+id+" img").attr("src");
                setTimeout(function() {
                    $("#cards div").bind("click", openCard)
                }, 300);
            } else {
                currently_opened = $("#"+id+" img").attr("src");
                if (imgopened != currently_opened) {
                    setTimeout(function() {
                        $("#"+id+" img").fadeOut('fast');
                        $("#"+boxopened+" img").fadeOut('fast');
                        boxopened = "";
                        imgopened = "";
                    }, 400);
                } else {
                    found++;
                    boxopened = "";
                    imgopened = "";
                }

                setTimeout(function() {
                    $("#cards div").bind("click", openCard)
                }, 400);
            }

            count++;
            $("#count").html("" + count);
        }
    }
});
