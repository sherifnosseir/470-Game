
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
var bulletVelocity = 10;
var fps = 42;

//Map Variables
var pixelMap = Array();
var mapHeight = 500;
var mapWidth = 500;



/*
    tank size = 31*42
    half = 15*21
*/

io.sockets.on('connection', function(socket) {


    id++;
    var newTank = Object();
	
    newTank.id = id;
	newTank.hp = 100;
    newTank.x = 250;  // tank coordinates
    newTank.y = 250;
	newTank.numShots = 0;
	newTank.bullets = Array();
    newTank.turretAngle = 0;
    newTank.wheelAngle = 0;
    newTank.destX = 250;
    newTank.destY = 250;
    tanksArray[tanksArray.length] = newTank;

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
            
		console.log(index);
			if(tanksArray[index].numShots <=3 && tanksArray[index].hp > 0) //Check if user has more than 4 shots
			{
				tanksArray[index].numShots = tanksArray[index].numShots+1; //Increase numShots
			
				var newBullet = Object();
			
				//Calculate Bullet Movement
				var xDirection = mouseX - tanksArray[index].x;
				var yDirection = mouseY - tanksArray[index].y;
				
				var angle = Math.atan2(yDirection, xDirection);
				
				newBullet.angle = angle;
				newBullet.x = tanksArray[index].x+15;
				newBullet.y = tanksArray[index].y+21;
				newBullet.clientID = tanksArray[index].id;
				newBullet.clientIndex = index;
				
				tanksArray[index].turretAngle = angle;
				bulletArray[bulletArray.length] = newBullet;
			}
			
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
		while(tracker < len)
		{
			if (bulletArray[tracker].clientID == id) {
				bulletArray.splice(tracker, 1);
				len--;
			}
			else
			{
				tracker++;
			}
		}

		
		tanksArray.splice(index, 1);

		console.log('Disconnect', id);
		console.log(tanksArray.length);
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

		for (var i=1; i < 42; i++) {
			for (var j=1; j < 31; j++) {
				if((Math.pow(i-21, 2) + Math.pow(j-15, 2)) < Math.pow(15, 2))
				{
					pixelMap[i][j].type = "empty";
				}
			};
		};
	}
	else if(type == "bullet")
		{
				for (var i=1; i < 5; i++) {
					for (var j=1; j < 5; j++) {
						if(x+i > 0  && y+j > 0 && x+i < 500 && y+j < 500)
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
		for (var i=1; i < 42; i++) {
			for (var j=1; j < 31; j++) {
				if((Math.pow(i-21, 2) + Math.pow(j-15, 2)) < Math.pow(15, 2))
				{
					if(x+i > 0  && y+j > 0 && x+i < 500 && y+j < 500)
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
			for (var i=0; i < 5; i++) {
				for (var j=0; j < 5; j++) {
					if(x+i > 0  && y+j > 0 && x+i < 500 && y+j < 500)
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
			if(x<0||y<0)console.log("Zero!!");
			if(x<500&&y<500){
				if(pixelMap[x][y].type == "tank" && pixelMap[x][y].id != bullet.clientID)
				{
					console.log(pixelMap[x][y].type);
					console.log(pixelMap[x][y].id);
					console.log(bullet.clientID);
				  return pixelMap[x][y].id;
				}
			}
			
		};
	};
	return -1;
}

function moveBullets () {
	for (var i=0; i < bulletArray.length; i++) {
		
		if((bulletArray[i].x < 500 && bulletArray[i].x > 0) && (bulletArray[i].y > 0 && bulletArray[i].y < 500)) //Check if a bullet is out of range
		{
			clearObject(bulletArray[i].x, bulletArray[i].y, "bullet", bulletArray[i]);
			var hitClientID = detectHit(bulletArray[i]);
			if(hitClientID != -1)
			{
				console.log("HIT!");
				
				var index;
	            for (j=0; j<tanksArray.length; j++) {
	                if (tanksArray[j].id == hitClientID) {
	                    index = j;
	                }
	            };
				
				tanksArray[bulletArray[i].clientIndex].numShots = tanksArray[bulletArray[i].clientIndex].numShots - 1; //Decrease numShots when bullets goes off
				bulletArray.splice(i, 1);
				
				if(tanksArray[index].hp > 0)
				{
					tanksArray[index].hp = tanksArray[index].hp - 10;
				}
				io.sockets.volatile.emit('updatePlayerStatus', tanksArray);
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
			tanksArray[bulletArray[i].clientIndex].numShots = tanksArray[bulletArray[i].clientIndex].numShots - 1; //Decrease numShots when bullets goes off
			bulletArray.splice(i, 1);
		}
	};
}

setInterval(function() {
    moveTank();
	moveBullets();
    io.sockets.volatile.emit('draw', tanksArray, bulletArray);
}, fps);





console.log('Server running');
