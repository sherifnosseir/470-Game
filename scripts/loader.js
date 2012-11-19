function load(){
	var stage = Object();

	window.addEventListener("load", function() {

	stage.status = "onload";

	// start dynamic loading
		Modernizr.load([
		{
			// these files are always loaded
			load : [
				"scripts/jquery-1.8.2.min.js",
				"socket.io/socket.io.js",
				"scripts/clientDraw.js",
				"scripts/clientScript.js"
			],
			// called when all files have finished loading
			// and executing
			
			complete : function() {
				stage.status = "gamePlay";
				console.log("All files loaded!");
				document.getElementById("loadingView").className = "loadingHide";


			}
		}]);
	}, false);

}


var state = 0;
var details = "";
if(state==0){
	$(document).ready(function() {
		$("#row_two").hide();
		$("#submit_button").click(function() {
			
			details = new Array();
			details[0] = $("#username").val(); //username
			details[1] = calcMD5($("#password").val()); //password (will be encrypted to md5)
			console.log(details);
			var socket = io.connect('http://localhost:8080');
			socket.emit('login',state,details);
		});
	});

	console.log('waiting for successful login');
	//hide canvas
}

else if (state==1){
	load();

}