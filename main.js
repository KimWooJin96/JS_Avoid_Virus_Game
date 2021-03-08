"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_SIZE = 50;
const BUG_COUNT = 10;
const REMAIN_TIME = 10;

const gameFinishBanner = new PopUp();
const game = new Game();

gameFinishBanner.setClickListener(() => {
  game.start();
});

game.chooseTextPopUp((reason) => {
  switch (reason) {
    case "pause":
      gameFinishBanner.show("Try again?");
      break;
    case "win":
      gameFinishBanner.show("You Won!");
      break;
    case "timeover":
      gameFinishBanner.show("Time Over!");
      break;
    case "bug":
      gameFinishBanner.show("You Lost!");
      break;
    default:
      console.log("error");
      break;
  }
});
