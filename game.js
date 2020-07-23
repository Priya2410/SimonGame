
var buttonColours=["red","blue","green","yellow"]; //Array for all the colors
var gamePattern=[]; //The way the computer creates the sequence
var userClickedPattern=[];//The way the user is choosing the colour
var num=false; //The function nextSequence must be called only once when the key is pressed 
var level=0;
//This is used to start the game,so initial value of num is false,therefore the game hasnt started so we call the function to genterate a new sequence
// After generating the new sequence the function turns the value of num as true as the game starts.
$(document).keypress(function(){
    if(!num)
    {
    $("#level-title").text("Level 0");
    nextSequence();
    num=true;
    }
});
//This function is used to check is the user has clicked any button and now it invokes the function checkAnswer to check if the sequence is correct
$(".btn").click(function(){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndex=userClickedPattern.length-1;
    checkAnswer(lastIndex);
});
//This is used to check the sequence of the pattern entered by the user.
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length ===gamePattern.length)
        {
        setTimeout(function(){
            nextSequence()},1000);
        }
        // userClickedPattern=[];
    }
    else{
        playSound("wrong");
        console.log("try");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over!");
        startOver();
    }
}
//This function is used to generate new sequence for each level
//so the level is incremented everytime the function is called
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor((Math.random() * 4));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//This is used to play the sound associated with each button
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
//This is used to animate the button
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    $("#"+currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function(){
            $("#"+currentColour).removeClass("pressed")},100);
    // $("#"+currentColour).addClass("pressed");
}
function startOver()
{
    level=0;
    gamePattern=[];
    num=false;
    location.reload(true);
}
