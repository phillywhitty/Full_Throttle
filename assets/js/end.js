const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;


finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {

    e.preventDefault();
}

const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};

highScores.push(score);

//sorting out the array list of high scores
highScores.sort((a, b) => b.score - a.score)

//at index 5 cut off everthing after that
highScores.splice(5);


localStorage.setItem('highScores', JSON.stringify(highScores));

//take user back to home page after score save
window.location.assign("/");