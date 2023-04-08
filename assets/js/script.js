// Define a reference to the HTML element with id "question"
const question = document.getElementById("question");

// Use the querySelectorAll method to find all HTML elements with class "choice-text",
// and convert the resulting NodeList into an array using the spread operator
const choices = [...document.querySelectorAll(".choice-text")];

// Define a variable to track the user's score
let score = 0;

// Define a variable to track the current question number
let questionCounter = 0;

// Define an array to store the available questions
let availableQuesions = [];

// Define an empty object for the current question
let currentQuestion = {};

// Define a boolean flag to indicate whether answers are being accepted
let acceptingAnswers = false;

// Define a constant for the bonus awarded for a correct answer
const CORRECT_BONUS = 1;

// Define a constant for the maximum number of questions in the quiz
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
];

// FUNCTIONS //

// Define a function to start the game
function startGame() {
    // Reset the question counter to 0
    questionCounter = 0;

    // Reset the user's score to 0
    score = 0;

    // Create a new array of available questions by copying the original array
    // This is done using the slice() method to create a new array with the same elements
    availableQuesions = questions.slice();

    // Get a new question and display it to the user
    getNewQuestion();
}
