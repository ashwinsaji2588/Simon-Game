var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var level=0;
var started=false;
$(document).keypress(function()
{
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=random(0,3);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name)
{
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function ()
  {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
