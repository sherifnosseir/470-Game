tankSprite=new Image();
tankSprite.src = "images/tankssheet.png";
turret=new Image();
turret.src = "images/tankturret.png";

function drawBody(tank,frameNum){
	
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");

	for (var i=0; i < tank.length; i++) {

		var x = tank[i].x;
		var y = tank[i].y;
		var angle = tank[i].wheelAngle;
		
		//This is a transformation to rotate objects on canvas
		ctx.save();
		ctx.translate(x+17, y+17);
		ctx.rotate((angle+(Math.PI)/2)%(2*Math.PI));
	 	ctx.drawImage(tankSprite,0,frameNum*81,63,81,-16,-20,32,41);
		ctx.translate(-x, -y);
		ctx.restore();
		
		ctx.beginPath();
		ctx.rect(tank[i].x-8, tank[i].y-25, tank[i].hp/2, 15);
		if(tank[i].hp > 75)
		{
			ctx.fillStyle = 'green';
		}
		else
		{
			if(tank[i].hp > 30)
			{
				ctx.fillStyle = 'yellow';
			}
			else
			{
				ctx.fillStyle = 'red';
			}
		}
	
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
   		ctx.stroke();
	
		ctx.fillStyle = "black";
      	ctx.font = "8pt sans-serif";
		ctx.textAlign = 'left';
	    ctx.fillText(tank[i].hp+"%", tank[i].x+5, tank[i].y-13);
	
		ctx.fillStyle = "black";
      	ctx.font = "8pt sans-serif";
		ctx.textAlign = 'center';
	    ctx.fillText(tank[i].id, tank[i].x+14, tank[i].y+52);
	}
 	
}

function drawTurret(tank){
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	
	for (var i=0; i < tank.length; i++) {
		var x = tank[i].x;
		var y = tank[i].y;
		var angle = Math.PI;
		
		//console.log("id : " + tank_id);
		//console.log("Tank id : " + tank[i].id);
		if(tank[i].id == tank_id)
		{
			//Calculate Turret Angle
			var xDirection = mouseX - x;
			var yDirection = mouseY - y;
			angle = Math.atan2(yDirection, xDirection);
		}
		else
		{
			angle = tank[i].turretAngle;
		}
		

		//This is a transformation to rotate objects on canvas
		ctx.save();
		ctx.translate(x+17, y+17);
		ctx.rotate((angle+(Math.PI)/2)%(2*Math.PI));
	 	ctx.drawImage(turret,0,0,67,67,-17,-17,34,34);
		ctx.translate(-x, -y);
		ctx.restore();
	};

}

function drawBullets (bullets) {
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	
	for(i = 0; i<bullets.length; i++)
	{
		if(bullets[i].clientID == tank_id)
		{
			ctx.fillStyle = "rgb(0,0,255)";
		}
		else
		{
			ctx.fillStyle = "rgb(255,0,0)";
		}
		
		ctx.fillRect (bullets[i].x, bullets[i].y, 5, 5);
	}
}

function drawCursor () {
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	
	ctx.beginPath();
	ctx.fillStyle = "rgb(0,225,0)";
	ctx.moveTo(mouseX,mouseY);
	ctx.lineTo(mouseX+15,mouseY+5);
	ctx.fillStyle = "rgb(0,0,225)";
	ctx.lineTo(mouseX+10, mouseY+10);
	ctx.lineTo(mouseX+10, mouseY+20);


	ctx.fill();
}



function draw(tanks, bullets, frameNum){
	drawBody(tanks, frameNum);
	drawTurret(tanks);
	drawBullets(bullets);
	drawCursor();
}

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 960, 540);
 }
