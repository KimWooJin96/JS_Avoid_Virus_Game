"use strict";

import Field from "./field.js";
import * as Sound from "./sound.js";

export const Reason = Object.freeze({
  pause: "pause",
  win: "win",
  virus: "virus",
  timeover: "timeover",
});
export class GameBuilder {
  withPersonCount(num) {
    this.personCount = num;
    return this;
  }

  withVirusCount(num) {
    this.virusCount = num;
    return this;
  }

  withDurationTime(sec) {
    this.durationTime = sec;
    return this;
  }

  build() {
    return new Game(this.personCount, this.virusCount, this.durationTime);
  }
}
class Game {
  constructor(personCount, virusCount, durationTime) {
    this.gameField = new Field(personCount, virusCount);

    this.personCount = personCount;
    this.virusCount = virusCount;
    this.durationTime = durationTime;

    this.playBtn = document.querySelector(".game__button");
    this.timer = document.querySelector(".game__timer");
    this.countPeople = document.querySelector(".game__leftperson");

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
      if (item === "person") {
        this.countLeftPeople();
      } else if (item === "virus") {
        this.finish(Reason.virus);
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

    this.countLeftPeople();
    this.showTimerAndLeftPeople();
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

  showTimerAndLeftPeople() {
    this.timer.style.visibility = "visible";
    this.countPeople.style.visibility = "visible";
  }

  countLeftPeople() {
    const images = document.querySelectorAll(".person");
    const leftPeople = images.length;
    this.countPeople.innerText = `${leftPeople}`;

    if (leftPeople === 0) {
      this.finish(Reason.win);
      Sound.playWin();
    }
  }
}
