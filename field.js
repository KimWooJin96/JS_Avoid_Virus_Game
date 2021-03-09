"use strict";

import * as Sound from "./sound.js";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotSize = CARROT_SIZE;
    this.bugSize = BUG_SIZE;

    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.carrot = "/img/person.png";
    this.bug = "/img/virus.png";
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      Sound.playCarrot();
      this.field.removeChild(target);
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      Sound.playBug();
      this.onItemClick && this.onItemClick("bug");
    }
  };

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  set() {
    Sound.playBg();
    this.field.innerHTML = "";
    this.createImg(this.carrot, this.carrotCount, "carrot");
    this.createImg(this.bug, this.bugCount, "bug");
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
      // newImg.style.transform = `translate(${imgPositionX}px, ${imgPositionY}px)`;
      // 왼쪽이 기준
      newImg.style.top = `${imgPositionY}px`;
      newImg.style.left = `${imgPositionX}px`;

      index += 1;
    }
  }

  randomX(img) {
    let Xpos = 0;
    if (img === this.carrot) {
      Xpos = Math.floor(
        Math.random() * (this.fieldRect.width - this.carrotSize + 1)
      );
    } else {
      Xpos = Math.floor(
        Math.random() * (this.fieldRect.width - this.bugSize + 1)
      );
    }
    return Xpos;
  }

  randomY(img) {
    let Ypos = 0;
    if (img === this.carrot) {
      Ypos = Math.floor(
        Math.random() * (this.fieldRect.height - this.carrotSize + 1)
      );
    } else {
      Ypos = Math.floor(
        Math.random() * (this.fieldRect.height - this.bugSize + 1)
      );
    }
    return Ypos;
  }

  // chooseRightOrLeft(item) {
  //   let rightOrLeft = 1;
  //   let X = 0;

  //   rightOrLeft = Math.round(Math.random()) ? 1 : -1;
  //   if (rightOrLeft === -1) {
  //     X = Math.floor(Math.random() * (this.fieldRect.width / 2 + 1)) * -1;
  //   } else {
  //     X = Math.floor(Math.random() * (this.fieldRect.width / 2 - item + 1));
  //   }

  //   return X;
  // }

  // randomX(img) {
  //   let Xpos = 0;
  //   if (img === this.carrot) {
  //     Xpos = this.chooseRightOrLeft(this.carrotSize);
  //   } else {
  //     Xpos = this.chooseRightOrLeft(this.bugSize);
  //   }
  //   return Xpos;
  // }

  // randomY(img) {
  //   let Ypos = 0;
  //   if (img === this.carrot) {
  //     Ypos = Math.floor(
  //       Math.random() * (this.fieldRect.height - this.carrotSize + 1)
  //     );
  //   } else {
  //     Ypos = Math.floor(
  //       Math.random() * (this.fieldRect.height - this.bugSize + 1)
  //     );
  //   }
  //   return Ypos;
  // }
}
