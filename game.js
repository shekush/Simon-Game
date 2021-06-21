function DisplayAlert() {
    var newLine = "\r\n"
    var msg = "Rules Of the Game :-";
    msg += newLine;
    msg += "1. First Look at the button pressed by the AI.";
    msg += newLine;
    msg += "2. Remember the sequence of button been pressed.";
    msg+= newLine;
    msg += "3. You have to press the button in correct sequence each time along with the button pressed by AI on that particular level.";
    msg+= newLine;
    msg+= newLine;
    msg += "        !!!!  ENJOY  !!!!       ";
    msg+= newLine;
    msg+= newLine;
    alert(msg);
 }



var rule = false;

if(!started)
{
    DisplayAlert();  
    rule = true;
}

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false
var level = 0;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    document.getElementById("level-title").innerHTML = "Tab on the screen (except the button area) to Start The  game";
    document.getElementById("startButton").classList.remove("btnpc");
    document.getElementById("startButton").classList.add("btns");

    $(document).on("tab", function () { 

        if(!started)
        {
            $("#level-title").text("Level" + level);
            nextSequence();
            started = true;
        }
    });
    
}
else{
    $(document).keypress(function () { 

        if(!started)
        {
            $("#level-title").text("Level" + level);
            nextSequence();
            started = true;
        }
    });
}

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(".btn").on("tab", function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");


    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }    
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver(); 
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}
