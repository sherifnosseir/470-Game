tankSprite=new Image();
tankSprite.src = "images/tankssheet.png";
turret=new Image();
turret.src = "images/tankturret.png";

function drawBody(x,y,frameNum){
	
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.drawImage(tankSprite,0,frameNum*81,63,81,x,y,32,41);
}

function drawTurret(x,y){
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.drawImage(turret,0,0,67,67,x+16-17,y+20-17,34,34);
}


function draw(x,y,frameNum){
	drawBody(x,y,frameNum);
	drawTurret(x,y);
}

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 500, 500);
 }
