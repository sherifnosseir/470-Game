 function draw(x,y,colourID){
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	//ctx.clearRect(0 , 0, 500, 500);
 	if(colourID%2 == 0) {
 	 ctx.fillStyle = "rgb(255,0,0)";
 	}
 	else {
 	 ctx.fillStyle = "rgb(0,0,255)";	  
 	}

 	 ctx.fillRect (x, y, 15, 10); 
 }

 function clearCanvas() {
 	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0 , 0, 500, 500);
 }
