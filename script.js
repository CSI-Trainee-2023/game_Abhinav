const canvas= document.getElementById("invader");
const txt = canvas.getContext('2d');
const background = new Image();
background.src="background.png";
 
function invader(){
    txt.drawImage(background,0,0,canvas.width,canvas.height);    
}
setInterval(invader,1000/60);