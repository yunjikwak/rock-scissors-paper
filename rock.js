let com = document.getElementsByClassName("computer")[0];
let timer = document.getElementsByClassName("timer")[0];
let condition = document.getElementsByClassName("condition")[0];
let resultScreen = document.getElementsByClassName("result")[0];

let sec = 5;
let rand = -1;
let conditionRand = -1;
let imgArr = ["scissors.png", "rock.png", "paper.png"];
let conditionToWin = ["이겨라", "비겨라", "져라"];
let timerInterval;

let startInterval = (seconds, callback) => {
  callback();
  return setInterval(callback, seconds * 1000);
};

let cntTimer = () => {
  timer.innerText = sec;
  if (sec == 5) {
    selectComChoice();
    sec--;
  } else if (sec <= 1) {
    sec = 5;
  } else {
    sec--;
  }
};

let getRandomNum = () => {
  return Math.floor(Math.random() * 3);
};

let selectComChoice = () => {
  rand = getRandomNum();
  conditionRand = getRandomNum();

  const IMG = new Image();
  IMG.src = `./src/img/${imgArr[rand]}`;
  IMG.width = 200;
  IMG.height = 200;

  com.innerHTML = "";
  com.appendChild(IMG);

  const conditionH4 = document.createElement("h4");
  conditionH4.innerText = `${conditionToWin[conditionRand]}`;
  condition.innerHTML = "";
  condition.appendChild(conditionH4);
};

timerInterval = startInterval(1, cntTimer);

let playerChoice = (choice) => {
  clearInterval(timerInterval);
  let result = rand - choice;

  if (result == -1 || result == 2) {
    if (conditionRand == 0) {
      console.log("승리");
      showGameOver("승리!");
    } else {
      console.log("패배");
      showGameOver("패배!");
    }
  } else if (result == 0) {
    if (conditionRand == 1) {
      console.log("승리");
      showGameOver("승리!");
    } else {
      console.log("패배");
      showGameOver("패배!");
    }
  } else if (result == -2 || result == 1) {
    if (conditionRand == 2) {
      console.log("승리");
      showGameOver("승리!");
    } else {
      console.log("패배");
      showGameOver("패배!");
    }
  }
};

let showGameOver = (msg) => {
  resultScreen.className += " game-over";

  const gameOverScreen = document.createElement("div");
  gameOverScreen.innerText = msg;
  resultScreen.appendChild(gameOverScreen);

  const reloadBtn = document.createElement("button");
  reloadBtn.className = "restart";
  reloadBtn.innerText = "↻";
  resultScreen.appendChild(reloadBtn);

  reloadBtn.onclick = () => {
    gameOverScreen.innerText = "3초 후 재시작";

    setTimeout(() => {
      gameOverScreen.remove();
      reloadBtn.remove();
      resultScreen.classList.remove("game-over");

      sec = 5;

      timerInterval = startInterval(1, cntTimer);
    }, 3000);
  };
};
