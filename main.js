"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");

const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

let time = 10;

function setTimer() {
  time -= 1;
  timer.innerText = `0:${time}`;
}

function rightOrLeft(item) {
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
    Xpos = rightOrLeft(CARROT_SIZE);
  } else {
    Xpos = rightOrLeft(BUG_SIZE);
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

function createImg(img, count) {
  let index = 0;

  for (let i = 0; i < count; i++) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", `${img}`);
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

function init() {
  playBtn.addEventListener("click", () => {
    createImg(carrot, 10);
    createImg(bug, 10);

    setInterval(setTimer, 1000);
  });
}

init();
