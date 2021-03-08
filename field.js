"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_SIZE = 50;
const BUG_COUNT = 10;

const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const bgSound = new Audio("/sound/bg.mp3");

export default class Field {
  constructor() {
    this.carrot = "/img/carrot.png";
    this.bug = "/img/bug.png";
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      playAudio(carrotSound);
      this.field.removeChild(target);
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      playAudio(bugSound);
      this.onItemClick && this.onItemClick("bug");
    }
  };

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  set() {
    playAudio(bgSound);
    this.field.innerHTML = "";
    this.createImg(this.carrot, CARROT_COUNT, "carrot");
    this.createImg(this.bug, BUG_COUNT, "bug");
  }

  createImg(img, count, className) {
    let index = 0;

    for (let i = 0; i < count; i++) {
      const newImg = document.createElement("img");
      newImg.setAttribute("src", `${img}`);
      newImg.setAttribute("class", `${className}`);
      newImg.id = index;
      this.field.appendChild(newImg);

      const imgPositionX = this.randomX(img);
      const imgPositionY = this.randomY(img);
      // 가운데가 기준
      newImg.style.transform = `translate(${imgPositionX}px, ${imgPositionY}px)`;
      // 왼쪽이 기준
      // newImg.style.top = `${0}px`;
      // newImg.style.left = `${0}px`;

      index += 1;
    }
  }

  chooseRightOrLeft(item) {
    let rightOrLeft = 1;
    let X = 0;

    rightOrLeft = Math.round(Math.random()) ? 1 : -1;
    if (rightOrLeft === -1) {
      X = Math.floor(Math.random() * (this.fieldRect.width / 2 + 1)) * -1;
    } else {
      X = Math.floor(Math.random() * (this.fieldRect.width / 2 - item + 1));
    }

    return X;
  }

  randomX(img) {
    let Xpos = 0;
    if (img === this.carrot) {
      Xpos = this.chooseRightOrLeft(CARROT_SIZE);
    } else {
      Xpos = this.chooseRightOrLeft(BUG_SIZE);
    }
    return Xpos;
  }

  randomY(img) {
    let Ypos = 0;
    if (img === this.carrot) {
      Ypos = Math.floor(
        Math.random() * (this.fieldRect.height - CARROT_SIZE + 1)
      );
    } else {
      Ypos = Math.floor(Math.random() * (this.fieldRect.height - BUG_SIZE + 1));
    }
    return Ypos;
  }
}

function playAudio(sound) {
  sound.currentTime = 0;
  sound.play();
}
