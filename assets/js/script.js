/* A reference to the HTML element with id "question". */
const question = document.getElementById("question");

/* The querySelectorAll method to find all HTML elements with class "choice-text"
   and convert the resulting NodeList into an array using the spread operator. */
const choices = [...document.querySelectorAll(".choice-text")];

const questionCounterText = document.getElementById('questionCounter');

/* A variable to retrieve score ID.
   Tracking the user's score.
   Tracking the current question number.
   An array to store the available questions.
   An empty object for the current question. */
const scoreText = document.getElementById("score");
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let currentQuestion = {};

// A boolean to indicate whether answers are being accepted.
let acceptingAnswers = false;

// A constant for the bonus awarded for a correct answer & max questions for the quiz.
const EXACT_BONUS = 1;
const QUESTIONS_LIMIT = 10;

// QUIZ QUESTIONS //
let questions = [
  {
    question:
      "The modern F1 Championship started in 1950. On which track was the first race held ?",
    choice1: "Bahrain Circuit",
    choice2: "Shanghai Circuit",
    choice3: "Silverstone",
    choice4: "Nürburgring",
    answer: 3,
  },

  {
    question: "Who is the only Dutch driver to have won a F1 Grand Prix ?",
    choice1: "Gijs van Lennep",
    choice2: "Huub Rothengatter",
    choice3: "Jan Lammers",
    choice4: "Max Verstappen",
    answer: 4,
  },

  {
    question: "World Rally Car engines have how many cylinders ?",
    choice1: "2",
    choice2: "4",
    choice3: "6",
    choice4: "8",
    answer: 2,
  },

  {
    question: "In rally racing, what does the co-driver do ?",
    choice1: "Sits there for the pure fun of it",
    choice2: "Communicates back to the rally team",
    choice3: "Assists the driver using navigation notes",
    choice4: "Changes the radio station for the driver",
    answer: 3,
  },

  {
    question: "What is the highest official speed ever reached in MotoGP ?",
    choice1: "120mph",
    choice2: "217mph",
    choice3: "102mph",
    choice4: "203mph",
    answer: 2,
  },

  {
    question: "Which year did the first Isle of Man TT race take place ? ",
    choice1: "1907",
    choice2: "1922",
    choice3: "1935",
    choice4: "1966",
    answer: 1,
  },

  {
    question:
      " Which Formula One driver has won the most World Championships to date?",
    choice1: "Ayrton Senna",
    choice2: "Michael Schumacher",
    choice3: "Lewis Hamilton",
    choice4: "Alain Prost",
    answer: 2,
  },

  {
    question: " What is the current land speed record for a car ?",
    choice1: " 483 mph",
    choice2: "617 mph",
    choice3: "763 mph ",
    choice4: " 1,227 mph",
    answer: 4,
  },

  {
    question: "What do you get when you put a car and a mosquito together ?",
    choice1: "A fast and furious bug",
    choice2: "A car that always needs its windshield wipers",
    choice3: "A drive-in movie theater",
    choice4: "A bug that's always buzzing around your ear",
    answer: 1,
  },

  {
    question:
      "Which of these animals is considered to be the fastest land animal ?",
    choice1: " African wild dog",
    choice2: "Cheetah",
    choice3: "Siberian tiger",
    choice4: "American black bear",
    answer: 2,
  },
];

// FUNCTIONS //

// FUNCTION TO START THE GAME //
/* Reset the question counter and the users score to 0.
   Create a new array of available questions by copying the original array.
   This is done using the slice method to create a new array with the same elements.
   Get a new question and display it to the user.
 */

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = questions.slice();
  getNewQuestion();
};

// THIS FUNCTION GETS A NEW QUESTION //
/* Check if there are any available questions left or if the maximum number of questions has been reached.
   If there are no available questions or the maximum number of questions has been reached, redirect to the end page. 
*/

function getNewQuestion() {
  if (availableQuesions.length === 0 || questionCounter >= QUESTIONS_LIMIT) {
    return window.location.assign("/end.html");
  }

  /* Increment the question counter 
  // Set the text of the question counter element to display the current question number and total number of questions
     Generate a random index for the question
     Get the current question using the randomly generated index
     Set the question text to be the current question's question property
  */

  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + QUESTIONS_LIMIT;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // FUNCTION FOR SELECTING MY ANSWERS/CHOICES //
  /* Repeats over each choice element.
     Get the choice's number attribute.
     Set the choice's text to be the corresponding choice from the current question .
  */

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove the current question from the available questions array
  availableQuesions.splice(questionIndex, 1);

  // Allow the user to select an answer
  acceptingAnswers = true;
}

/* Repeat over each choice element 
   A click event listener to the choice element.
   If the user isn't currently allowed to select an answer, return early and don't do anything. 
*/

  choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    /* Set acceptingAnswers to false, so the user can't select another answer until I tell them.
       Get the choice element that the user clicked on.
       Get the answer number from the selected choice element's dataset.
       Set a variable to hold the class to apply based on whether the answer is correct or incorrect .
    */
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    //FUNCTION FOR STYLING BACKGROUNDS & ICREMENTING SCORE//
  /* Sets the class to "correct" and changes background to green
     Otherwise, it sets the class to "incorrect" and change background to red
     It then checks if the class to apply is "correct"
     If so, it increments the score by 1 to the correct bonus amount
  */ 

    let classToApply;
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    } else {
      classToApply = "incorrect";
    }

    if (classToApply === "correct") {
      incrementScore(EXACT_BONUS);
    }

    // Add a class to the selected choice's parent element to show whether the answer was correct or incorrect.
    selectedChoice.parentElement.classList.add(classToApply);

    // TIMEOUT FUNCTION //
    /* Wait 1 second and then remove the class from the selected choice's parent element and get a new question.
       Wait for one second before removing the class and getting a new question.
     */

    setTimeout(function () {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// INCREMENT SCORE FUNCTION //
/* A function that increments the score by 1.
   It then gives the amount(1) to the score variable and
   updates the text of the score element to display the new score.
 */

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

// This code will be executed once all other functions are defined.
startGame();
