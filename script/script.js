function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var keyState = {};  
let body = document.querySelector("body");
let canva = document.getElementById("canva");
let ctx = canva.getContext("2d");
let leftInput = document.getElementById("leftInput");
let rightInput = document.getElementById("rightInput");


ctx.fillStyle = "darkblue";
ctx.fillRect(0, 0, canva.width, canva.height);

let x = canva.width / 2;
let y = (canva.height / 6) * 5;
let dx = 0;
let dy = 5;
let radius = 6.5;
let gameLoose = false;
let rectangleX = canva.width/2-25;
let rectangleY = canva.height -50;
let rectangleWidth = 60;
let rectangleHeight = 8;
let dateDebut = Date.now();

function resetCanva() {
  dx = 0;
  dy = 5;
  dateDebut = Date.now();
  gameLoose = false;
  ctx.beginPath();
  ctx.clearRect(0, 0, canva.width, canva.height);

  ctx.fillStyle = "white";
  ctx.arc(canva.width / 2, (canva.height / 6) * 5, radius, 2 * Math.PI, false);
  x = canva.width / 2;
  y = (canva.height / 6) * 5;
  ctx.fill();
  drawPad();
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
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
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

  if (y + radius > rectangleY && x > rectangleX && x < rectangleX + rectangleWidth) {
    dx = dx;
    dy = -dy;
  }
  let timer = Date.now();
  console.log(timer - dateDebut);
  document.getElementById("Score").innerHTML = "Score : " + Math.floor((timer-dateDebut)/1000) + " s";
  requestAnimationFrame(draw);
}
window.addEventListener('keydown',function(e){
    keyState[e. keyCode || e.which] = true;
  },true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);
leftInput.addEventListener('click', function(e) {

});
rightInput.addEventListener('click', function(e) {
});

  function gameLoop() {
    if (keyState[37] || keyState[65]){
      if(rectangleX > 0){
        rectangleX -= 5;
      }
    }    
    if (keyState[39] || keyState[68]){
      if(rectangleX + rectangleWidth < canva.width){
        rectangleX += 5;
      } 
    }
    setTimeout(gameLoop,10)
}




function startGame() {
  resetCanva();
  dx = 1
  dy = -2
  draw();
}

  gameLoop();
