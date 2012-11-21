//Kenny mysql code
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '16stars',
  database : 'tanks',
});

connection.connect(function(err) {
        console.log('Connected to Mysql Server! ');
});




var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app,{log:false})
  , fs = require('fs')
  , path = require('path')

app.listen(8080);

function handler (req, res) {
    var filePath=__dirname+req.rul;
    var extname = path.extname(filePath);
    console.log(req.url);

    
  fs.readFile(__dirname + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}


var id = 0;
var tanksArray = Array();
var bulletArray = Array();
var velocity = 6;
var bulletVelocity = 12;
var fps = 42;
//Map Variables
var pixelMap = Array();
var mapWidth = 960;
var mapHeight = 540;




/*
    tank size = 31*42
    half = 15*21
*/
//state 0 = login
//state 1 = load game


io.sockets.on('connection', function(socket) {

	socket.on('login',function(state,details){
		console.log("STATE");
		console.log(state);
		username = details[0];
		password = details[1];
		console.log("Username: " + username + " Password: " + password);
		sql="SELECT * FROM users WHERE username ='"+username+"'and password='"+password+"'";
		console.log(sql);
		var result = "";
		var response = "";
		connection.query(sql, function(err, rows, fields) {
			if (err) throw err;
			result = rows[0];
			user_info = new Array();
			if(result==undefined){
				response = "Invalid Login/Password";
				socket.emit('response', response, user_info);
			}
			else{
				response = "Login Successful";
				user_info[0] = rows[0]['username'];
				user_info[1] = rows[0]['nickname'];
				user_info[2] = rows[0]['team_id'];
				user_info[3] = rows[0]['tank_id'];
				socket.emit('response', response, user_info);
			}			
			console.log('MYSQL: ', result);
			
		});
	
	});

	socket.on('createIndiviualUserTank', function()
	{
		var newTank = Object();

	    randomX = Math.floor((Math.random()*mapWidth)+1);
	    randomY = Math.floor((Math.random()*mapHeight)+1);

		id++
	    newTank.id = id;
		newTank.username = "Server Tank"+id;
	    newTank.hp = 100;
	    newTank.x = randomX;  // tank coordinates
	    newTank.y = randomY;
	        newTank.numShots = 0;
	        newTank.bullets = Array();
	    newTank.turretAngle = 0;
	    newTank.wheelAngle = 0;
	    newTank.destX = newTank.x;
	    newTank.destY = newTank.y;
	    tanksArray[tanksArray.length] = newTank;
	    console.log("Tank Array Length: ");
	    console.log(tanksArray.length);
	    console.log("Tank ID:");
	    console.log(id);
	    socket.emit('setID', id);
	    socket.set('idClient', id);

	    for (var i=0; i < mapWidth; i++) {
	        pixelMap[i] = Array();
	        for (var j=0; j < mapHeight; j++) {
			pixelMap[i][j] = Object();

	                pixelMap[i][j].type = "empty"; //0 : empty
	     	        pixelMap[i][j].id = -1;
	        	   };
		        };
	});

	socket.on('createUserTank', function(tank_id, username)
	{
		//id++;
    var newTank = Object();

    randomX = Math.floor((Math.random()*mapWidth)+1);
    randomY = Math.floor((Math.random()*mapHeight)+1);

    newTank.id = tank_id+id;
	id++;
	newTank.username = username;
    newTank.hp = 100;
    newTank.x = randomX;  // tank coordinates
    newTank.y = randomY;
        newTank.numShots = 0;
        newTank.bullets = Array();
    newTank.turretAngle = 0;
    newTank.wheelAngle = 0;
    newTank.destX = newTank.x;
    newTank.destY = newTank.y;
    tanksArray[tanksArray.length] = newTank;
    console.log("Tank Array Length: ");
    console.log(tanksArray.length);
    console.log("Tank ID:");
    console.log(tank_id);
    socket.emit('setID', tank_id);
    socket.set('idClient', tank_id);

    for (var i=0; i < mapWidth; i++) {
        pixelMap[i] = Array();
        for (var j=0; j < mapHeight; j++) {
		pixelMap[i][j] = Object();

                pixelMap[i][j].type = "empty"; //0 : empty
     	        pixelMap[i][j].id = -1;
        	   };
	        };
	});

	
	

    // movement [server side] old
    /*
    socket.on('move_left', function() {
        socket.get('idClient', function(err, idClient) {
            var index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
            if (tanksArray[index].x <= 0) {
                tanksArray[index].x = 500;
            }
            else {
                tanksArray[index].x = tanksArray[index].x - 10;
            }
        });       
    });

    socket.on('move_right', function() {
        socket.get('idClient', function(err, idClient) {
            var index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
            if (tanksArray[index].x > 500) {
                tanksArray[index].x = 0;
            }
            else {
                tanksArray[index].x = tanksArray[index].x + 10;
            }
        });
    });

	socket.on('move_down', function()
	{
		socket.get('idClient', function(err, idClient)
		{
			var index = 0;
			for(i=0; i<tanksArray.length; i++)
			{
				if(tanksArray[i].id == idClient)
				{
					index = i;
				}
			}
			if(tanksArray[index].y>500)
			{
				tanksArray[index].y = 10;
			}
			else
			{
				tanksArray[index].y = tanksArray[index].y + 10;
			}
		});
	});
	
	socket.on('move_up', function()
	{
		socket.get('idClient', function(err, idClient)
		{
			var index = 0;
			for(i=0; i<tanksArray.length; i++)
			{
				if(tanksArray[i].id == idClient)
				{
					index = i;
				}
			}
			if(tanksArray[index].y<30)
			{
				tanksArray[index].y = 500;
			}
			else
			{
				tanksArray[index].y = tanksArray[index].y - 10;
			}
		});
	});
    */



    socket.on('mouse_click', function(mouseX, mouseY) {

		var index;
        socket.get('idClient', function(err, idClient) {
          	index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		});

            //15*21
		
		if(tanksArray[index].hp > 0)
		{
            tanksArray[index].destX = mouseX;
            tanksArray[index].destY = mouseY;

            var currentX = tanksArray[index].x;
            var currentY = tanksArray[index].y;
           

            if ((currentX + 15 - mouseX) == 0) {
                if ((currentY + 21 - mouseY) > 0) {
                    var angle = Math.PI/-2;    
                }
                else {
                    var angle = Math.PI/2;
                }
               
            }
            else {
                var angle = Math.atan((currentY + 21 - mouseY)/(currentX + 15 - mouseX));
            }

            //console.log(angle);
           
            tanksArray[index].wheelAngle = angle;

            var velocityX = (Math.cos(angle))*velocity;
            var velocityY = (Math.sin(angle))*velocity;
            tanksArray[index].destX = tanksArray[index].destX-15;
            tanksArray[index].destY = tanksArray[index].destY-21;
		}
		else
		{
            //udead
			socket.emit('askRespawn');
			
			
			
		}

/*
            if ((tanksArray[index].x - tanksArray[index].destX) > 0) {
                tanksArray[index].x = currentX - velocityX;
                tanksArray[index].y = currentY - velocityY;
            }
            else {
                tanksArray[index].x = currentX + velocityX;
                tanksArray[index].y = currentY + velocityY;
            }
*/
    });
	
	socket.on('shoot', function(mouseX, mouseY)
	{
        //console.log("pixelmapfrom Shoot" + pixelMap[mouseX][mouseY].type);
        
        //Get ClientID
		var index;
        socket.get('idClient', function(err, idClient) {
          	index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		});
		//console.log(index);
			if(tanksArray[index].numShots <=3 && tanksArray[index].hp > 0) //Check if user has more than 4 shots
			{
				tanksArray[index].numShots = tanksArray[index].numShots+1; //Increase numShots
			
				var newBullet = Object();
			
				//Calculate Bullet Movement
				var xDirection = mouseX - 15 - tanksArray[index].x;
				var yDirection = mouseY - 21 - tanksArray[index].y;
				
				var angle = Math.atan2(yDirection, xDirection);
				
				newBullet.angle = angle;
				newBullet.x = tanksArray[index].x+15;
				newBullet.y = tanksArray[index].y+21;
				newBullet.clientID = tanksArray[index].id;
			
				
				tanksArray[index].turretAngle = angle;
				bulletArray[bulletArray.length] = newBullet;
			}
			
	});

    socket.on('chatsend', function(msg, username) {
        //need to socket.get nickname, for now clientID
        socket.get('idClient', function(err, idClient) {
            msg = msg.replace(/</g,"&lt;");
            msg = msg.replace(/>/g,"&gt;");
            msg = username + ': ' + msg; // we'd replace this with usernames if we got a login
            var sendmsg = '';
            var result = msg.match(/.{1,55}/g);

            for (i = 0; i<result.length-1; i++) {
                sendmsg = sendmsg + result[i] + "<br>";
            }
            sendmsg = sendmsg + result[result.length-1];

            //headoflongmessage...asefasefseafasefasefasefsea...tailoflongmessage

            //console.log(msg.length);
            
            if (msg.length > 200) {
                sendmsg = username + ": Message too long! Stop spamming bro!";
            }
            
/*
            if(msg.length > 56) {
                msg = msg.slice(0,55) + "<br>" + msg.slice(55);
            }
*/
            //io.sockets.volatile.emit('chatbroadcast', nickname + ': ' + msg);  //for when we get nicknames and a login
            io.sockets.volatile.emit('chatbroadcast', sendmsg);
        });
    });
	
	
    socket.on('disconnect', function() {
		var index;
        socket.get('idClient', function(err, idClient) {
          	index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		});
		
		var id;
		socket.get('idClient', function(err, idClient) {
			id = idClient;
		});

		var len = bulletArray.length;
		var tracker = 0;
		for(trk=bulletArray.length-1;trk>=0;trk--)
		{
			if(bulletArray[trk].clientID==id){
				bulletArray.splice(trk,1);
			}
		}
		tanksArray.splice(index,1);

		console.log('Disconnect', id);
		console.log(tanksArray.length);
	});
	
	socket.on('respawn',function(){
		var respindex;
		socket.get('idClient', function(err, idClient) {
			respindex = 0;
			for (i=0; i<tanksArray.length; i++) {
				if (tanksArray[i].id == idClient) {
					respindex = i;
				}
			};
		})
		respawn(respindex);
	});
});	


function clearObject (x, y, type) 
{
	
	x = Math.floor(x);
	y = Math.floor(y);
	if(type == "tank")
	{
		/*
		    tank size = 31*42
		    half = 15*21
		*/

		for (var i=0; i < 42; i++) {
			for (var j=0; j < 31; j++) {
				if((Math.pow(i-21, 2) + Math.pow(j-15, 2)) < Math.pow(15, 2))
				{
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight)
                        {
                        pixelMap[x+i][y+j].type = "empty";
                        pixelMap[x+i][y+j].id = -1;
                        }
				}
			};
		};
	}
	else if(type == "bullet")
		{
				for (var i=0; i < 5; i++) {
					for (var j=0; j < 5; j++) {
						if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight)
						{
						pixelMap[x+i][y+j].type = "empty";
						pixelMap[x+i][y+j].id = -1;
						}
					};
				};
		}
}

