"use strict";

import * as Sound from "./sound.js";

const PERSON_SIZE = 80;
const VIRUS_SIZE = 50;
export default class Field {
  constructor(personCount, virusCount) {
    this.personSize = PERSON_SIZE;
    this.virusSize = VIRUS_SIZE;

    this.personCount = personCount;
    this.virusCount = virusCount;

    this.person = "/img/person.png";
    this.virus = "/img/virus.png";
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".person")) {
      Sound.playPerson();
      this.field.removeChild(target);
      this.onItemClick && this.onItemClick("person");
    } else if (target.matches(".virus")) {
      Sound.playVirus();
      this.onItemClick && this.onItemClick("virus");
    }
  };

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  set() {
    Sound.playBg();
    this.field.innerHTML = "";
    this.createImg(this.person, this.personCount, "person");
    this.createImg(this.virus, this.virusCount, "virus");
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
      newImg.style.top = `${imgPositionY}px`;
      newImg.style.left = `${imgPositionX}px`;

      index += 1;
    }
  }

  randomX(img) {
    let Xpos = 0;
    if (img === this.person) {
      Xpos = Math.floor(
        Math.random() * (this.fieldRect.width - this.personSize + 1)
      );
    } else {
      Xpos = Math.floor(
        Math.random() * (this.fieldRect.width - this.virusSize + 1)
      );
    }
    return Xpos;
  }

  randomY(img) {
    let Ypos = 0;
    if (img === this.person) {
      Ypos = Math.floor(
        Math.random() * (this.fieldRect.height - this.personSize + 1)
      );
    } else {
      Ypos = Math.floor(
        Math.random() * (this.fieldRect.height - this.virusSize + 1)
      );
    }
    return Ypos;
  }
}
