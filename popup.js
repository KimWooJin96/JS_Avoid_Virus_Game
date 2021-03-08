"use strict";

const alertSound = new Audio("/sound/alert.wav");

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpRefreshBtn = document.querySelector(".pop-up__icon");
    this.popUpMessage = this.popUp.querySelector(".pop-up__message");

    this.popUpRefreshBtn.addEventListener("click", () => {
      playAudio(alertSound);
      this.popUp.classList.add("pop-up--hide");
      this.onClick && this.onClick();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showPopUp(text) {
    this.popUp.classList.remove("pop-up--hide");
    this.popUpMessage.innerText = text;
  }
}

function playAudio(sound) {
  sound.currentTime = 0;
  sound.play();
}
