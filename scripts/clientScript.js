var mouseX = 0;
 var mouseY = 0;

 $('canvas').mousemove(function(e) {
 	//var pageCoords = "(" + e.pageX + ", " + e.pageY + ")";
 	//var clientCoords = "CLIENT( " + e.clientX + ", " + e.clientY + " )";
 	// .clientX and .offsetX are 'browser dependent', and you should use .pageX - apparently

 	//console.log("o(" + (e.pageX-8) + ", " + (e.pageY-117) + ")");
 	  
 	 
 	mouseX = e.pageX-8;
 	mouseY = e.pageY-117;

 	clearCanvas();
 	draw(mouseX, mouseY, 1);

 	//console.log("(" + mouseX + ", " + mouseY + ")");
 	//draw(e.pageX, e.pageY, 1);


 });

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


 	// movement [client side]
 	document.addEventListener("keydown", function(e) {
 	 //console.log('zzzzzzzzz');
 	 switch(e.keyCode)
 	 {
 	 case 65:
 	 socket.emit('move_left');
 	 break;
 	 case 68:
 	 socket.emit('move_right');
 	 break;
 	 case 87:
 	 socket.emit('move_up');
 	 break;
 	 case 83:
 	 socket.emit('move_down');
 	 break;
 	 case 32:
 	 console.log('PEWPEW@' + "(" + mouseX + ", " + mouseY + "), lol");
 	 socket.emit('shoot');
 	 break;
 	 default:
 	  
 	 break;
 	 }
 	 /*if (e.keyCode=="65") {
 	 //console.log('aseaseaseaseaseasease');
 	 socket.emit('move_left');
 	 }
 	 else if (e.keyCode="68") {
 	 socket.emit('move_right');
 	 }
 	 */
 	 });	 

 //var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
 var socket = io.connect('http://localhost:8080');
 var idClient;

 socket.on('connect', function() {

 });

 socket.on('draw', function(tanksArray) {
 	clearCanvas();
 	for (i = 0; i<tanksArray.length; i++) {
 	 console.log(tanksArray[i].id);
 	 console.log(tanksArray[i].x);
 	 draw(tanksArray[i].x, tanksArray[i].y, tanksArray[i].id);
 	};



 });

 socket.on('setID', function(id) {
 	idClient = id;
 });