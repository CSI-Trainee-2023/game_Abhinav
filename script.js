
let marbleSize = 32;
let rows = 16;
let columns = 24;
let floor;
let floorWidth = marbleSize * columns; 
let floorHeight = marbleSize * rows; 
let context;
let playerWidth = marbleSize*2;
let playerHeight = marbleSize;
let playerX = marbleSize * columns/2 - marbleSize;
let playerY = marbleSize * rows - marbleSize*1;

let shoota = document.getElementById("shootaudio");
let enemya = document.getElementById("enemyaudio");

let player = {
    x : playerX,
    y : playerY,
    width : playerWidth,
    height : playerHeight
}

let enemyArray = [];
let enemyWidth = marbleSize*2;
let enemyHeight = marbleSize;
let enemyX = marbleSize;
let enemyY = marbleSize;
let enemyImg;

let enemyRows = 3;
let enemyColumns = 3;
let enemyCount = 0;
let enemyVelocityX = 2;

let bulletArray=[];
let bulletVelocityY = -10;

let playerImg;
let playerVelocityX = marbleSize; 

let score=0;
let game="Game Over !"
let gameOver=false;

window.onload = function() {
    floor = document.getElementById("invader");
    floor.width = floorWidth;
    floor.height = floorHeight;
    context = floor.getContext("2d");

    playerImg = new Image()
    playerImg.src = "Player.png";
    playerImg.onload = function() {
        context.drawImage(playerImg,player.x,player.y,player.width,player.height);
    }

    
    enemyImg = new Image();
    enemyImg.src = "enemy1.png";
    createenemys();

    requestAnimationFrame(update);
    document.addEventListener("keydown",moveplayer);
    document.addEventListener("keyup",shoot);


}
function update() 
{
    requestAnimationFrame(update);
    if(gameOver)
    {
        return;
    }
    context.clearRect(0,0,floor.width,floor.height);
    //player
    context.drawImage(playerImg,player.x,player.y,player.width,player.height);
    //alein
    for(let i=0;i<enemyArray.length;i++)
    {
        let enemy = enemyArray[i];
        if(enemy.alive)
        {
            enemy.x +=enemyVelocityX;
            if (enemy.x + enemy.width >= floor.width || enemy.x <= 0) {
                enemyVelocityX *= -1;
                enemy.x += enemyVelocityX*2;
                for (let j = 0; j < enemyArray.length; j++) {
                    enemyArray[j].y += enemyHeight;
                }
            }
        context.drawImage(enemyImg,enemy.x,enemy.y,enemy.width,enemy.height);

        if(enemy.y >= player.y)
        {
            gameOver=true;
            context.fillStyle="white";
            context.font="60px calibri";
            context.fillText(game,230,250);
            enemyaudio();
        }
        }
    }
    for(let i=0;i<bulletArray.length;i++)
    {
        let bullet=bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle="White";
        context.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);

        for(let j=0;j<enemyArray.length;j++)
        {
             let alein=enemyArray[j];
             if(!bullet.used && alein.alive && collide(bullet,alein)){
                bullet.used=true;
                alein.alive=false;
                enemyCount--;
                score +=100;
                enemyaudio();
             }
        }
    }
    while(bulletArray.length>0 && (bulletArray[0].used || bulletArray[0].y <0)){
        bulletArray.shift();
    }

        if (enemyCount == 0) {
            enemyColumns = Math.min(enemyColumns + 1, columns/2 -2); 
            enemyRows = Math.min(enemyRows + 1, rows-4); 
            enemyVelocityX += 0.4 
            enemyArray = [];
            bulletArray = [];
            createenemys();
        }
        context.fillStyle="white";
        context.font="20px calibri";
        context.fillText(score,5,20);

}
function moveplayer(e) {
    if(gameOver)
    {
        return;
    }
 if(e.code == "ArrowLeft" && player.x - playerVelocityX >=0){
    player.x -= playerVelocityX;
 }
 else if(e.code == "ArrowRight" && player.x + playerVelocityX + player.width <= floor.width)
 {
    player.x += playerVelocityX; 
}
}
function createenemys() {
    for (let c = 0; c < enemyColumns; c++) {
        for (let r = 0; r < enemyRows; r++) {
            let enemy = {
                img : enemyImg,
                x : enemyX + c*enemyWidth,
                y : enemyY + r*enemyHeight,
                width : enemyWidth,
                height : enemyHeight,
                alive : true
            }
            enemyArray.push(enemy);
        }
    }
    enemyCount = enemyArray.length;
}

function shoot(e)

    {
        if(gameOver)
    {
        return;
    } 
    if (e.code == "Space") {
        //shoot
        let bullet = {
            x : player.x + playerWidth*15/32,
            y : player.y,
            width : marbleSize/8,
            height : marbleSize/2,
            used : false
        }
        bulletArray.push(bullet);
    }
    }

function collide(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
function shootaudio(){
    shoota.currentTime=0;
    shoota.play();
}
function enemyaudio()
{
    enemya.currentTime=0;
    enemya.play();
}