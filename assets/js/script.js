// <span> contains timer numbers inside the <p> tag at the top (numbers only)
var timerTag = document.querySelector("#timerTag");

// <p> tag at the top of the screen in the <nav> that displays time
var timerPTag = document.querySelector("header").children[1];

// <button> at end of game to submit name
var submitHighscoreBtn = document.querySelector("#submitHighscoreBtn");

// <button> at the front page of the quiz to view high scores
var viewHighscoresBtn = document.querySelector("#viewHighscoresBtn");

// <button> in the highscore view that clears all local storage
var clearHighscoreBtn = document.querySelector("#clearHighscoreBtn");

// <li> that will hold the dynamic answer list items
var answerButtonLst = document.body.querySelector("ul");

// back <button> in high scores
var goBackHighscoreBtn = document.querySelector("#goBackBtn");

// start game <button>
var startBtn = document.querySelector("#startBtn");

// <h1> that gets used almost the entire time for questions and titles
var titleTag = document.querySelector("#title")

//question and answer object with arrays
var questionObj = { //question object that holds all the parts of questions
    questions: [ //questions can just be added to by adding on a string to end of array
        "Commonly used data types DO not include:",
        "The condition in an if / else statement is enclosed with _______.",
        "Arrays in JavaScript can be used to store ________.",
        "String values must be enclosed within _______ when being assigned to variables. ",
        "A very useful tool used during development and debugging for printing content to the debugger is:",
    ],
    answers: [ //answers are in a 2d array because multiple answers for 1 questions
        ["strings", "correct:alerts", "booleans", "numbers"],
        ["quotes", "curly brackets", "correct:parenthesis", "square brackets"],
        ["numbers and strings", "other arrays", "booleans", "correct:all of the above"],
        ["comas", "curly brackets", "correct:quotes", "parenthesis"],
        ["JavaScript", "terminal/bash", "for loops", "correct:console.log()"
        ] //to pull out correct: tempStr = substring(8,questionObj.answers[index].length)"] //to denote a correct answer simply add prefix "correct:" onto the correct string.
    ]
}

var globalTimerPreset = 75;

// global variables

// keeps track of the current index number for question object
var questionIndexNumber = 0;
// globl time left variable
var timeLeft = globalTimerPreset;
// score that gets calculated at end of the game
var score = 0;
// boolean helps some functions know if game has already ended as well as timer.
var gameEnded = true;

//intial setup for the quiz shows all main menu itemms. instructions and start button
function setUpQuiz() {

    // resets the timer
    timeLeft = globalTimerPreset;
    // Sets the default number for timer so it starts at page load
    timerTag.textContent = globalTimerPreset;

    // hide elements that may be visible after a previous round
    document.querySelector("#display-highscore-div").style.display = "none";

    // REUSABLE CODE

    // this h1 tag gets reused for questions
    titleTag.textContent = "Javascript Quiz Challenge";

    // display items that are needed for the start page
    // shows the quiz title
    titleTag.style.display = "block";
    // shows instructions under h1 tag
    document.querySelector("#instructions").style.display = "block";
    // default view highscores button is hidden after coming from highscores of previous round
    viewHighscoresBtn.style.display = "block";
    //shows the start button
    startBtn.style.display = "block";

    return;
}

//gets triggered if the start button gets clicked
function startThisShit() {
    // when game starts set gameEnded back to false
    gameEnded = false;
    // keeps track of the current question number for question object
    questionIndexNumber = 0;
    //when game starts clean up the main div
    viewHighscoresBtn.style.display = "none"
    //hide start button when game starts
    startBtn.style.display = "none";
    //hide instructions beneath h1 tag (not used in questions)
    document.querySelector("#instructions").style.display = "none";
    //display timer at the top now that game started
    timerPTag.style.display = "block";

    //start generating the questions and timer
    showQuestions(questionIndexNumber);
    startTimer();

    return;
}

//timer interval that runs while user takes quiz
function startTimer() {
    var timerInterval = setInterval(function () {
        if (gameEnded === true) { // test if game ended before anything incase needs to be stopped
            clearInterval(timerInterval); //stop
            return;
        }
        if (timeLeft < 1) { // if timer is out under 1 cause wrong answers subtract 10 seconds quiz ends and timer stops
            clearInterval(timerInterval); //stop
            endGame(); //end quiz out of time scenario
        }

        timerTag.textContent = timeLeft; // update timer tag to latest time
        timeLeft--; // decrement timer after all code runs
    }, 1000); // 1 second intervals (-;<

    return;
}

