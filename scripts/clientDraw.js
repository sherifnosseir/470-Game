tankSprite=new Image();
tankSprite.src = "images/tankssheet.png";
userTankSprite = new Image();
userTankSprite.src = "images/usertankssheet.png";
turret=new Image();
turret.src = "images/tankturret.png";
userturret=new Image();
userturret.src = "images/usertankturret.png";

smoke0 = new Image();
smoke0.src = "images/explosionframe0.png";
smoke1 = new Image();
smoke1.src = "images/explosionframe1.png";
smoke2 = new Image();
smoke2.src = "images/explosionframe2.png";
smoke3 = new Image();
smoke3.src = "images/explosionframe3.png";
smoke4 = new Image();
smoke4.src = "images/explosionframe4.png";

function drawTank(tank,frameNum){
	
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");

	for (var i=0; i < tank.length; i++) {

		//Calculate Tank Angle
		var x = tank[i].x;
		var y = tank[i].y;
		var tankAngle = tank[i].wheelAngle;
		
		//Calculate Turret Angle
		var turretAngle = Math.PI;
		
		//This is a transformation to rotate objects on canvas
		ctx.save();
		ctx.translate(x+17, y+17);
		ctx.rotate((tankAngle+(Math.PI)/2)%(2*Math.PI));
		if(tank[i].id == tank_id)
		{
			//Draw User Tank
			ctx.drawImage(userTankSprite,0,frameNum*81,63,81,-16,-20,32,41);
			ctx.translate(-x, -y);
			ctx.restore();

			ctx.save();

			
			var xDirection = mouseX - x;
			var yDirection = mouseY - y;
			turretAngle = Math.atan2(yDirection, xDirection);
			
			//Draw User Turret
			ctx.translate(x+17, y+17);
			ctx.rotate((turretAngle+(Math.PI)/2)%(2*Math.PI));
			ctx.drawImage(userturret,0,0,67,67,-17,-17,34,34);
		}
		else
		{
			//Draw Tank
			ctx.drawImage(tankSprite,0,frameNum*81,63,81,-16,-20,32,41);
			ctx.translate(-x, -y);
			ctx.restore();

			ctx.save();
			
			turretAngle = tank[i].turretAngle;
			
			//Draw Turret
			ctx.translate(x+17, y+17);
			ctx.rotate((turretAngle+(Math.PI)/2)%(2*Math.PI));
			
			ctx.drawImage(turret,0,0,67,67,-17,-17,34,34);
		}
		ctx.translate(-x, -y);
		ctx.restore();
		
		
		if(tank[i].status == "dead")
		{
			frameNum = frameNum%4;
			
			switch(frameNum)
			{
				case 1:
					ctx.drawImage(smoke1,0,0,50,150,x-17,y-133,50,150);
					break;
				case 2:
					ctx.drawImage(smoke2,0,0,50,150,x-17,y-133,50,150);
					break;
				case 3:
					ctx.drawImage(smoke3,0,0,50,150,x-17,y-133,50,150);
					break;
				default:
					ctx.drawImage(smoke0,0,0,50,150,x-17,y-133,50,150);
					break;
					
			}
		}
		else
		{
			//Draw Health
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
	
			//Draw HP
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'black';
	   		ctx.stroke();
	
			ctx.fillStyle = "black";
	      	ctx.font = "8pt sans-serif";
			ctx.textAlign = 'left';
		    ctx.fillText(tank[i].hp+"%", tank[i].x+5, tank[i].y-13);
		}
		
		
		//Draw Username
		ctx.fillStyle = "black";
      	ctx.font = "8pt sans-serif";
		ctx.textAlign = 'center';
	    ctx.fillText(tank[i].username, tank[i].x+14, tank[i].y+52);
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
		if(tank[i].id == tank_id)
		{
			ctx.drawImage(userturret,0,0,67,67,-17,-17,34,34);
		}
		else
		{
			ctx.drawImage(turret,0,0,67,67,-17,-17,34,34);
		}
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
	drawTank(tanks, frameNum);
	drawBullets(bullets);
	drawCursor();
}

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 960, 540);
 }
