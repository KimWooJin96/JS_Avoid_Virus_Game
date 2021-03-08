"use strict";

import PopUp from "./popup.js";
import { Reason, GameBuilder } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withCarrotCount(10)
  .withBugCount(10)
  .withDurationTime(10)
  .build();

gameFinishBanner.setClickListener(() => {
  game.start();
});

game.chooseTextPopUp((reason) => {
  switch (reason) {
    case Reason.pause:
      gameFinishBanner.show("Try again?");
      break;
    case Reason.win:
      gameFinishBanner.show("You Won!");
      break;
    case Reason.timeover:
      gameFinishBanner.show("Time Over!");
      break;
    case Reason.bug:
      gameFinishBanner.show("You Lost!");
      break;
    default:
      console.log("error");
      break;
  }
});
