const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const alertSound = new Audio("/sound/alert.wav");
const winSound = new Audio("/sound/game_win.mp3");
const bgSound = new Audio("/sound/bg.mp3");

export function playCarrot() {
  playAudio(carrotSound);
}

export function playBug() {
  playAudio(bugSound);
}

export function playAlert() {
  playAudio(alertSound);
}

export function playWin() {
  playAudio(winSound);
}

export function playBg() {
  playAudio(bgSound);
}

export function stopBg() {
  stopAudio(bgSound);
}

function playAudio(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopAudio(sound) {
  sound.pause();
}
