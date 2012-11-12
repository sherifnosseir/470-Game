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
	
	//Calculate Turret Angle
	var xDirection = mouseX - x;
	var yDirection = mouseY - y;
	var angle = Math.atan2(yDirection, xDirection);
	
	ctx.save();
	ctx.translate(x+17, y+17);
	ctx.rotate((angle+(Math.PI)/2)%(2*Math.PI));
 	ctx.drawImage(turret,0,0,67,67,-17,-17,34,34);
	ctx.translate(-x, -y);
	ctx.restore();
}

function drawBullets (bullets) {
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb(0,0,255)";
	
	for(i = 0; i<bullets.length; i++)
	{
		ctx.fillRect (bullets[i].x, bullets[i].y, 5, 5);
	}
}



function draw(tank, bullets, frameNum){
	drawBody(tank.x, tank.y, frameNum);
	drawTurret(tank.x, tank.y);
	drawBullets(bullets);
}

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 500, 500);
 }