// uses the questionIndexNumber to show the question of the current index and its answers
function showQuestions(currentQuestionIndex) {
    titleTag.textContent = questionObj.questions[currentQuestionIndex]; // select h1 tag and set it as the question
    createAnswerElements(currentQuestionIndex); // create answers for current question

    return;
}

//creates new answer elements in the answer list will clear out previous answers
function createAnswerElements(currentQuestionIndex) {
    answerButtonLst.innerHTML = ""; // clears out all current answers for new epic round of answers to be dynamically loaded! Wow so epic if you ever read this please tell me there are so many comments

    for (var answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++) { // loop over every answer (for current question) and create a list item on the page based on that content
        var currentAnswerListItem = document.createElement("li"); // new list item
        var tempStr = questionObj.answers[currentQuestionIndex][answerIndex]; // temp incase the string contains the "correct" answer tag and needs to be pulled out.

        //if the string contains "correct:"" pull it out and set it as id so they cant see it on the <button>/<li>
        if (questionObj.answers[currentQuestionIndex][answerIndex].includes("correct:")) {
            tempStr = questionObj.answers[currentQuestionIndex][answerIndex].substring(8, questionObj.answers[currentQuestionIndex][answerIndex].length); //yoink out the string part that doesnt contain "correct:"
            currentAnswerListItem.id = "correct"; //tag correct answer with an id to look at later and see if they clicked the right one.
        }

        currentAnswerListItem.textContent = tempStr; // temp incase the string contains the "correct" answer tag and needs to be pulled out.
        answerButtonLst.appendChild(currentAnswerListItem); // adds this answer list item to the unordered list in html
    }

    return;
}

//when called will iterate to the next question and show the next question content
function nextQuestion() {
    questionIndexNumber++; // increment our index by 1 so we can keep track of what question we are on
    if (questionIndexNumber >= questionObj.questions.length) { // if we run out of questions end the game
        endGame(); // ends the game
    } else { // if we got more questions dont stop there keep on goin boi!!!!!
        showQuestions(questionIndexNumber); // showQuestion handles showing textContent of current Index
    } // this is a curley bracket there are many like it but this one is mine hehehe (:<

    return;
}

// its function is only to end the game, it be that simple homie
function endGame() {
    gameEnded = true;
    score = timeLeft; // score gets set as the leftover time.

    // hides necessary elements
    timerPTag.style.display = "none"; // hide timer on end screen since game is over
    titleTag.style.display = "none"; // hide title h1 (question tag)
    answerButtonLst.innerHTML = "";

    // shows endscreen score and form for highscore storage
    document.querySelector("#scoreSpan").textContent = score; // displays score
    document.querySelector("#submit-highscore-div").style.display = "block";

    return;
}

// events !!!!!!!!!!!!!!!!!

//Triggered when a <li> tag inside answerButtonLst <ul> is clicked
function checkAnswer(event) {
    if (event.target != answerButtonLst) { // if this is just the <ul> dont do anything else we just want the <li> (answers) themselves not parent

        if (!(event.target.id.includes("correct"))) { // check <li> id to see if its tagged as the correct answer
            timeLeft -= 10; // if its not the correct answer deduct 10 seconds from the timer mwah haha haha
        }

        nextQuestion(); // go to next question after an answer has been clicked can only choose one answer per question
    }

    return;
}