function drawObject(x, y, type, object)
{
	
	x = Math.floor(x);
	y = Math.floor(y);
	if(type == "tank")
	{
		/*
		    tank size = 31*42
		    half = 15*21
		*/
		for (var i=0; i < 42; i++) {
			for (var j=0; j < 31; j++) {
				if((Math.pow(i-21, 2) + Math.pow(j-15, 2)) < Math.pow(15, 2))
				{
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight)
					{
						pixelMap[x+i][y+j].type = "tank";
						pixelMap[x+i][y+j].id = object.id;
					}
				}
			};
		};
		
	}
	else if(type == "bullet")
		{
            //console.log("drawobject bullet" + object.x);
            //console.log("drawobject ase" + object.clientID);
			for (var i=0; i < 5; i++) {
				for (var j=0; j < 5; j++) {
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight)
					{
					pixelMap[x+i][y+j].type = "bullet";
					pixelMap[x+i][y+j].id = object.clientID;
					}
				};
			};
		}
}

function moveTank() {
    for (index = 0; index < tanksArray.length; index++) {

		
		//pixelMap
		clearObject(tanksArray[index].x,tanksArray[index].y,"tank", tanksArray[index]);
		
		
        if ((Math.abs(tanksArray[index].x - tanksArray[index].destX) < 6) && 
            (Math.abs(tanksArray[index].y - tanksArray[index].destY) < 6)) {
                tanksArray[index].x = tanksArray[index].destX;
                tanksArray[index].y = tanksArray[index].destY;
        }
        else {
            var currentX = tanksArray[index].x;
            var currentY = tanksArray[index].y;
            
            var angle = tanksArray[index].wheelAngle;

            //console.log(angle);
            
            var velocityX = (Math.cos(angle))*velocity;
            var velocityY = (Math.sin(angle))*velocity;

            if ((tanksArray[index].x - tanksArray[index].destX) > 0) {
                tanksArray[index].x = currentX - velocityX;
                tanksArray[index].y = currentY - velocityY;
            }
            else {
                tanksArray[index].x = currentX + velocityX;
                tanksArray[index].y = currentY + velocityY;
            }

        }
        drawObject(tanksArray[index].x,tanksArray[index].y,"tank", tanksArray[index]);
		


    };
};

