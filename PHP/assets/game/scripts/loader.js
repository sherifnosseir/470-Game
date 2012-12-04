var stage = Object();



username = "";
nickname = "";
team_id = "";
tank_id = "";

pixelMap = "";

var tankCount = 0;
var environment = "developmentpopo";



function load(){
	stage.status = "onload";

	// start dynamic loading
		Modernizr.load([
		{
			// these files are always loaded
			load : [
				base_url+"assets/game/scripts/socket.io-client/dist/socket.io.js",
				base_url+"assets/game/scripts/clientDraw.js",
				base_url+"assets/game/scripts/clientScript.js"
			],
			// called when all files have finished loading
			// and executing
			
			complete : function() {
				stage.status = "gamePlay";
				console.log("All files loaded!");
				$("#loadingView").fadeOut("slow");


			}
		}]);
}

function loadMap()
{/*
	socket.emit('requestPixelMap');
	socket.on('requestedTile', function(tile)
	{
		pixelMap = tile;
	});*/
}

//global scope stuff

//load();

if(environment == "development")
{
	var socket = io.connect('http://localhost:8080');
	
	load();
	socket.emit("createGuestAccount");
//socket.emit('createUserTank', tank_id, username);
		//socket.emit('createIndiviualUserTank');
		socket.on('guestResponse', function(user_info)
		{
			username = user_info[0];
			nickname = user_info[1];
			team_id = user_info[2];
			tank_id = user_info[3];
			
			socket.emit('createUserTank', tank_id, username);
			$("#login_row").fadeOut("slow");
			$(".game_row").fadeIn("slow");
	        
		});
}
else
{
	var socket = io.connect('http://localhost:8080');
	
	var state = 0;
	var details = "";

	if(state==0){
		$(document).ready(function() {
			$(".game_row").hide();
			$("#signup_div").hide();
			$("#submit_button").click(function() {

				details = new Array();
				details[0] = $("#username").val(); //username
				details[1] = calcMD5($("#password").val()); //password (will be encrypted to md5)
				console.log(details);
				//var socket = io.connect('http://localhost:8080');
				//var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
				socket.emit('login',state,details);
				socket.on('response', function(response,user_info) {
					console.log(response);
					if(response=="Login Successful"){
						username = user_info[0];
						nickname = user_info[1];
						team_id = user_info[2];
						tank_id = user_info[3];
						load();

						socket.emit('createUserTank', tank_id, username);
						$("#login_row").fadeOut("slow");
						$(".game_row").fadeIn("slow");
						//loadMap();
						
					}
				});
			});

			$("#signup_button1").click(function() {
				$("#login").hide();
				$("#signup_div").show();
			});

			$("#signup_button2").click(function() {
				details = new Array();
				details[0] = $("#username2").val(); //username
				details[1] = calcMD5($("#password2").val()); //password (will be encrypted to md5)
				socket.emit('signup',state,details);

				socket.on('signup_response', function(signup_response)
				{
					if(signup_response==1){
						console.log('Signup successful');
							$("#login").show();
							$("#signup_div").hide();
					}
				});
			});
			
			$("#guest_button").click(function() {

				socket.emit("createGuestAccount");
			//socket.emit('createUserTank', tank_id, username);
					//socket.emit('createIndiviualUserTank');
				socket.on('guestResponse', function(user_info)
				{
					username = user_info[0];
					nickname = user_info[1];
					team_id = user_info[2];
					tank_id = user_info[3];
					load();

					socket.emit('createUserTank', tank_id, username);
					$("#login_row").fadeOut("slow");
					$(".game_row").fadeIn("slow");
					//loadMap();
					
				});
			});
		});

		console.log('waiting for successful login');
		//hide canvas
	}

	else if (state==1){
		//	loadMap();
			load();

	}
}

/*==========================================
  =====FINAL CODE WITH NO ENVIRONMENTS======
  ==========================================*/
/*
//global scope stuff
username = "";
nickname = "";
team_id = "";
tank_id = "";

var state = 0;
var details = "";

var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
if(state==0){
	$(document).ready(function() {
		$("#game_row").hide();
		$("#submit_button").click(function() {

			details = new Array();
			details[0] = $("#username").val(); //username
			details[1] = calcMD5($("#password").val()); //password (will be encrypted to md5)
			console.log(details);
			//var socket = io.connect('http://localhost:8080');
			//var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
			socket.emit('login',state,details);
			socket.on('response', function(response,user_info) {
				console.log(response);
				if(response=="Login Successful"){
					username = user_info[0];
					nickname = user_info[1];
					team_id = user_info[2];
					tank_id = user_info[3];

					socket.emit('createUserTank', tank_id);
					$("#login_row").hide();
					$("#game_row").show();
					load();
				}
			});
		});
	});

	console.log('waiting for successful login');
	//hide canvas
}

else if (state==1){
	load();

}
*/