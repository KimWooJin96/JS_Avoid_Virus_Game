const personSound = new Audio(
  "https://user-images.githubusercontent.com/62231339/110434836-a516a680-80f5-11eb-9ccc-758b6507f71e.mp4"
);
const virusSound = new Audio(
  "https://user-images.githubusercontent.com/62231339/110434866-ad6ee180-80f5-11eb-8fc6-d73c6acaa140.mp4"
);
const alertSound = new Audio(
  "https://user-images.githubusercontent.com/62231339/110434745-89130500-80f5-11eb-9abb-078446ec2b35.mp4"
);
const winSound = new Audio(
  "https://user-images.githubusercontent.com/62231339/110434798-9c25d500-80f5-11eb-878c-53dea0b5cdda.mp4"
);
const bgSound = new Audio(
  "https://user-images.githubusercontent.com/62231339/110434771-916b4000-80f5-11eb-8388-02f2a1c26089.mp4"
);

export function playPerson() {
  playAudio(personSound);
}

export function playVirus() {
  playAudio(virusSound);
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
