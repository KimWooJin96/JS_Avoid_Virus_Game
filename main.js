"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const countCarrots = document.querySelector(".game__leftcarrot");

const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

const CARROT_SIZE = 80;
const CARROT_COUNT = 9;
const BUG_SIZE = 50;
const BUG_COUNT = 9;

let time = 9;
let gameStart = false;
let timerGo;

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
}

function playTimer() {
  time -= 1;
  timer.innerText = `0:${time}`;
  if (time <= 0) {
    timer.innerText = `0:0`;
    return;
  }
}

function stopTimer() {
  clearInterval(timerGo);
}

function setTimer() {
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
  console.log("stop");
  stopTimer();
}

function playGame() {
  field.innerHTML = "";
  createImg(carrot, CARROT_COUNT, "carrot");
  createImg(bug, BUG_COUNT, "bug");
  countLeftCarrots();
  showTimerAndLeftCarrots();
  showPauseBtn();
  setTimer();
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
