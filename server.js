
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
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
var bulletEmptySlotArray = Array();
bulletEmptySlotArray[0] = "undefined";
var velocity = 6;
var bulletVelocity = 10;
var fps = 42;


/*
    tank size = 31*42
    half = 15*21
*/


function moveTank() {
    for (index = 0; index < tanksArray.length; index++) {

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



    };
};

io.sockets.on('connection', function(socket) {


    id++;
    var newTank = Object();
	
    newTank.id = id;
    newTank.x = 250;  // tank coordinates
    newTank.y = 250;
	newTank.numShots = 0;
	newTank.bullets = Array();
    newTank.turretAngle = 0;
    newTank.wheelAngle = 0;
    newTank.destX = 250;
    newTank.destY = 250;
    tanksArray[tanksArray.length] = newTank;
    io.sockets.emit('setID', id);
    socket.set('idClient', id);

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
        //console.log('mouseclick@' + mouseX +", "+ mouseY);
        socket.get('idClient', function(err, idClient) {
            var index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };


            //15*21

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
    });
	
	socket.on('shoot', function(mouseX, mouseY)
	{
		socket.get('idClient', function(err, idClient) {
            var index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		
			if(tanksArray[index].numShots <=3)
			{
				tanksArray[index].numShots = tanksArray[index].numShots+1;
			
				var newBullet = Object();
			
				//Calculate Bullet Movement
				var xDirection = mouseX - tanksArray[index].x;
				var yDirection = mouseY - tanksArray[index].y;
			
				newBullet.angle = Math.atan2(yDirection, xDirection);
				newBullet.x = tanksArray[index].x+15;
				newBullet.y = tanksArray[index].y+21;
				newBullet.clientID = index;
			
				var foundPlace = false;
				for (var j=0; j < bulletEmptySlotArray.length; j++) {
					if(bulletEmptySlotArray[j] != "undefined")
					{
						bulletArray[bulletEmptySlotArray[j]] = newBullet;
						bulletEmptySlotArray[j] = "undefined";
						foundPlace = true;
					}
				}
				if(!foundPlace)
				{
					bulletArray[bulletArray.length] = newBullet;
				}
			}
			
		});
	});
	
    socket.on('disconnect', function() {
        socket.get('idClient', function(err, idClient) {
            var index = 0;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
            tanksArray.splice(index, 1);
            console.log('Disconnect', idClient);
            console.log(tanksArray.length);
        });
    });	
});

function moveBullets () {
	for (var i=0; i < bulletArray.length; i++) {
		if((bulletArray[i].x < 500 && bulletArray[i].x > 0) && (bulletArray[i].y > 0 && bulletArray[i].y < 500))
		{
			if(bulletArray[i] != "undefined")
			{
				bulletArray[i].x = bulletArray[i].x + Math.cos(bulletArray[i].angle)*bulletVelocity;
				bulletArray[i].y = bulletArray[i].y + Math.sin(bulletArray[i].angle)*bulletVelocity;
			}
		}
		else
		{
			if(bulletArray[i] != "undefined")
			{
				if (tanksArray[bulletArray[i].clientID].numShots > 0) {
					tanksArray[bulletArray[i].clientID].numShots = tanksArray[bulletArray[i].clientID].numShots - 1;	
				}
				bulletArray[i] = "undefined";
				
				for (var index=0; index < bulletEmptySlotArray.length; index++) {
					if(bulletEmptySlotArray[index] == "undefined")
					{
						bulletEmptySlotArray[index] = i;
						break;
					}
				};
			}
		}
	};
}

setInterval(function() {
    moveTank();
	moveBullets();
    io.sockets.volatile.emit('draw', tanksArray, bulletArray);
}, fps);





console.log('Server running');
