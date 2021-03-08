"use strict";

import Field from "./field.js";
import * as Sound from "./sound.js";

const REMAIN_TIME = 10;
let time = REMAIN_TIME;

export default class Game {
  constructor() {
    this.gameField = new Field();

    this.playBtn = document.querySelector(".game__button");
    this.timer = document.querySelector(".game__timer");
    this.countCarrots = document.querySelector(".game__leftcarrot");

    this.gameStart = false;
    this.timerGo;

    this.playBtn.addEventListener("click", () => {
      Sound.playAlert();
      if (!this.gameStart) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.gameField.setClickListener((item) => {
      if (!this.gameStart) {
        return;
      }
      if (item === "carrot") {
        this.countLeftCarrots();
      } else if (item === "bug") {
        this.finish("bug");
      }
    });
  }

  chooseTextPopUp(popUpText) {
    this.popUpText = popUpText;
  }

  start() {
    this.gameStart = true;
    time = REMAIN_TIME;

    this.gameField.set();
    this.countLeftCarrots();
    this.showTimerAndLeftCarrots();
    this.showPauseBtn();
    this.setTimer();
  }

  stop() {
    this.gameStart = false;
    Sound.stopBg();
    this.stopTimer();
    // gameFinishBanner.show("Try again?");
    this.hidePauseBtn();
    this.popUpText && this.popUpText("pause");
  }

  finish(text) {
    this.gameStart = false;
    Sound.stopBg();
    this.showStartBtn();
    clearInterval(this.timerGo);
    //gameFinishBanner.show(text);
    this.hidePauseBtn();
    this.stopTimer();
    this.popUpText && this.popUpText(text);
  }
  setTimer() {
    this.playTimer();
    this.timerGo = setInterval(this.playTimer, 1000);
  }

  playTimer = () => {
    const minute = Math.floor(time / 60);
    const second = time % 60;
    this.timer.innerText = `${minute} : ${second}`;
    if (time <= 0) {
      Sound.playBug();
      this.finish("timeover");
      return;
    }
    time -= 1;
  };

  stopTimer() {
    clearInterval(this.timerGo);
  }

  showStartBtn() {
    const fa_square = this.playBtn.querySelector("i");
    fa_square.classList.add("fa-play");
    fa_square.classList.remove("fa-square");
    this.playBtn.style.visibility = "visible";
  }

  showPauseBtn() {
    const fa_play = this.playBtn.querySelector("i");
    fa_play.classList.add("fa-square");
    fa_play.classList.remove("fa-play");
    this.playBtn.style.visibility = "visible";
  }

  hidePauseBtn() {
    this.playBtn.style.visibility = "hidden";
  }

  showTimerAndLeftCarrots() {
    this.timer.style.visibility = "visible";
    this.countCarrots.style.visibility = "visible";
  }

  countLeftCarrots() {
    const images = document.querySelectorAll(".carrot");
    const leftCarrots = images.length;
    this.countCarrots.innerText = `${leftCarrots}`;

    if (leftCarrots === 0) {
      this.finish("win");
      Sound.playWin();
    }
  }
}
