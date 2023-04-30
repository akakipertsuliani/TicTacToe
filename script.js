let buttons = document.querySelectorAll(".XO");
let playerIcon = document.querySelectorAll(".player-icon")
let gameBlocker = document.getElementById("GAME-BLOCKER");
let scoreXFeedback = document.getElementById("playerX");
let scoreOFeedback = document.getElementById("playerO");
let scoreTieFeedback = document.getElementById("tie");
let continueButton = document.getElementById("CONTINUE-BUTTON");
let restartButton = document.getElementById("RESTART-BUTTON");
let alertText = document.getElementById("ALERT-TEXT");
let winCom = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;
let num = 0;
let tieTest = 0;
let checkGameWinState = false;

const displayGameScore = () => {
    scoreXFeedback.innerHTML = `${scoreO} Wins`;
    scoreOFeedback.innerHTML = `${scoreO} Wins`;
    scoreTieFeedback.innerHTML = `${scoreO} Draws`;
}

displayGameScore();

continueButton.style = "box-shadow: 0 10px 2px #6e0d0d";


const checkWinner = () => {
    let results = "Nothing";
    for (let i = 0; i < 8; i++) {
        if (buttons[winCom[i][0]].getAttribute("data-symbol") === 'X'
            && buttons[winCom[i][1]].getAttribute("data-symbol") === 'X'          
            && buttons[winCom[i][2]].getAttribute("data-symbol") === 'X') {
                results = 'X';
                gameStateWin = true;
                break;
        } else if (buttons[winCom[i][0]].getAttribute("data-symbol") === 'O' 
            && buttons[winCom[i][1]].getAttribute("data-symbol") === 'O'          
            && buttons[winCom[i][2]].getAttribute("data-symbol") === 'O') {
                results = 'O';
                gameStateWin = true;
                break;
        }
    }
    return results;
}


const checkTie = () => {
    let tieScore = 0;
    for (let i = 0; i < 9; i++) {
        if (buttons[i].getAttribute("data-symbol") != 'null') {
            tieScore++;
        }
    }
    return tieScore === 9 ? true : false;
}


const winnerReact = () => {
    let checkWinnerState = checkWinner();

    if (checkWinnerState === 'X') {
        gameBlocker.style = "display: inline-flex; justify-content: center; align-items: center;";
        alertText.style = "color: #01C9E4;";
        alertText.innerHTML = "Winner is X";
        setTimeout(function() {    
            alertText.innerHTML = "";
        }, 2000);
        scoreX++;
        scoreXFeedback.innerHTML = `${scoreX} Wins`;
        continueButton.disabled = false;
        continueButton.style = "box-shadow: 0 10px 2px #222296";
        return "Win";
    } else if (checkWinnerState === 'O') {
        gameBlocker.style = "display: inline-flex; justify-content: center; align-items: center;"
        alertText.style = "color: #1F1D88;";
        alertText.innerHTML = "Winner is O";
        setTimeout(function() {
            alertText.innerHTML = "";
        }, 2000);
        scoreO++;
        scoreOFeedback.innerHTML = `${scoreO} Wins`;
        continueButton.disabled = false;
        continueButton.style = "box-shadow: 0 10px 2px #222296";
        return "Win";
    }
    return "Not yet";
}


restartButton.addEventListener('click', function(){
    for (let i = 0; i < 9; i++) {
        playerIcon[i].style = "display: none;";
        playerIcon[i].src = null;
        gameBlocker.style = "display: none;"
        scoreX = 0;
        scoreO = 0;
        scoreTie = 0;
        tieTest = 0;
        displayGameScore();
        buttons[i].dataset.symbol = "null"; 
    }
    continueButton.disabled = false;
    continueButton.style = "box-shadow: 0 10px 2px #6e0d0d";
})

continueButton.addEventListener('click', function() {
    for (let i = 0; i < 9; i++) {
        playerIcon[i].style = "display: none;";
        playerIcon[i].src = "";
        gameBlocker.style = "display: none;"
        buttons[i].dataset.symbol = "null";
        tieTest = 0;      
    }
    continueButton.disabled = true;
    continueButton.style = "box-shadow: 0 10px 2px #6e0d0d";
})


buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {   
        for (let i = 0; i < 9; i++) {
            if (button.getAttribute("data-symbol") === 'X' || button.getAttribute("data-symbol") === 'O') {
                gameBlocker.style = "display: inline-flex; justify-content: center; align-items: center;"
                alertText.style = "color: red;";
                alertText.innerHTML = "Don't do it";
                setTimeout(function() {
                    alertText.innerHTML = "";
                    gameBlocker.style = "display: none";
                }, 2000);
                break;
            } else if (num ===  0) {
                playerIcon[button.getAttribute("data-num")].src = "image/playerX.png";
                playerIcon[button.getAttribute("data-num")].style = "display: inline";
                tieTest++;
                button.dataset.symbol = 'X';
                num += 1;
                break;
            } else if (num === 1) {
                playerIcon[button.getAttribute("data-num")].src = "image/playerO.png";
                playerIcon[button.getAttribute("data-num")].style = "display: inline";
                button.dataset.symbol = 'O';
                tieTest++;
                num -= 1;
                break;
            }

        }
        
        let controlWinPosition = winnerReact();
        
        if (controlWinPosition === "Not yet") {
            if (checkTie()) {
                gameBlocker.style = "display: inline-flex; justify-content: center; align-items: center;"
                alertText.style = "color: #444444;";
                alertText.innerHTML = "Game is Tie";
                setTimeout(function() {
                    alertText.innerHTML = "";
                }, 2000);
                scoreTie++;
                scoreTieFeedback.innerHTML = `${scoreTie} Draws`;
                continueButton.disabled = false;
                continueButton.style = "box-shadow: 0 10px 2px #222296";
            }
        }       
    })
})