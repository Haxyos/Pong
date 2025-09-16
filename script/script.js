let canva = document.getElementById("canva");
let ctx = canva.getContext("2d");

ctx.fillStyle = "darkblue";
ctx.fillRect(0, 0, canva.width, canva.height);

let x = canva.width / 2;
let y = (canva.height / 6) * 5;
let dx = 0;
let dy = 5;
let radius = 5;
let gameLoose = false;
let rectangleX = canva.width/2-25;
let rectangleY = 550;
let rectangleWidth = 50;
let rectangleHeight = 7;


function resetCanva() {
  gameLoose = false;
  ctx.beginPath();
  ctx.clearRect(0, 0, canva.width, canva.height);

  ctx.fillStyle = "white";
  ctx.arc(canva.width / 2, (canva.height / 6) * 5, radius, 2 * Math.PI, false);
  x = canva.width / 2;
  y = (canva.height / 6) * 5;
  ctx.fill();
  ctx.closePath();
}

function drawPad() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
  ctx.fill();
    ctx.closePath();
}

function draw() {
  if (gameLoose == true) {
    return;
  }
  ctx.beginPath();
  ctx.clearRect(0, 0, canva.width, canva.height);
  ctx.fillStyle = "darkblue";
  ctx.fillRect(0, 0, canva.width, canva.height);
  ctx.fillStyle = "white";
  ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
  x += dx;
  y += dy;
  drawPad();

  if (canva.height - y < radius) {
    gameLoose = true;
  }

  if (canva.height - y < radius || y < radius) {
    dx = dx;
    dy = -dy;
  }
  if (canva.width - x < radius || x < radius) {
    dx = -dx;
    dy = dy;
  }
  if( y + radius > rectagleY && x > rectangleX && x < rectangleX + rectagleWidth){
    dx = dx;
    dy = -dy;
  }
}
function startGame() {
  drawPad();
  dx = ((Math.random() * 10) % 1) - ((Math.random() * 10) % 2) *3;
  dy = ((Math.random() * 10) % 1) - ((Math.random() * 10) % 2) *3;
  setInterval(draw, 10);
}

startGame();
