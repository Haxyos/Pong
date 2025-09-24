async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var keyState = {};
let body = document.querySelector("body");
let canva = document.getElementById("canva");
let ctx = canva.getContext("2d");
let leftInput = document.getElementById("leftInput");
let rightInput = document.getElementById("rightInput");
let lancer1 = false;
let lancer2 = false;
let rectangleX = canva.width / 2 - 30;
let rectangleY = canva.height - 50;
let rectangleWidth = 60;
let rectangleHeight = 8;
let clickGauche = false;
let clickDroit = false;
let x = canva.width / 2;
let radius = 7.5;
let y = rectangleY + radius;
let dx = 0;
let dy = 0;
let gameLoose = false;
let dateDebut = Date.now();
let id;
function drawBackground() {
  ctx.fillStyle = "darkblue";
  ctx.fillRect(0, 0, canva.width, canva.height);
}

drawBackground();

function resetCanva() {
  if (lancer1) {
    lancer2 = true;
  } else {
    lancer1 = true;
  }
  dx = Math.random() * 2 + Math.random() * -3;
  while (dx < 0.8 && dx > -0.8) {
    dx = Math.random() * 2 + Math.random() * -3;
  }
  dy = -2;
  x = canva.width / 2;
  y = rectangleY - radius;
  rectangleX = canva.width / 2 - 30;
  rectangleY = canva.height - 50;
  dateDebut = Date.now();
  ctx.beginPath();
  ctx.clearRect(0, 0, canva.width, canva.height);
  drawBackground();
  drawBall();
  drawPad();
  ctx.closePath();
  if (!gameLoose) {
    startGame();
  }
  gameLoose = false;
}

function drawPad() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canva.width, canva.height);
  ctx.fillStyle = "darkblue";
  ctx.fillRect(0, 0, canva.width, canva.height);
  ctx.fillStyle = "white";
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}

async function draw() {
  if (gameLoose) {
    cancelAnimationFrame(id);
    resetCanva();
    return;
  }
  if (lancer2) {
    cancelAnimationFrame(id);
  }
  x += dx;
  y += dy;
  drawBall();
  drawPad();
  if (canva.height - y < radius) {
    gameLoose = true;
    document.getElementById("flashbang").classList.remove("hidden");
    await sleep(1500);
    document.getElementById("flashbang").classList.add("fade-out");
    await sleep(1000);
    document.getElementById("flashbang").classList.add("hidden");
    document.getElementById("flashbang").classList.remove("fade-out")
    lancer1 = false;
    lancer2 = false;
  }

  if (canva.height - y < radius || y < radius) {
    dx = dx;
    dy = -dy;
  }
  if (canva.width - x < radius || x < radius) {
    dx = -dx;
    dy = dy;
  }

  if (
    y + radius > rectangleY &&
    x > rectangleX &&
    x < rectangleX + rectangleWidth
  ) {
    dx = dx;
    dy = -dy - 0.15;
  }
  if (clickGauche) {
    if (rectangleX > 0) {
      rectangleX -= 5;
    }
  }
  if (clickDroit) {
    if (rectangleX + rectangleWidth < canva.width) {
      rectangleX += 5;
    }
  }
  let timer = Date.now();
  document.getElementById("Score").innerHTML =
    "Score : " + Math.floor((timer - dateDebut) / 1000) + " s";
  id = requestAnimationFrame(draw);
}
window.addEventListener(
  "keydown",
  function (e) {
    keyState[e.keyCode || e.which] = true;
  },
  true
);
window.addEventListener(
  "keyup",
  function (e) {
    keyState[e.keyCode || e.which] = false;
  },
  true
);

function mouseDownLeft() {
  clickGauche = true;
}

function mouseDownRight() {
  clickDroit = true;
}

function mouseUpLeft() {
  clickGauche = false;
}

function mouseUpRight() {
  clickDroit = false;
}

leftInput.addEventListener("touchstart", () => {
  clickGauche = true;
});

rightInput.addEventListener("touchstart", () => {
  clickDroit = true;
});

leftInput.addEventListener("touchend", () => {
  clickGauche = false;
});

rightInput.addEventListener("touchend", () => {
  clickDroit = false;
});

function gameLoop() {
  if (keyState[37] || keyState[65]) {
    if (rectangleX > 0) {
      rectangleX -= 5;
    }
  }
  if (keyState[39] || keyState[68]) {
    if (rectangleX + rectangleWidth < canva.width) {
      rectangleX += 5;
    }
  }
  setTimeout(gameLoop, 10);
}

function startGame() {
  draw();
}

gameLoop();
