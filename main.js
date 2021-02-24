const field = document.querySelector(".game__field");
const carrot = "/img/carrot.png";
const bug = "/img/bug.png";

let index = 0;

function randomX(img) {
  let X = 0;
  if (img === carrot) {
    X = Math.floor(Math.random() * (400 - 80 + 1));
    X *= Math.floor(Math.random() * 2) ? 1 : -1;
  } else {
    X = Math.floor(Math.random() * (400 - 50 + 1));
    X *= Math.floor(Math.random() * 2) ? 1 : -1;
  }
  return X;
}

function randomY(img) {
  let Y = 0;
  if (img === carrot) {
    Y = Math.floor(Math.random() * (235 - 80 + 1));
  } else {
    Y = Math.floor(Math.random() * (235 - 50 + 1));
  }
  return Y;
}

function createImg(img) {
  const newImg = document.createElement("img");
  newImg.setAttribute("src", `${img}`);
  newImg.id = index;
  field.appendChild(newImg);

  const imgPositionX = randomX(img);
  const imgPositionY = randomY(img);
  console.log(imgPositionX, imgPositionY);

  newImg.style.transform = `translate(${imgPositionX}px, ${imgPositionY}px)`;
  // newImg.style.top = `${imgPositionX}px`;
  // newImg.style.left = `${imgPositionY}px`;

  index += 1;
}

createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(carrot);
createImg(bug);
createImg(bug);
createImg(bug);
createImg(bug);
createImg(bug);
createImg(bug);
createImg(bug);
