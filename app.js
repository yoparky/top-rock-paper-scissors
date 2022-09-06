"use strict";

let userScore = 0;
let aiScore = 0;
let gameOver = false;

function playRound(playerPick) {
    if (!gameOver) {
        pickImage(playerPick);
        let aiPick = randomPickRPS();
        pickAiImage(aiPick);
        let winner = checkWin(playerPick, aiPick);
        pickBattleWinner(winner);
        document.getElementById("currentUserScore").innerHTML = userScore;
        document.getElementById("currentAiScore").innerHTML = aiScore;
        checkGameOver();
    } else {
        alert("Game is over! press the reset button to play another round.")
    }
}
// update the DOM tree image according battle winner
// return 0 if tie, 1 if player win, 2 if ai win
function pickBattleWinner(winner) {
    if (winner === 0) {
        document.getElementById("battleResult").src = './tie.avif';
    } else if (winner === 1) {
        document.getElementById("battleResult").src = './win.avif';
    } else if (winner === 2) {
        document.getElementById("battleResult").src = './lose.avif';
    }
}
// update the DOM tree image according player pick.
function pickImage(playerPick) {
    if (playerPick === "rock") {
        document.getElementById("userBattlePick").src = './rock.jpeg';
    } else if (playerPick === "paper") {
        document.getElementById("userBattlePick").src = './paper.jpeg';
    } else if (playerPick === "scissors") {
        document.getElementById("userBattlePick").src = './scissors.jpeg';
    }
}
// update the DOM tree image according ai pick.
function pickAiImage(aiPick) {
    if (aiPick === "rock") {
        document.getElementById("aiBattlePick").src = './rock.jpeg';
    } else if (aiPick === "paper") {
        document.getElementById("aiBattlePick").src = './paper.jpeg';
    } else if (aiPick === "scissors") {
        document.getElementById("aiBattlePick").src = './scissors.jpeg';
    }
}
// Randomly pick rock or paper or scissors for the AI.
function randomPickRPS() {
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return "rock";
    } else if (randomNumber === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Check if player or AI won the round and update score.
// return 0 if tie, 1 if player win, 2 if ai win


function checkWin(playerPick, aiPick) {
    if (playerPick === "rock") {
        if (aiPick === "scissors") {
            userScore += 1;
            return 1;
        } else if (aiPick === "paper") {
            aiScore += 1;
            return 2;
        }
        return 0;
    } else if (playerPick === "paper") {
        if (aiPick === "rock") {
            userScore += 1;
            return 1;
        } else if (aiPick === "scissors") {
            aiScore += 1;
            return 2;
        }
        return 0;
    } else if (playerPick === "scissors") {
        if (aiPick === "paper") {
            userScore += 1;
            return 1;
        } else if (aiPick === "rock") {
            aiScore += 1;
            return 2;
        }
        return 0;
    } else {
        throw 'Something went wrong while checking who won,'
    }
}

// Check if game has ended (if either the player or the AI got a score of 5).
// Not finished === 0
// User win === 1
// AI win === 2
function checkGameOver() {
    if (userScore < 5 && aiScore < 5) {
        return 0;
    } else if (userScore >= 5) {
        gameOver = true;
        let div = createGameOverMessage('win');
        appendToContainer(div);
        return 1;
    } else if (aiScore >= 5) {
        gameOver = true;
        let div = createGameOverMessage('lose');
        appendToContainer(div);
        return 2;
    }
}

function createGameOverMessage(condition) {
    const div = document.createElement('div');
    div.style.borderStyle = 'solid';
    if (condition === 'win') {
        div.textContent = 'Congratulations, you won!'
    } else {
        div.textContent = 'Sorry, you lost!'
    }
    div.classList.add('overmessage');
    return div;
}

function appendToContainer(div) {
    const container = document.querySelector('.container');
    container.appendChild(div);
}

function removeFromContainer() {
    const container = document.querySelector('.container');
    container.removeChild(container.firstChild);
}

// Reset game, reset score count.
function resetGame() {
    userScore = 0;
    aiScore = 0;
    gameOver = false;
    document.getElementById("currentUserScore").innerHTML = userScore;
    document.getElementById("currentAiScore").innerHTML = aiScore;
    document.getElementById("battleResult").src = './someimg.jpg';
    document.getElementById("userBattlePick").src = './someimg.jpg';
    document.getElementById("aiBattlePick").src = './someimg.jpg';
    removeFromContainer();
}
window.onload = function() {
    document.getElementById("userRock").addEventListener("click", function(){playRound("rock")});
    document.getElementById("userPaper").addEventListener("click", function(){playRound("paper")});
    document.getElementById("userScissors").addEventListener("click", function(){playRound("scissors")});
    document.getElementById("resetButton").addEventListener("click", function(){resetGame()});
}
