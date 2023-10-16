
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; 
let boardHeight = tileSize * rows; 
let context;


let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipVelocityX = tileSize; gi

window.onload = function() {
    board = document.getElementById("invader");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    shipImg = new Image()
    shipImg.src = "./player.png";
    shipImg.onload = function() {
        context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);
    }
    requestAnimationFrame(update);
    document.addEventListener("keydown",moveship)
}
function update() 
{
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);
    context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);
}
function moveship(e) {
 if(e.code == "ArrowLeft" && ship.x - shipVelocityX >=0){
    ship.x -= shipVelocityX;
 }
 else if(e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width)
 {
    ship.x += shipVelocityX; 
}
}