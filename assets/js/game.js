const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [


    {
        question: "The modern F1 Championship started in 1950. On which track was the first race held?",
        choice1: "Bahrain Circuit",
        choice2: "Shanghai Circuit",
        choice3: "Silverstone",
        choice4: "Nürburgring",
        answer: 3

    },

    {
        question: "Who is the only Dutch driver to have won a F1 Grand Prix?",
        choice1: "Gijs van Lennep",
        choice2: "Huub Rothengatter",
        choice3: "Jan Lammers",
        choice4: "Max Verstappen",
        answer: 4
    },

    {
        question: "World Rally Car engines have how many cylinders?",
        choice1: "2",
        choice2: "4",
        choice3: "6",
        choice4: "8",
        answer: 2
    },

    {
        question: "In rally racing, what does the co-driver do?",
        choice1: "Sits there for the pure fun of it",
        choice2: "Communicates back to the rally team",
        choice3: "Assists the driver using navigation notes",
        choice4: "Changes the radio station for the driver",
        answer: 3



    }

















]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

startGame();