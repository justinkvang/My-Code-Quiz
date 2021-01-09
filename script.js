// global variables 
var seconds = document.getElementById("countdown").textContent;
var quizBox = document.querySelector(".quizBox");
var viewscoreBtn = document.getElementById("viewhighscore");
var quiz = {};
var score = 0;
var countdown;
var highscore = [];
var initialList = [];
var count = localStorage.getItem("count");

//Start page/ first page
firstpage();
function firstpage() {
    clearDetails();
    reset();
    let heading = document.createElement("p");
    heading.setAttribute("class", "infoTitle");
    heading.textContent = "Rules of this Quiz";
    
    let instructions = document.createElement("p");
    instructions.setAttribute("class", "infoList");
    instructions.textContent = "You will only have 60 seconds to complete the quiz. Once you select your answer, you can't reselect. If you answer incorrectly, 10 seconds will be subtracted from your current time. Your score is based on how much time is lefted over."; 
  
    let startquizBtn = document.createElement("button");
    startquizBtn.setAttribute("id", "startQuiz");
    startquizBtn.setAttribute("class", "startBtn");
    startquizBtn.textContent = "Start Quiz";
    
    quizBox.appendChild(heading);
    quizBox.appendChild(instructions);
    quizBox.appendChild(startquizBtn);

    startquizBtn.addEventListener("click", function(){
        playQuiz();
    });

    startquizBtn.onclick = ()=>{
        countdown = setInterval(function() {
            seconds--;
            document.getElementById("countdown").textContent = seconds;
            if (seconds < 1) clearInterval(countdown);
        }, 1000);
  }

function playQuiz() {
    clearDetails();
    quiz = setUpQuestions(questionList);
    showQuestion();
}
function setUpQuestions(arr) {  
    let ranQuest = [];
  
    for (let i=0; i<arr.length; i++) {
      ranQuest.push(arr[i]);
    }
    return ranQuest;
  }

function clearDetails() {
    quizBox.innerHTML = "";
    }


function showQuestion() {
    clearDetails();
    console.log(quiz.length);
    if ( quiz.length === 0 ) {
        endGame();
        return;
      } 

currentQuestion = quiz.pop();

let question = document.createElement("h1");
question.setAttribute("question", currentQuestion.title);
question.textContent = currentQuestion.title;
quizBox.appendChild(question)

let optionBox = document.createElement("ul");
optionBox.setAttribute("id","optionBox");
quizBox.appendChild(optionBox);

for( let i=0; i<currentQuestion.options.length; i++ ) {

    let listOptions = document.createElement("li");

    listOptions.setAttribute("choice-value", currentQuestion.options[i]);
    listOptions.setAttribute("id","questionNum-"+i);
    listOptions.textContent = currentQuestion.options[i];

    optionBox.appendChild(listOptions)
  }
  optionBox.addEventListener("click", function (){
    scoreAnswer(currentQuestion);
  });
}
function scoreAnswer(currentQuestion) {
    let answerStatus = document.createElement("p");
    var e = event.target;
    if ( e.matches("li")) {
      let selectedItem = e.textContent;
    
      if ( selectedItem === currentQuestion.answer ) {
          answerStatus.textContent = "Correct!";
      } else {
          answerStatus.textContent = "Wrong!";

          seconds -= 10;
      }
      quizBox.appendChild(answerStatus);
      console.log(answerStatus);
    }

    setTimeout(showQuestion,500);
}
function stopTime() {
    score = seconds;
    console.log(score);
    seconds = 0;
    clearInterval(countdown);
  }

function endGame() {
    stopTime();
    clearDetails();
    displayScore();
}

function displayScore (){
    let heading = document.createElement("p");
    heading.setAttribute("class", "infoTitle");
    heading.textContent = "End of Quiz";

    let finalScore = document.createElement("p");
    finalScore.setAttribute("class", "infoList");
    finalScore.textContent = "Your final score is " + score;

    let initials = document.createElement("p");
    initials.setAttribute("class", "infoList");
    initials.textContent = "Please enter your initials to keep your score";
    
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "inputBar");

    let inputBtn = document.createElement("button");
    inputBtn.setAttribute("class", "submitBtn");
    inputBtn.textContent = "Submit";

    quizBox.appendChild(heading);
    quizBox.appendChild(finalScore);
    quizBox.appendChild(initials);
    quizBox.appendChild(inputName);
    quizBox.appendChild(inputBtn);

    inputBtn.addEventListener("click", function(){
        viewHighscore(inputName.value);
        localStorage.setItem("count", count);
    })
}
function viewHighscore(initial) {
    clearDetails();
    if (score != 0){
        highscore.push(score);
        initialList.push(initial);
    }

    let heading = document.createElement("p");
    heading.setAttribute("class", "infoTitle");
    heading.textContent = "High Scores";
    quizBox.appendChild(heading);

    for( let i=0; i<highscore.length; i++ ) {
    let listOptions = document.createElement("li");
    listOptions.setAttribute("score-value", highscore[i]);
    listOptions.setAttribute("id","score-Num"+i);
    listOptions.textContent = initialList[i] + " " + highscore[i];
    quizBox.appendChild(listOptions);
    }

    let resetBtn = document.createElement("button");
    resetBtn.setAttribute("class", "restartBtn");
    resetBtn.textContent = "Restart";

    let clearscoreBtn = document.createElement("button");
    clearscoreBtn.setAttribute("class", "submitBtn");
    clearscoreBtn.textContent = "Clear High Scores";

    quizBox.appendChild(resetBtn);
    quizBox.appendChild(clearscoreBtn);

    resetBtn.addEventListener("click", firstpage);
    clearscoreBtn.addEventListener("click", clearhighscore);
  }
  function reset(){
      score = 0;
      seconds = 60;
  }
  function clearhighscore(){
      highscore = [];
      score = 0;
      initialList = [];
      viewHighscore("");
  }

}






