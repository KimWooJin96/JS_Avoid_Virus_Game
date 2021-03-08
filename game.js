"use strict";

import Field from "./field.js";
import * as Sound from "./sound.js";

export const Reason = Object.freeze({
  pause: "pause",
  win: "win",
  bug: "bug",
  timeover: "timeover",
});
export class GameBuilder {
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withDurationTime(sec) {
    this.durationTime = sec;
    return this;
  }

  build() {
    return new Game(this.carrotCount, this.bugCount, this.durationTime);
  }
}
class Game {
  constructor(carrotCount, bugCount, durationTime) {
    this.gameField = new Field(carrotCount, bugCount);

    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.durationTime = durationTime;

    this.playBtn = document.querySelector(".game__button");
    this.timer = document.querySelector(".game__timer");
    this.countCarrots = document.querySelector(".game__leftcarrot");

    this.gameStart = false;
    this.timerGo;
    this.time = undefined;

    this.playBtn.addEventListener("click", () => {
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
        this.finish(Reason.bug);
      }
    });
  }

  chooseTextPopUp(popUpText) {
    this.popUpText = popUpText;
  }

  start() {
    this.gameStart = true;
    this.gameField.set();
    this.time = this.durationTime;

    this.countLeftCarrots();
    this.showTimerAndLeftCarrots();
    this.showPauseBtn();
    this.setTimer();
  }

  stop() {
    this.gameStart = false;
    this.stopTimer();
    this.hidePauseBtn();
    this.popUpText && this.popUpText(Reason.pause);
    Sound.stopBg();
  }

  finish(text) {
    this.gameStart = false;
    this.showStartBtn();
    this.hidePauseBtn();
    this.stopTimer();
    this.popUpText && this.popUpText(text);
    Sound.stopBg();
  }

  setTimer() {
    this.playTimer();
    this.timerGo = setInterval(this.playTimer, 1000);
  }

  playTimer = () => {
    const minute = Math.floor(this.time / 60);
    const second = this.time % 60;
    this.timer.innerText = `${minute} : ${second}`;
    if (this.time <= 0) {
      Sound.playAlert();
      this.finish(Reason.timeover);
      return;
    }
    this.time -= 1;
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
      this.finish(Reason.win);
      Sound.playWin();
    }
  }
}
