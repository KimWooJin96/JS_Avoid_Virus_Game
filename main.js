"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const countCarrots = document.querySelector(".game__leftcarrot");
const popUp = document.querySelector(".pop-up");
const popUpIcon = document.querySelector(".pop-up__icon");
const popUpMessage = popUp.querySelector(".pop-up__message");

const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_SIZE = 50;
const BUG_COUNT = 10;
const REMAIN_TIME = 10;

let time = REMAIN_TIME;
let gameStart = false;
let timerGo;

function handlePopUpBtn() {
  time = REMAIN_TIME;
  gameStart = false;
  showStartBtn();
  popUp.classList.add("pop-up--hide");
  stopTimer();
  handleGame();
}

function showPopUp(text) {
  popUp.classList.remove("pop-up--hide");
  popUpMessage.innerText = text;
}

function hideStopBtn() {
  playBtn.style.visibility = "hidden";
}

function showStartBtn() {
  const fa_square = playBtn.querySelector("i");
  fa_square.classList.add("fa-play");
  fa_square.classList.remove("fa-square");
  playBtn.style.visibility = "visible";
}

function showPauseBtn() {
  const fa_play = playBtn.querySelector("i");
  fa_play.classList.add("fa-square");
  fa_play.classList.remove("fa-play");
}

function showTimerAndLeftCarrots() {
  timer.style.visibility = "visible";
  countCarrots.style.visibility = "visible";
}

function countLeftCarrots() {
  const images = document.querySelectorAll(".carrot");
  const leftCarrots = images.length;
  countCarrots.innerText = `${leftCarrots}`;

  if (leftCarrots === 0) {
    stopTimer();
    showPopUp("You Won!");
    popUpIcon.addEventListener("click", handlePopUpBtn);
  }
}

function stopTimer() {
  clearInterval(timerGo);
}

function playTimer() {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  timer.innerText = `${minute}:${second}`;
  if (time <= 0) {
    clearInterval(timerGo);
    showPopUp("Try again?");
    hideStopBtn();
    popUpIcon.addEventListener("click", handlePopUpBtn);
    return;
  }
  time -= 1;
}

function setTimer() {
  playTimer();
  timerGo = setInterval(playTimer, 1000);
}

function ChooseRightOrLeft(item) {
  let rightOrLeft = 1;
  let X = 0;

  rightOrLeft = Math.round(Math.random()) ? 1 : -1;
  if (rightOrLeft === -1) {
    X = Math.floor(Math.random() * (fieldRect.width / 2 + 1)) * -1;
  } else {
    X = Math.floor(Math.random() * (fieldRect.width / 2 - item + 1));
  }

  return X;
}

function randomX(img) {
  let Xpos = 0;
  if (img === carrot) {
    Xpos = ChooseRightOrLeft(CARROT_SIZE);
  } else {
    Xpos = ChooseRightOrLeft(BUG_SIZE);
  }
  return Xpos;
}

function randomY(img) {
  let Ypos = 0;
  if (img === carrot) {
    Ypos = Math.floor(Math.random() * (fieldRect.height - CARROT_SIZE + 1));
  } else {
    Ypos = Math.floor(Math.random() * (fieldRect.height - BUG_SIZE + 1));
  }
  return Ypos;
}

function createImg(img, count, className) {
  let index = 0;

  for (let i = 0; i < count; i++) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", `${img}`);
    newImg.setAttribute("class", `${className}`);
    newImg.id = index;
    field.appendChild(newImg);

    const imgPositionX = randomX(img);
    const imgPositionY = randomY(img);
    // 가운데가 기준
    newImg.style.transform = `translate(${imgPositionX}px, ${imgPositionY}px)`;
    // 왼쪽이 기준
    // newImg.style.top = `${0}px`;
    // newImg.style.left = `${0}px`;

    index += 1;
  }
}

function stopGame() {
  stopTimer();
  showPopUp("Try again?");
  hideStopBtn();
  popUpIcon.addEventListener("click", handlePopUpBtn);
}

function playGame() {
  field.innerHTML = "";
  createImg(carrot, CARROT_COUNT, "carrot");
  createImg(bug, BUG_COUNT, "bug");
  countLeftCarrots();
  showTimerAndLeftCarrots();
  showPauseBtn();
  setTimer();

  const carrots = document.querySelectorAll(".carrot");
  carrots.forEach((carrot) => {
    carrot.addEventListener("click", (event) => {
      const carrotImg = event.target;
      field.removeChild(carrotImg);
      countLeftCarrots();
    });
  });

  const bugs = document.querySelectorAll(".bug");
  bugs.forEach((bug) => {
    bug.addEventListener("click", () => {
      showPopUp("Try again?");
      stopTimer();
      popUpIcon.addEventListener("click", handlePopUpBtn);
    });
  });
}

function handleGame() {
  if (!gameStart) {
    playGame();
  } else {
    stopGame();
  }
  gameStart = !gameStart;
}

function init() {
  playBtn.addEventListener("click", () => {
    handleGame();
  });
}

init();
