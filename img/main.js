<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Carrot game</title>
    <link rel="stylesheet" href="style.css" />
    <script src="main.js" defer></script>
    <script
      src="https://kit.fontawesome.com/d355f46a66.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <section class="game">
      <button class="game__start">
        <i class="fas fa-play"></i>
      </button>
      <button class="game__quit">
        <i class="fas fa-square"></i>
      </button>
      <div class="game__timer">0:10</div>
      <span class="game__leftcarrot">10</span>

      <div class="game__carrot">
        <img src="/img/carrot.png" alt="" />
      </div>
      <div class="game__bug">
        <img src="/img/bug.png" alt="" />
      </div>

      <div class="game__win">
        <button class="game__undo">
          <i class="fas fa-undo"></i>
          <span class="game__win__text">YOU WON</span>
        </button>
      </div>

      <div class="game__lose">
        <button class="game__undo">
          <i class="fas fa-undo"></i>
          <span class="game__lose__text">YOU LOST</span>
        </button>

    </section>
  </body>
</html>
