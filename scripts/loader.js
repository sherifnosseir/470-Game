var stage = Object();
function load(){
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
				$("#loadingView").fadeOut("slow");


			}
		}]);
}

//global scope stuff
username = "";
nickname = "";
team_id = "";
tank_id = "";


var tankCount = 0;
var environment = "development";

if(environment == "development")
{
	var socket = io.connect('http://localhost:8080');
	
	tankCount++;
	username = "Developer"+tankCount;
	nickname = "Dev"+tankCount;
	team_id = 1;
	tank_id = tankCount;
	tankCount++;

	//socket.emit('createUserTank', tank_id, username);
	socket.emit('createIndiviualUserTank');
	load();
}
else
{
	var socket = io.connect('http://cmpt470.csil.sfu.ca:9016');
	
	var state = 0;
	var details = "";

	if(state==0){
		$(document).ready(function() {
			$(".row_two").hide();
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

						socket.emit('createUserTank', tank_id, username);
						$("#row_one").fadeOut("slow");
						$(".row_two").fadeIn("slow");
						load();
					}
				});
			});
			$("#guest_button").click(function() {
				tankCount++;
				username = "Developer"+tankCount;
				nickname = "Dev"+tankCount;
				team_id = 1;
				tank_id = tankCount;
				tankCount++;

	//socket.emit('createUserTank', tank_id, username);
				socket.emit('createIndiviualUserTank');
			});
		});

		console.log('waiting for successful login');
		//hide canvas
	}

	else if (state==1){
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
		$("#row_two").hide();
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
					$("#row_one").hide();
					$("#row_two").show();
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