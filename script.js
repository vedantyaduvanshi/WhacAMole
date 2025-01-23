const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let moleTimerId = null;
let moleSpeed = 1000;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole', 'hit');
    });

    const randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            result++;
            scoreDisplay.textContent = result;
            square.classList.add('hit');

            setTimeout(() => {
                square.classList.remove('hit');
            }, 100);

            hitPosition = null;
        } else if (!square.classList.contains('mole')) {
            
            endGame("You clicked the wrong box! Game Over.");
        }
    });
});

function moveMole() {
    moleTimerId = setInterval(randomSquare, moleSpeed);
}

function startGame() {
    result = 0;
    currentTime = 60;
    scoreDisplay.textContent = result;
    timeLeftDisplay.textContent = currentTime;
    startButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    moveMole();
    timerId = setInterval(countDown, 1000);
}

function countDown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;

    if (currentTime === 0) {
        endGame("Time's up! Game Over.");
    }
}

function endGame(message) {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    alert(`${message} Your final score is ${result}.`);
    restartButton.classList.remove('hidden');
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
