//var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
var socket = io.connect('http://localhost:8080');
var idClient;

var mouseX = 0;
var mouseY = 0;
var clientData=new Object();
clientData.frameNum=0;
$('canvas').mousemove(function(e) {
	//var pageCoords = "(" + e.pageX + ", " + e.pageY + ")";
	//var clientCoords = "CLIENT( " + e.clientX + ", " + e.clientY + " )";
	// .clientX and .offsetX are 'browser dependent', and you should use .pageX - apparently
	//console.log("o(" + (e.pageX-8) + ", " + (e.pageY-117) + ")");
	  
	 
	//mouseX = e.pageX-8;
	//mouseY = e.pageY-117;

	// actually, it seems that client relative to your view, regardless of scroll/zoom
	// page is

 	//clearCanvas();
 	//draw(mouseX, mouseY, 1);
 	//clearCanvas();
 	//draw(mouseX, mouseY, 1);
    mouseX = e.pageX - $(this).offset().left;
    mouseY = Math.floor(e.pageY - $(this).offset().top);
	//console.log('mousemove@' + mouseX +", "+ mouseY);

	/*

    mouseX = e.pageX - $(this).offset().left;
    mouseY = Math.floor(e.pageY - $(this).offset().top);
*/
	//clearCanvas();
	//draw(mouseX, mouseY, 1);

	//console.log("(" + mouseX + ", " + mouseY + ")");
	//draw(e.pageX, e.pageY, 1);

});


// movement [client side]
$('canvas').click(function(e){
    mouseX = e.pageX - $(this).offset().left;
    mouseY = Math.floor(e.pageY - $(this).offset().top);
	//console.log('mouseclick@' + mouseX +", "+ mouseY);
	socket.emit('mouse_click', mouseX, mouseY);
});


//oldermovment + fire
document.addEventListener("keydown", function(e) {
	//console.log('zzzzzzzzz');
	switch(e.keyCode)
	{
		/*
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
	*/
	case 32:
	console.log('PEWPEW@' + "(" + mouseX + ", " + mouseY + "), lol");
	socket.emit('shoot', mouseX, mouseY);
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

 
socket.on('connect', function() {
});


socket.on('setID', function(id) {
	idClient = id;
});

socket.on('draw', function(tanksArray, bulletArray, pixelMap) {
 	clientData.frameNum++;
 	if(clientData.frameNum>2)clientData.frameNum=0;
 	clearCanvas();
 	 //console.log(tanksArray[i].id);
 	 //console.log(tanksArray[i].x);
 	 //draw(tanksArray[i].x, tanksArray[i].y, tanksArray[i].id);
 	 
 	 draw(tanksArray, bulletArray, clientData.frameNum);
});