// Triggered when highscoreBtn is clicked
function storeScoreAndName() {
    var highscoreTextbox = document.querySelector("input"); // gets the input field where user enters their name
    var tempArrayOfObjects = []; // initialize an empty array to fill with previously stored data

    if (highscoreTextbox.value != "" || highscoreTextbox.value != null) { // as long as textbox is not empty or null can continue to try to store this.
        var tempObject = { // initialize a object to put in the storage array
            names: highscoreTextbox.value, // fill with users current name
            scores: score, // fill with users final score
        }

        if (window.localStorage.getItem("highscores") == null) { // if no data exsists create a new array of objects
            tempArrayOfObjects.push(tempObject); // push current user score and name into our empty array
            window.localStorage.setItem("highscores", JSON.stringify(tempArrayOfObjects)); // send our new array into local storage

        } else { // if some data previously was stored and exsist lets add onto it and put the score in the right spot of the leaderboard
            tempArrayOfObjects = JSON.parse(window.localStorage.getItem("highscores")); // get and push our array into a usable variable

            for (var i = 0; i < tempArrayOfObjects.length; i++) {
                if (i == tempArrayOfObjects.length) {
                    tempArrayOfObjects.push(tempObject)
                    break; //stop looping... forever.
                } else if (tempArrayOfObjects[i].scores < score) { // if our new score is higher than the current score throw it in the array so its sorted high to low
                    tempArrayOfObjects.splice(i, 0, tempObject); // splice and "insert" our object into the array at the current index
                    break; // stop looping. forever. do not continue job is done son
                }
            }
            window.localStorage.setItem("highscores", JSON.stringify(tempArrayOfObjects)) // turn our array of objects into a string and store it in local storage
        }
        document.querySelector("input").value = ""; // clear out the input so its not prefilled for another round of the quiz
        score = 0; // set score back to 0 because we have already stored it and the game is over

        showHighscores(); // if user is able to submit that means they are at end of game and go show how they stack up on the highscores
    }

    return;
}

// triggered when viewHighscoresBtn is clicked hides all elements and displays the highscore board filled with localstorage values
function showHighscores() {
    //elements needed to hide
    titleTag.style.display = "none"; // hides title h1 tag
    startBtn.style.display = "none"; // hide start button when game starts
    document.querySelector("header").children[0].style.display = "none"; // hides the view highscore button but not header so formatting doesnt get weird
    document.querySelector("#instructions").style.display = "none"; // hide instructions beneath h1 tag
    document.querySelector("#submit-highscore-div").style.display = "none"; // hide submit highscores because they might have just came from submitting

    // show highscore div and start filling it up
    document.querySelector("#display-highscore-div").style.display = "block"; // show div

    tempOrderedList = document.querySelector("ol"); // target the ordered list in our highscore div
    tempOrderedList.innerHTML = "" // clear out all previous highscores to be rebuilt in (possible) new order

    tempArrayOfObjects = JSON.parse(window.localStorage.getItem("highscores")); // get all local storage highscores
    if (tempArrayOfObjects != null) { // only continue if there was data to use and display stuff on highscore board
        for (var i = 0; i < tempArrayOfObjects.length; i++) { // loop over every array element found (highscore entry)
            var newLi = document.createElement("li") // create a new <li> to append to our <ol>
            newLi.textContent = tempArrayOfObjects[i].names + " - " + tempArrayOfObjects[i].scores; // fill up new <li> with content of stored highscores
            tempOrderedList.appendChild(newLi); // append to parent <ol> (numbered list)
        }

    } else { // if there was no data in local storage to show on highscores show error
        var newLi = document.createElement("p") // paragraph tag so its not numbered
        newLi.textContent = "No Highscores" // text content for out paragraph tag
        tempOrderedList.appendChild(newLi); // append to parent <ol> where highscores would go for ease
    }

    return;
}

//Triggered when clearHighscoreBtn is clicked clears the local storage
function clearHighscores() {
    document.querySelector("ol").innerHTML = ""; // empties out the highscore list incase user is viewing it currently
    window.localStorage.clear(); // dump all local storage

    setUpQuiz(); // go back to main screen because if user clicked this that means they are on highscore board

    return;
}

function startQuiz() {
    // elements on DOM which are going to need an event listener
    startBtn.addEventListener("click", startThisShit); // button that starts the game
    answerButtonLst.addEventListener("click", checkAnswer); // list that contains the answer <li> tags which are used as buttons
    viewHighscoresBtn.addEventListener("click", showHighscores); // shows the highscores
    submitHighscoreBtn.addEventListener("click", storeScoreAndName); // submits highscores
    clearHighscoreBtn.addEventListener("click", clearHighscores); // clears localstorage
    goBackHighscoreBtn.addEventListener("click", setUpQuiz); // returns back to main screen to show start and instructions

    setUpQuiz(); // prepare the screen for and display the appropriate items to get ready for quiz

    return;
}

startQuiz(); // initialize all my buttons and interactable elements (: