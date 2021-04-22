
//Arrays...
var gamePattern = ["dummy"]
var userClickedPattern = []
var buttonColors = ["red","blue", "green", "yellow"]


//Sound files
var blueAudio = new Audio("sounds/blue.mp3");
var redAudio = new Audio("sounds/red.mp3");
var greenAudio = new Audio("sounds/green.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");
//Function that generates a random value representing which color is picked.
function nextSequence(){
 var randomNumber = Math.floor(Math.random() * 4);
 return randomNumber
}
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
$("h1").text("Swipe to Begin!")
}
var j = 1  //keeps track of round count
var roundInProgress = ""

//First Keydown to get match started don keydown...
$(document).keydown(function(){
  $("img").addClass("inviso")
  if( gamePattern[0] == "dummy"){
  var randomChosenColor = buttonColors[nextSequence()] //this binds whichever color ( from 0-3 in the buttonColors Array) to the variable randomChosenColor. resets on each keydown currently
  flash(randomChosenColor);
  gamePattern.pop()  //removes that dummy variable up there
  gamePattern.push(randomChosenColor)
  $("h1").text("Round 1")
  roundInProgress = "true"

}
})
//Handle TOUCHSCREEN Event
$("body").on("touchmove", function(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  $("img").addClass("inviso")
  if( gamePattern[0] == "dummy"){
  var randomChosenColor = buttonColors[nextSequence()] //this binds whichever color ( from 0-3 in the buttonColors Array) to the variable randomChosenColor. resets on each keydown currently
  flash(randomChosenColor);
  gamePattern.pop()  //removes that dummy variable up there
  gamePattern.push(randomChosenColor)
  $("h1").text("Round 1")
    roundInProgress = "true"

}
}
})
  //gonna use this to toggle on and off this function, so that you can click the whole sequence without the function starting over.
var i = 0 //needs to be out here so it's not reset to 0 on each click.

$(".btn").click(function(){
  if(roundInProgress == "true"){
  $(this).toggleClass("btn") //should remove the button class so that wehen we push the classes, the color name class is the only class, which will match the caase for our switch statement above.
  var userColor = $(this).attr("class");
  $(this).toggleClass("btn") //should put the btn class back right away..

userClickedPattern.push(userColor); //should just equal the color, ex. "blue" and not "btn blue". Pushes color to player array.

//TEST to see what thing should happen at each click AFTER the userColor was pushed above- either wipe player array and begin clicking buttons again, or we are still clicking through, adding userColors UNTIL either we mess up OR reach the end.
if(gamePattern[i] == userClickedPattern[i] && gamePattern.length > userClickedPattern.length){ //if the [i] matches thus far AND gamePattern still longer bc we are still clicking buttons:
flash(userColor); //to show button clicks EACH click
i++ //increments i so we can test the NEXT index value in each array next round. The else if statement doesn't run.
}

else if(gamePattern[i] == userClickedPattern[i]){ //else if they're now the same length but DO match, we reset the round.
//Round 2 starts here IF our "if" statement returns true. Same as our original keydown event, but now it won't be activated by a keydown.
flash(userColor);
var randomChosenColor = buttonColors[nextSequence()] //this binds whichever color ( from 0-3 in the buttonColors Array) to the variable randomChosenColor. resets on each keydown currently
setTimeout(function(){flash(randomChosenColor);
}, 1000);
userClickedPattern = [] //if the else if happens, we're triggering the next round, prompting 1 new gme rray color, and WIPING the user pattern to start over.
i = 0 //resets i to start checking them from the first index again
j++  //increments round count
gamePattern.push(randomChosenColor) //new gamepattern color is added, and we begin clicking again.

$("h1").text("Round "+ j)

}

else{ //if the arrays are not equal length AND the current i index doesn't match, i.e you clicked the wrong color,
  roundInProgress = "false" //should prevent this entire function from running next time a click happens...
  //loser heading would go here.
  flash(userColor);
  wrongAudio.play();
    $("body").css("background-color", "red")
    setTimeout(function(){
      $("body").css("background-color", "#011F3F")
    }, 50)

  console.log("game over")
  $("h1").text("Womp Womp. (Press Any Key to Restart)")
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  $("h1").text("Womp Womp! (Swipe to Restart)")
  }
  $("img").toggleClass("inviso")
  gamePattern = ["dummy"]
  userClickedPattern = []
  j = 1
}
}
$(document).keydown(function(){
  if(roundInProgress == "false"){
    $("h1").text("Round 1")

  }
})
if(j == 5){
  $("h1").text("Wow you're good")
}
})


function flash(color){
  switch(color){

    case "red":
    $(".red").css("visibility", "hidden");
    setTimeout(function(){
      $(".red").css("visibility", "visible")
    }, 130)
    redAudio.play();
    break;

    case "blue":
    $(".blue").css("visibility", "hidden");
    setTimeout(function(){
      $(".blue").css("visibility", "visible")
    }, 130)
    blueAudio.play();
    break;

    case "green":
    $(".green").css("visibility", "hidden");
    setTimeout(function(){
      $(".green").css("visibility", "visible")
    }, 130);
    greenAudio.play();
    break;

    case "yellow":
    $(".yellow").css("visibility", "hidden");
    setTimeout(function(){
      $(".yellow").css("visibility", "visible")
    }, 130);
    yellowAudio.play();
  }
}