function detectHit (bullet) {
	for (var i=0; i < 5; i++) {
		for (var j=0; j < 5; j++) {
			var x=Math.floor(bullet.x)+i;
			var y=Math.floor(bullet.y)+j;
            //console.log("detecthit x" + x);
            //console.log("detecthit y" + y);
            //console.log("detectHit id " + pixelMap[x][y].id + " detectHit clientID " + bullet.clientID);
			//if(x<0||y<0)console.log("Zero!!");
			if(x<mapWidth&&y<mapHeight){
				if(pixelMap[x][y].type == "tank" && pixelMap[x][y].id != bullet.clientID)
				{
					console.log("detectHit Type " + pixelMap[x][y].type);
					console.log("detectHit id " + pixelMap[x][y].id);
					console.log("detectHit clientID " + bullet.clientID);
				  return pixelMap[x][y].id;
				}
			}
			
		};
	};
	return -1;
}

function moveBullets () {
    //console.log(bulletArray.length);
	for (var i=0; i < bulletArray.length; i++) {
		var clientIndex=0;

		for(var tanki=0;tanki<tanksArray.length;tanki++){
			if(tanksArray[tanki].id == bulletArray[i].clientID)
			clientIndex=tanki;

		}
		
		if((bulletArray[i].x < mapWidth && bulletArray[i].x > 0) && (bulletArray[i].y > 0 && bulletArray[i].y < mapHeight)) //Check if a bullet is out of range
		{
			var hitClientID = detectHit(bulletArray[i]);
            clearObject(bulletArray[i].x, bulletArray[i].y, "bullet", bulletArray[i]);
			if(hitClientID != -1)
			{
				console.log("HIT!");
				
				var index;
	            for (j=0; j<tanksArray.length; j++) {
	                if (tanksArray[j].id == hitClientID) {
	                    index = j;
	                }
	            };
				
				tanksArray[clientIndex].numShots = tanksArray[clientIndex].numShots - 1; //Decrease numShots when bullets goes off
				
				
				if(tanksArray[index].hp > 0)
				{
					tanksArray[index].hp = tanksArray[index].hp - 10; // tdl: this 10 should be a variable - bulletDamage?
					tanksArray[index].destX = tanksArray[index].x;
                    tanksArray[index].destY = tanksArray[index].y;
                    //tanksArray[index].x = bulletArray[i].x;
                    //tanksArray[index].y = bulletArray[i].y;
                    io.sockets.volatile.emit('updatePlayerStatus', tanksArray);
                    io.sockets.volatile.emit('drawSmokes', tanksArray[index].x, tanksArray[index].y);

				}


                bulletArray.splice(i, 1);
				
			}
			else
			{
				bulletArray[i].x = bulletArray[i].x + Math.cos(bulletArray[i].angle)*bulletVelocity;
				bulletArray[i].y = bulletArray[i].y + Math.sin(bulletArray[i].angle)*bulletVelocity;
				drawObject(bulletArray[i].x, bulletArray[i].y, "bullet", bulletArray[i]);
			}
		}
		else
		{

			tanksArray[clientIndex].numShots = tanksArray[clientIndex].numShots - 1; //Decrease numShots when bullets goes off
			bulletArray.splice(i, 1);
		}
	};
}
function respawn(index){

	mytank=tanksArray[index];
	if(mytank.hp <= 200){
		console.log("respawn!");
		clearObject(mytank.x,mytank.y,'tank');
		mytank.hp=100;
		randomX = Math.floor((Math.random()*mapWidth)+1);
	    randomY = Math.floor((Math.random()*mapHeight)+1);
		mytank.x=randomX;
		mytank.y=randomY;
		mytank.destX = mytank.x;
	    mytank.destY = mytank.y;
		
	}
	
	
}
setInterval(function() {
    moveTank();
	moveBullets();
    io.sockets.volatile.emit('draw', tanksArray, bulletArray);
}, fps);





console.log('Server running');
