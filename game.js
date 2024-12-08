var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false


document.addEventListener('keypress', function() {
    if (!started) {
        document.querySelector("h1").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".gameBtn").forEach(gameBtn => {
    gameBtn.addEventListener('click', function() {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("bg-danger");
        setTimeout(function() {
            document.body.classList.remove("bg-danger");
        }, 200);
        document.querySelector("h1").textContent = "Game over! Press Any Key to Restart";
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    const element = document.getElementById(randomChosenColor);
    fadeInOut(element);
    playSound(randomChosenColor);
}

function fadeInOut(element) {
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
        setTimeout(() => {
            element.style.opacity = 0;
            setTimeout(() => {
                element.style.opacity = 1;
            }, 100);
        }, 100);
    }, 100);
}

function animatePress(currentColor) {
    const element = document.getElementById(currentColor);
    element.classList.add("gameBtn-pressed");
    setTimeout(function () {
        element.classList.remove("gameBtn-pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
