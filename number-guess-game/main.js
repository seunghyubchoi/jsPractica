let computerNum = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");

let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let history = [];

let chances = 5;
let gameOver = false;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
/*
userInput.addEventListener("focus", function() {
    userInput.value = "";
});
*/
userInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter") { // 구형 13
        play();
    }
})
function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100) + 1;
    
    console.log(`정답 : ${computerNum}`);
}

function play() {
    let userValue = userInput.value;
    if(userValue > 100 || userValue < 1) {
        resultArea.textContent = "1부터 100 사이 숫자를 입력해주세요.";
        return;
    }
    
    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    displayChances(chances);
    if(userValue < computerNum) {
        displayResultArea("UP!!!");
    } else if(userValue > computerNum) {
        displayResultArea("DOWN!!!");
    } else if(userValue == computerNum) {
        displayResultArea("맞췄어요!!");
        gameOver = true;
    } else {
        displayResultArea("재도전 해주세요...");
    }

    history.push(userValue);

    if(chances < 1) {
        gameOver=true;
    }

    if(gameOver) {
        playButton.disabled = true;
    }    
    userInput.value = "";
    userInput.focus();
}

function reset() {
    // user input clear
    userInput.value = "";
    // new num
    pickRandomNum();
    // input disabled = N
    playButton.disabled = false;
    chances = 5;
    gameOver = false;
    history = [];

    displayChances(chances);
    displayResultArea("결과값이 여기 나옵니다!");
}

function displayChances(chances) {
     chanceArea.textContent = `남은 기회 : ${chances}`
}

function displayResultArea(content) {
    resultArea.textContent = content;
}

pickRandomNum();