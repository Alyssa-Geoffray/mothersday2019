//europe trivia game

$(document).ready(function () {

    //function to keep earth gif moving
    function validateField() { 
        var docs = document.getElementById("img");
        docs.setAttribute("src", "gif_path");
        };

    //generates initial screen / home page
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startbtn' href='#' role='button'>Click Here To Start</a></p>";
        $(".mainDiv").html(startScreen);
    }

    initialScreen();

    //when the user clicks 'start'
    $("body").on("click", ".startbtn", function (event) {
        event.preventDefault();  // added line to test scrolling issue
        clickSound.play();
        generateHTML();
        timerWrapper();
    });

    //when the user clicks on an answer
    $("body").on("click", ".answer", function (event) {
        //correct answer
        // clickSound.play();    
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            //wrong answer
            clearInterval(theClock);
            generateLoss();
        }
    });

    //when user clicks 'play again' after a game ends
    $("body").on("click", ".resetBtn", function (event) {
        clickSound.play();
        resetGame();
    });

});

//if the user does not select an answer before the timer runs out
function userLossTimeOut() {
    unansweredTally++;
    gameHTML =  correctAnswers[questionCounter] + "" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

//if the user selects the correct answer
function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timerText'></p>" + "<p class='text-center msg'>" + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

//if the user selects the wrong answer
function generateLoss() {
    incorrectTally++;
    gameHTML = correctAnswers[questionCounter] + "" + losingImages[questionCounter];
    $(".mainDiv").html(gameHTML);
    setTimeout(wait, 5000); 
}

// YOU CAN PUT BUTTONS HERE <p class='firstAnswer answer'>TEXTHERE</p> TO GENERATE BUTTONS AND CLICK THROUGH EVERY OTHER PIC
//function to generate possible answers for each question
function generateHTML() {
    gameHTML =  answerArray[questionCounter] +"<p class='text-center msg'>" + questionArray[questionCounter] + "</p>";
    $(".mainDiv").html(gameHTML);
}

//function to check if there are more questions
//after each question, it will either show the next question or generate the final 'game-over' page
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 5;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

//function to give each question 20 seconds, show countdown in html, and generate loss if player does not select an answer in time
function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            userLossTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}


//function for when it's game over
function finalScreen() {

    // unique end-game message if the user got a perfect score of 8
    if (correctTally === 8) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>100%! You got a perfect score!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    } 
    //if correct tally is 5-7 out of 8
    else if (correctTally < 8 && correctTally > 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You did great!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if tally is 4 out of 8
    else if (correctTally === 4) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You scored 50%." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if correct tally is between 1-3
    else if (correctTally < 4 && correctTally != 0) {
        gameHTML = "<p class='text-center timerText'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Game Over! You need to stay in school." + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Watch Again</a></p>";
        $(".mainDiv").html(gameHTML);
    }
    //if the correct tally is zero
    else { 
        gameHTML = "<p class='text-center timerText msg finalmsg'>YOU DA BEST!<br><img src='https://i.imgur.com/uvVWKNX.gif' class='picDisplay noBorder'></p>" + "<p class='text-center'></p>" + "<p class='summary-correct'></p>" + "<p class='text-center resetBtn-container'><a class='btn btn-primary btn-lg btn-block resetBtn' href='#' role='button'>Replay</a></p>";
    //  DOG GIF: https://i.imgur.com/FpJ79Ry.gif   DANCING LADY: https://i.imgur.com/uvVWKNX.gif
        $(".mainDiv").html(gameHTML);
        // $(".endPic").html("<img class='endDancers' width='100px' src='https://i.imgur.com/uvVWKNX.gif'>");
    }
}

//function to reset game (function called when player presses button to restart the game)
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 5;
    generateHTML();
    timerWrapper();
}



//set counter to 20
var counter = 5;

//set questions (in the form of an image) inside array
// 1. I love you, 2. Life skills (art), 3. fixed hair (pink), 4. always there for me, 5. guy, 6. teen angst (wolf meme), 7.cry aladin (couch pic), 8. just a few reasons why... 
var questionArray = ["<img class='picDisplay' id='gens' src='https://i.imgur.com/blU5Pkj.png'></img>", "<img class='picDisplay' id='artskills' src='https://i.imgur.com/4KYHki1.png?1'></img>", "<img class='picDisplay' id='pinkhair' src='https://i.imgur.com/GEVgovI.jpg'></img>", "<img class='picDisplay' id='brothers' src='https://i.imgur.com/9tMdYZw.jpg'></img>", "<img class='picDisplay' id='momMix' src='https://i.imgur.com/QcwiCGx.png?1'></img>", "<img class='picDisplay' id='teenwolf' src='https://i.imgur.com/mDZxBI7.jpg'></img>", "<img class='picDisplay' id='couch' src='https://i.imgur.com/ohD2PyY.jpg'></img>", "<img class='picDisplay' id='sdalex' src='https://i.imgur.com/BIpgDjZ.jpg?1'></img>"];

