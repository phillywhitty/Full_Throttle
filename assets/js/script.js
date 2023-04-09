// A reference to the HTML element with id "question"
const question = document.getElementById('question');

// The querySelectorAll method to find all HTML elements with class "choice-text",
// and convert the resulting NodeList into an array using the spread operator
const choices = [...document.querySelectorAll('.choice-text')];

// A variable to track the user's score
let score = 0;

// A variable to track the current question number
let questionCounter = 0;

// An array to store the available questions
let availableQuesions = [];

// An empty object for the current question
let currentQuestion = {};

// A boolean flag to indicate whether answers are being accepted
let acceptingAnswers = false;

// A constant for the bonus awarded for a correct answer
const CORRECT_BONUS = 1;

// A constant for the maximum number of questions in the quiz
const MAX_QUESTIONS = 10;

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
        question:
            "What do you get when you put a car and a mosquito together ?",
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

// Function to start the game

startGame = () => {
    // Reset the question counter and the users score to 0
    questionCounter = 0;
    score = 0;

    // Create a new array of available questions by copying the original array
    // This is done using the slice method to create a new array with the same elements
    availableQuesions = questions.slice();

    // Get a new question and display it to the user
    getNewQuestion();
}

// This function gets a new question
function getNewQuestion() {
    // Check if there are any available questions left or if the maximum number of questions has been reached
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // If there are no available questions or the maximum number of questions has been reached, redirect to the end page
    return window.location.assign("/end.html");
    }
    // Increment the question counter
    questionCounter++;
    // Generate a random index for the question
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    // Get the current question using the randomly generated index
    currentQuestion = availableQuesions[questionIndex];
    // Set the question text to be the current question's question property
    question.innerText = currentQuestion.question;
    

// Iterate over each choice element
choices.forEach(choice => {
    // Get the choice's number attribute
    const number = choice.dataset["number"];
    // Set the choice's text to be the corresponding choice from the current question
    choice.innerText = currentQuestion["choice" + number];
  });
  
  // Remove the current question from the available questions array
  availableQuesions.splice(questionIndex, 1);
  
  // Allow the user to select an answer
  acceptingAnswers = true;
  };


 // Iterate over each choice element
choices.forEach(choice => {
    // A click event listener to the choice element
    choice.addEventListener("click", e => {
      // If the user isn't currently allowed to select an answer, return early and don't do anything
      if (!acceptingAnswers) return;

  // Set acceptingAnswers to false, so the user can't select another answer until we tell them
acceptingAnswers = false;

// Get the choice element that the user clicked on
const selectedChoice = e.target;

// Get the answer number from the selected choice element's dataset
const selectedAnswer = selectedChoice.dataset["number"];

// Set a variable to hold the class to apply based on whether the answer is correct or incorrect
let classToApply;

// If the selected answer is correct
if (selectedAnswer == currentQuestion.answer) {
  // Sets the class to "correct" and change background to green
  classToApply = "correct";
} else {
  // Otherwise, set the class to "incorrect" and change background to red
  classToApply = "incorrect";
}


// Add a class to the selected choice's parent element to show whether the answer was correct or incorrect
selectedChoice.parentElement.classList.add(classToApply);

// Wait 1 second and then remove the class from the selected choice's parent element and get a new question
setTimeout(() => {
  selectedChoice.parentElement.classList.remove(classToApply);
  getNewQuestion();
}, 1000);

});
});
 

startGame();