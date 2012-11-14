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
	}
 	
}

function drawTurret(tank){
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	
	for (var i=0; i < tank.length; i++) {
		var x = tank[i].x;
		var y = tank[i].y;
		var angle = Math.PI;
		
		console.log("id : " + idClient);
		console.log("Tank id : " + tank[i].id);
		if(tank[i].id == idClient)
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
		if(bullets[i].clientID%2 == 0)
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



function draw(tanks, bullets, frameNum){
	drawBody(tanks, frameNum);
	drawTurret(tanks);
	drawBullets(bullets);
}

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 500, 500);
 }