//set possible answers inside array, matching each object's index number to the correlating question image
var answerArray = [["<p class='text-center msg'>I love you SOOO much. Do you know why?</p>"], ["<p class='text-center msg'>You taught me life skills like sewing and painting</p>"], ["<p class='text-center msg'>You fixed my hair when I turned it pink</p>"], ["<p class='text-center msg'>You gave me two crazy brothers</p>"], ["<p class='text-center msg'>You are always there when we need you</p>"], ["<p class='text-center msg'>And you put up with my teen years</p>"], [ "<p class='text-center msg'>Even if that means crying over Aladin's magic carpet</p>"], ["<p class='text-center msg'>And these are just a few reasons why...</p>"]];

//array of images to display after the user selects a right answer
// img array same as losingimages array

// #4 always there #5 guy *4 two brothers *5 read to me
// #4 two brothers #5 always there *4 guy *read to me
// brothers: https://i.imgur.com/9tMdYZw.jpg
// always there/momMix: https://i.imgur.com/QcwiCGx.png?1
//guy: https://i.imgur.com/Mn52S53.jpg

// 1. (lays) smile, 2. Open a can (can opener), 3. Supported in school (graduation), 4. 2 brothers (alex and ryan), 5. read to me (flatstanley), 6. not afraid be yourself (dancing bear), 7. follow your heart (lento hike), 8. love you so much (m/d quote)
var imageArray = ["<img class='center-block img-right picDisplay' id='lays' src='https://i.imgur.com/bFRQtDb.jpg'>", "<img class='center-block img-right picDisplay noBorder' id='canopener' src='https://i.imgur.com/3xccTE8.png'>", "<img class='center-block img-right picDisplay' id='graduate' src='https://i.imgur.com/xd86nkv.jpg'>", "<img class='center-block img-right picDisplay' id='guy' src='https://i.imgur.com/Mn52S53.jpg'>", "<img class='center-block img-right picDisplay' id='flatstanley' src='https://i.imgur.com/OfbFwOq.jpg'>", "<img class='center-block img-right picDisplay noBorder' id='beurselfbear' src='https://i.imgur.com/Y9mrFqe.gif'>", "<img class='center-block img-right picDisplay' id='lentoshike' src='https://i.imgur.com/KFAYpDZ.jpg'>", "<img class='center-block img-right picDisplay' id='quote' src='https://i.imgur.com/0TkFs5o.jpg'>"];

//array of images to display after the user selects a wrong answer
var losingImages = ["<img class='center-block img-right picDisplay' id='lays' src='https://i.imgur.com/bFRQtDb.jpg'>", "<img class='center-block img-right picDisplay noBorder' id='canopener' src='https://i.imgur.com/3xccTE8.png'>", "<img class='center-block img-right picDisplay' id='graduate' src='https://i.imgur.com/xd86nkv.jpg'>", "<img class='center-block img-right picDisplay' id='guy' src='https://i.imgur.com/Mn52S53.jpg'>", "<img class='center-block img-right picDisplay' id='flatstanley' src='https://i.imgur.com/OfbFwOq.jpg'>", "<img class='center-block img-right picDisplay noBorder' id='beurselfbear' src='https://i.imgur.com/Y9mrFqe.gif'>", "<img class='center-block img-right picDisplay' id='lentoshike' src='https://i.imgur.com/KFAYpDZ.jpg'>", "<img class='center-block img-right picDisplay' id='quote' src='https://i.imgur.com/0TkFs5o.jpg'>"];

//set correct answers inside array, index numbers matching the correlating question
var correctAnswers = [ "<p class='text-center msg'>It's hard not to smile knowing you're my mom</p>", "<p class='text-center msg'>You even taught me how to open a can</p>", "<p class='text-center msg'>You supported me through school</p>", "<p class='text-center msg'>You gave me a second dad</p>", "<p class='text-center msg'>You read to me as a child</p>", "<p class='text-center msg'>You're not afraid to be yourself</p>", "<p class='text-center msg'>You follow your heart wherever it takes you</p>", "<p class='text-center msg'>I love you so much!</p>"];

//other empty variables or number variables set to zero
var questionCounter = 0;
var startScreen;
var gameHTML;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//variable to store audio for the game
var clickSound = new Audio("PinkFloyd.mp3");



