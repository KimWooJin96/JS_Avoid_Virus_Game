"use strict";

import * as Sound from "./sound.js";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpRefreshBtn = document.querySelector(".pop-up__icon");
    this.popUpMessage = this.popUp.querySelector(".pop-up__message");

    this.popUpRefreshBtn.addEventListener("click", () => {
      Sound.playAlert();
      this.popUp.classList.add("pop-up--hide");
      this.onClick && this.onClick();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(text) {
    this.popUp.classList.remove("pop-up--hide");
    this.popUpMessage.innerText = text;
  }
}
