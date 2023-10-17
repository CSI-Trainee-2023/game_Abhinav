
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
let shipY = tileSize * rows - tileSize*1;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

//aleins
let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;

let shipImg;
let shipVelocityX = tileSize; 


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

    
    alienImg = new Image();
    alienImg.src = "./enemy1.png";
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown",moveship)

}
function update() 
{
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);
    //ship
    context.drawImage(shipImg,ship.x,ship.y,ship.width,ship.height);
    //alein
    for(let i=0;i<alienArray.length;i++)
    {
        let alien = alienArray[i];
        if(alien.alive)
        {
        context.drawImage(alienImg,alien.x,alien.y,alien.width,alien.height)
        }
    }
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
function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img : alienImg,
                x : alienX + c*alienWidth,
                y : alienY + r*alienHeight,
                width : alienWidth,
                height : alienHeight,
                alive : true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}
