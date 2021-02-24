"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

function randomX(img) {
  let rightOrLeft = 1;
  let X = 0;
  if (img === carrot) {
    rightOrLeft = Math.round(Math.random()) ? 1 : -1;
    if (rightOrLeft === -1) {
      X = Math.floor(Math.random() * (fieldRect.width / 2 + 1)) * -1;
    } else {
      X = Math.floor(Math.random() * (fieldRect.width / 2 - CARROT_SIZE + 1));
    }
  } else {
    rightOrLeft = Math.round(Math.random()) ? 1 : -1;
    if (rightOrLeft === -1) {
      X = Math.floor(Math.random() * (fieldRect.width / 2 + 1)) * -1;
    } else {
      X = Math.floor(Math.random() * (fieldRect.width / 2 - BUG_SIZE + 1));
    }
  }
  return X;
}

function randomY(img) {
  let Y = 0;
  if (img === carrot) {
    Y = Math.floor(Math.random() * (fieldRect.height - CARROT_SIZE + 1));
  } else {
    Y = Math.floor(Math.random() * (fieldRect.height - BUG_SIZE + 1));
  }
  return Y;
}

function createImg(img, count) {
  let index = 0;

  for (let i = 0; i < count; i++) {
    console.log(i);
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
  createImg(carrot, 10);
  createImg(bug, 10);
}

init();
