"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as Sound from "./sound.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_SIZE = 50;
const BUG_COUNT = 10;
const REMAIN_TIME = 10;

const playBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const countCarrots = document.querySelector(".game__leftcarrot");

let time = REMAIN_TIME;
let gameStart = false;
let timerGo;

const gameFinishBanner = new PopUp();
const gameField = new Field();

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
    Sound.playWin();
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
    Sound.bugSound();
    finishGame("Time Over!");
    return;
  }
  time -= 1;
}

function setTimer() {
  playTimer();
  timerGo = setInterval(playTimer, 1000);
}

function finishGame(text) {
  gameStart = false;
  Sound.stopBg();
  showStartBtn();
  clearInterval(timerGo);

  gameFinishBanner.show(text);

  hideStopBtn();
  stopTimer();
}

function stopGame() {
  gameStart = false;
  Sound.stopBg();
  stopTimer();
  gameFinishBanner.show("Try again?");
  hideStopBtn();
}

function playGame() {
  gameStart = true;
  time = REMAIN_TIME;
  gameField.set();
  countLeftCarrots();
  showTimerAndLeftCarrots();
  showPauseBtn();
  setTimer();
}

gameFinishBanner.setClickListener(() => {
  playGame();
});

gameField.setClickListener((item) => {
  if (!gameStart) {
    return;
  }
  if (item === "carrot") {
    countLeftCarrots();
  } else if (item === "bug") {
    finishGame("Try Again?");
  }
});

playBtn.addEventListener("click", () => {
  Sound.playAlert();
  if (!gameStart) {
    playGame();
  } else {
    stopGame();
  }
});
