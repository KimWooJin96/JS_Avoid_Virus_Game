"use strict";

import PopUp from "./popup.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_SIZE = 50;
const BUG_COUNT = 10;
const REMAIN_TIME = 10;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const playBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const countCarrots = document.querySelector(".game__leftcarrot");

const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const alertSound = new Audio("/sound/alert.wav");
const winSound = new Audio("/sound/game_win.mp3");
const bgSound = new Audio("/sound/bg.mp3");

let time = REMAIN_TIME;
let gameStart = false;
let timerGo;

const gameFinishBanner = new PopUp();

function playAudio(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopAudio(sound) {
  sound.pause();
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
  playBtn.style.visibility = "visible";
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
    finishGame("You Won!");
    playAudio(winSound);
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
    playAudio(bugSound);
    finishGame("Time Over!");
    return;
  }
  time -= 1;
}

function setTimer() {
  playTimer();
  timerGo = setInterval(playTimer, 1000);
}

function chooseRightOrLeft(item) {
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
    Xpos = chooseRightOrLeft(CARROT_SIZE);
  } else {
    Xpos = chooseRightOrLeft(BUG_SIZE);
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

function finishGame(text) {
  gameStart = false;
  stopAudio(bgSound);
  showStartBtn();
  clearInterval(timerGo);

  gameFinishBanner.showPopUp(text);

  hideStopBtn();
  stopTimer();
}

function stopGame() {
  gameStart = false;
  stopAudio(bgSound);
  stopTimer();
  gameFinishBanner.showPopUp("Try again?");
  hideStopBtn();
}

function playGame() {
  playAudio(bgSound);
  gameStart = true;
  field.innerHTML = "";
  time = REMAIN_TIME;

  createImg(carrot, CARROT_COUNT, "carrot");
  createImg(bug, BUG_COUNT, "bug");

  countLeftCarrots();
  showTimerAndLeftCarrots();

  showPauseBtn();
  setTimer();
}

gameFinishBanner.setClickListener(() => {
  playGame();
});

field.addEventListener("click", (event) => {
  if (!gameStart) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    playAudio(carrotSound);
    field.removeChild(target);
    countLeftCarrots();
  } else if (target.matches(".bug")) {
    playAudio(bugSound);
    finishGame("Try Again?");
  }
});

playBtn.addEventListener("click", () => {
  playAudio(alertSound);
  if (!gameStart) {
    playGame();
  } else {
    stopGame();
  }
});
