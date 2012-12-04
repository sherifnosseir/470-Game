//Kenny mysql code
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tanks',
});

connection.connect(function(err) {
        console.log('Connected to Mysql Server! ');
});




var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app,{log:false})
  , fs = require('fs')
  , path = require('path')
  , PNG = require('png-js')
  
app.listen(8080);

function handler (req, res) {
	/*use to handle http request*/
    var filePath=__dirname+req.rul;
    var extname = path.extname(filePath);
    console.log(req.url);
    //if(req.url="/")req.url="/index.html";
      
  	fs.readFile(__dirname + req.url, function (err, data) {
  		if (err) {
      		res.writeHead(500);
      		return res.end('Error loading index.html');
    	}
    	res.writeHead(200);
    	res.end(data);
    });
}

//wepaon class starts here
function DoubleShot(){
	    this.type='double';
    	//we.numShots=0;
    	this.maxLoad=6;
    	this.bullets=Array();
    	this.attackSpeed =10;
    	this.coolDown=10;
    	this.damage=6;
		this.velocity=10;
}
DoubleShot.prototype.shoot=function(index,mouseX, mouseY){
	if(this.coolDown>=this.attackSpeed){
		this.coolDown--;
		//shoot
		var newBullet = Object();
			
		//Calculate Bullet Movement
		var xDirection = mouseX - 15 - tanksArray[index].x;
		var yDirection = mouseY - 21 - tanksArray[index].y;
					
		var angle = Math.atan2(yDirection, xDirection);
				
		newBullet.angle = angle;
		newBullet.x = tanksArray[index].x+15 + Math.cos(angle-Math.PI/4)*15;
		newBullet.y = tanksArray[index].y+21 + Math.sin(angle-Math.PI/4)*15;
		newBullet.clientID = tanksArray[index].id;
		tanksArray[index].weapon.bullets[tanksArray[index].weapon.bullets.length]=newBullet;
				
		var secondBullet=Object();
		secondBullet.angle = angle;
		
		secondBullet.x = tanksArray[index].x+15 + Math.cos(angle+Math.PI/4)*15;
		secondBullet.y = tanksArray[index].y+21 + Math.sin(angle+Math.PI/4)*15;
		secondBullet.clientID = tanksArray[index].id;
		
		tanksArray[index].turretAngle = angle;
		tanksArray[index].weapon.bullets[tanksArray[index].weapon.bullets.length]=secondBullet;
		

	}
}
DoubleShot.prototype.clean=function(){
	for(var i=0;i<this.bullets.length;i++){
		clearObject(this.bullets[i].x,this.bullets[i].y,'bullet');
		
	}
	
}

function ClassicShot(){
	this.type="classic";
	this.maxLoad=4;
    this.bullets=Array();
    this.damage=10;
    this.velocity=12;
    this.coolDown=1;
    this.attackspeed=1;
}
ClassicShot.prototype.shoot=function(index,mouseX, mouseY){
	
		//shoot
		var newBullet = Object();
			
		//Calculate Bullet Movement
		var xDirection = mouseX - 15 - tanksArray[index].x;
		var yDirection = mouseY - 21 - tanksArray[index].y;
					
		var angle = Math.atan2(yDirection, xDirection);
				
		newBullet.angle = angle;
		newBullet.x = tanksArray[index].x+15 ;
		newBullet.y = tanksArray[index].y+21 ;
		newBullet.clientID = tanksArray[index].id;
		tanksArray[index].weapon.bullets[tanksArray[index].weapon.bullets.length]=newBullet;
	
}
ClassicShot.prototype.clean=function(){
	for(var i=0;i<this.bullets.length;i++){
		clearObject(this.bullets[i].x,this.bullets[i].y,'bullet');		
	}	
}

function SnipeShot(){
	    this.type='snipe';
    	//we.numShots=0;
    	this.maxLoad=1;
    	this.bullets=Array();
    	this.attackSpeed =70;
    	this.coolDown=70;
    	this.damage=25;
		this.velocity=20;
}

SnipeShot.prototype.shoot=function(index,mouseX, mouseY){
	if(this.coolDown>=this.attackSpeed){
		
		this.coolDown--;
	
		//shoot
		var newBullet = Object();
			
		//Calculate Bullet Movement
		var xDirection = mouseX - 15 - tanksArray[index].x;
		var yDirection = mouseY - 21 - tanksArray[index].y;
					
		var angle = Math.atan2(yDirection, xDirection);
				
		newBullet.angle = angle;
		newBullet.x = tanksArray[index].x+15 ;
		newBullet.y = tanksArray[index].y+21 ;
		newBullet.clientID = tanksArray[index].id;
		tanksArray[index].weapon.bullets[tanksArray[index].weapon.bullets.length]=newBullet;
	}
	
}
SnipeShot.prototype.clean=function(){
	for(var i=0;i<this.bullets.length;i++){
		clearObject(this.bullets[i].x,this.bullets[i].y,'bullet');		
	}	
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
var pixelArrayLength = mapWidth * mapHeight *4;


//added world map;
var worldMap = Array();
//worldMap[0]=pixelMap;
//inital worldMap
for(var i=0;i<1;i++){
	worldMap[i]=Array();
	for(var j=0;j<1;j++){
		var pMap=Array();
		for(var m=0;m<mapWidth;m++){
	    			pMap[m]=Array();
	    			for(var n=0;n<mapHeight;n++){
	    				pMap[m][n]=Object();
	    				pMap[m][n].type='empty';
	    				pMap[m][n].id=-1;
	   					
	   				}
	    		}
		//var ii=i;
		//var jj=j;
		var filename=__dirname +'/mapDataFiles/mapDatax0y0.png';
		//console.log(filename);
		
		//get from files
		//var fs=require('fs');
		path.exists(filename,function(ex){
			if(ex){
				//console.log("esist"+filename);
				PNG.decode(filename, function(pixels) {
				
	    			// pixels is a 1d array of decoded pixel data
		    		if(pixels.length<pixelArrayLength){
		    			consloe.log("small"+(pixels.length-pixelArrayLength));
		    			for(var m=0;m<mapWidth;m++){
		    				pMap[m]=Array();
		    				for(var n=0;n<mapHeight;n++){
		    					pMap[m][n]=Object();
		    					pMap[m][n].type='empty';
		    					pMap[m][n].id=-1;
		    				}
		    			}
		    		}else{
		    			for(var m=0;m<mapWidth;m++){
		    				for(var n=0;n<mapHeight;n++){
		    					pMap[m][n] = new Object();
		    					var pixel=Object();
		    					pixel.r=pixels[n*mapWidth*4+m*4];
		    					pixel.g=pixels[n*mapWidth*4+m*4+1];
		    					pixel.b=pixels[n*mapWidth*4+m*4+2];
		    					pixel.a=pixels[n*mapWidth*4+m*4+3];
		    					if(pixel.r==0 && pixel.g==0 && pixel.b==255 ){
		    						//blue
		    						pMap[m][n].type="water";
		    						pMap[m][n].id=-1;
		    					}else if(pixel.r==0 && pixel.g==0 && pixel.b==0 ){
		    						//black
		    						pMap[m][n].type="rock";
		    						pMap[m][n].id=-1;
		    					}else{
		    						//empty
		    						pMap[m][n].type="empty";
		    						pMap[m][n].id=-1;
		    					}
		    					
		    					//console.log(pixel.r+" "+pixel.g+" "+pixel.b+" "+pixel.a);
		    				}
		    				//console.log(pMap[m][0].type);
		    			}
		    		}
				});
				
			}else{
				for(var m=0;m<mapWidth;m++){
	    			pMap[m]=Array();
	    			for(var n=0;n<mapHeight;n++){
	    				pMap[m][n]=Object();
	    				pMap[m][n].type='empty';
	    				pMap[m][n].id=-1;
	   					
	   				}
	    		}
			}
		});
		worldMap[i][j]=pMap;
		//console.log(worldMap[0][0][0][0].type);
			
	}
}



/*
    tank size = 31*42
    half = 15*21
*/
//state 0 = login
//state 1 = load game


io.sockets.on('connection', function(socket) {
	/*login handler*/
	socket.on('login',function(state,details){
		socket.set('idClient', -1);
		console.log("STATE:"+state);
		username = details[0];
		password = details[1];
		console.log("Username: " + username + " Password: " + password);
		sql="SELECT * FROM users WHERE username ="+connection.escape(username)+"and password="+connection.escape(password);
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
			}else{
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

		socket.on('signup',function(state,details){
		console.log("STATE:"+state);
		username = details[0];
		password = details[1];
		console.log("Username: " + username + " Password: " + password);

		sql="SELECT MAX(tank_id) as max from users";
		console.log(sql);
		connection.query(sql, function(err, rows, fields) {
			if (err) throw err;
			result = rows[0]['max'];
			tank_id = result+1;
			console.log("Tank ID:");
			console.log(tank_id);
			var post = {username: username, password: password, tank_id: tank_id};
			var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
  		// Neat!        
  				console.log("USER SIGNUP RESULT");
                console.log(result);
                var signup_response = result['affectedRows'];
                if(signup_response==1){
                	console.log('signup succesful');
                	socket.emit('signup_response', signup_response);
                }

			});
		});



	});
	
	//Send Map
	socket.on('requestPixelMap', function()
	{
		socket.emit('requestedTile', pixelMap);
	});

/*	socket.on('createIndiviualUserTank')
	{
		var newTank = Object();

	    randomX = Math.floor((Math.random()*mapWidth)+1);
	    randomY = Math.floor((Math.random()*mapHeight)+1);
		id++;
	    newTank.id = id;
		newTank.username = "Server Tank"+id;
	    newTank.hp = 100;
        newTank.status = "alive";
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
                pixelMap[i][j].type = "empty"; 
     	        pixelMap[i][j].id = -1; //-1 means empty
     	    };
        };
	});*/
	
	socket.on('createGuestAccount', function()
	{
		user_info = new Array();

		user_info[0] = "guest"+id; //username
		user_info[1] = "guest"+id; //nickname
		user_info[2] = id%2; //team id
		user_info[3] = id*1000;	//tank id
		id++;
		
		socket.emit('guestResponse', user_info);
	});

	socket.on('createUserTank', function(tank_id, username){
		//id++;
    	var newTank = Object();

    	randomX = Math.floor((Math.random()*mapWidth)+1);
    	randomY = Math.floor((Math.random()*mapHeight)+1);
    	

		newTank.id = tank_id;
		//id++;
		newTank.username = username;
    	newTank.hp = 100;
    	newTank.status = "alive";
    	newTank.x = randomX;  // tank coordinates
    	newTank.y = randomY;
    	//newTank.numShots = 0;
    	//newTank.bullets = Array();
    	newTank.turretAngle = 0;
    	newTank.wheelAngle = 0;
    	newTank.destX = newTank.x;
    	newTank.destY = newTank.y;
    	// weapon setup here
    	
    	var doubleShot=new DoubleShot();
    	newTank.weapon= doubleShot;
    	// weapon done
    	
		//Spawn new Tank
    	spawnTank(newTank);
    	
    	tanksArray[tanksArray.length] = newTank;
    	console.log("Tank Array Length: ");
    	console.log(tanksArray.length);
    	console.log("Tank ID:");
    	console.log(tank_id);
    	socket.emit('setID', tank_id);
    	socket.set('idClient', tank_id);
	});

	
	socket.on('changeWeapon',function(weaponType){
		console.log("change Weapon");
		var index = -1;
		socket.get('idClient', function(err, idClient) {
            
            for (var i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
         });
         if(index ==-1)return;
         
         
         var currentTank=tanksArray[index];
         //still in cool down: cant change weapon;
         if(currentTank.weapon.coolDown<currentTank.weapon.attackSpeed)return;
         //still have bullet flying :cant change weapon;
         if(currentTank.weapon.bullets.length>0)return;
         
         currentTank.weapon.clean();
         if(weaponType=="doubleShot"){
         	var doubleShot=new DoubleShot();
         	currentTank.weapon=doubleShot;
         }else if(weaponType=="classic"){
         	var classicShot=new ClassicShot();
         	currentTank.weapon=classicShot;
         }else if(weaponType=="snipeShot"){
         	currentTank.weapon=new SnipeShot();
      
         }
         console.log(currentTank.weapon.type);
         
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
		if(tanksArray[index] == undefined){
		tanksArray.splice(index, 1);
		}
		else{
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
          	index = -1;
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		});
		if(index==-1)return;
		var currentTank = tanksArray[index];
		//console.log("length"+currentTank.weapon.bullets.length);
		//console.log("status"+currentTank.status);
		//console.log(index);
		if(currentTank == undefined){
			tanksArray.splice(index, 1);
		}
		else{
			if(currentTank.weapon.bullets.length < currentTank.weapon.maxLoad && currentTank.status=='alive') //Check if user has more than 4 shots
			{
			
					currentTank.weapon.shoot(index,mouseX,mouseY);

			}
		}
			
	});

    socket.on('chatsend', function(msg, username) {
        //need to socket.get nickname, for now clientID
        socket.get('idClient', function(err, idClient) {
            msg = msg.replace(/</g,"&lt;");
            msg = msg.replace(/>/g,"&gt;");
            msg = username + ': ' + msg; // we'd replace this with usernames if we got a login
            var sendmsg = msg;
            /*var result = msg.match(/.{1,55}/g);

            for (i = 0; i<result.length-1; i++) {
                sendmsg = sendmsg + result[i] + "<br>";
            }
            sendmsg = sendmsg + result[result.length-1];*/

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
		var index=-1;
        socket.get('idClient', function(err, idClient) {
          	
            for (i=0; i<tanksArray.length; i++) {
                if (tanksArray[i].id == idClient) {
                    index = i;
                }
            };
		});
		
		if(index==-1)return;
		
		currentTank=tanksArray[index];
		
		clearObject(currentTank.x,currentTank.y,"tank", currentTank);
		
		
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


function clearObject (x, y, type) {
	x = Math.floor(x);
	y = Math.floor(y);
	pixelMap = worldMap[0][0];
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
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight){
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
						if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight && pixelMap[x+i][y+j] == "empty"){
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
	pixelMap = worldMap[0][0];
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
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight && pixelMap[x+i][y+j] == "empty")
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
    	//loop for each tank
		//pixelMap
		var currentTank = tanksArray[index];
		clearObject(currentTank.x,currentTank.y,"tank", currentTank);
		
		
		
        if ((Math.abs(currentTank.x - currentTank.destX) < 6) && 
            (Math.abs(currentTank.y - currentTank.destY) < 6)) {
                currentTank.x = currentTank.destX;
                currentTank.y = currentTank.destY;
        }
        else {
        	//update tank's x and y
            var currentX = currentTank.x;
            var currentY = currentTank.y;
            
            var angle = currentTank.wheelAngle;

            //console.log(angle);
            
            var velocityX = (Math.cos(angle))*velocity;
            var velocityY = (Math.sin(angle))*velocity;

            if ((currentTank.x - currentTank.destX) > 0) {
                currentTank.x = currentX - velocityX;
                currentTank.y = currentY - velocityY;
            }
            else {
                currentTank.x = currentX + velocityX;
                currentTank.y = currentY + velocityY;
            }
            //if collision ,roll back
            var colObj=Object();
            colObj=colDetect('tank',0,currentTank);
            var mytype=colObj.type;
            if(mytype !='empty'){
            	//roll back and stop the tank
            	currentTank.x=currentX;
            	currentTank.y=currentY;
            	currentTank.destX=currentX;
            	currentTank.destY=currentY;
            }

        }
        drawObject(currentTank.x,currentTank.y,"tank", currentTank);
        ///change weapon cool down;
        if(currentTank.weapon.coolDown<currentTank.weapon.attackSpeed){
        	currentTank.weapon.coolDown--;
        }
       
        if(currentTank.weapon.coolDown<=0){
        	currentTank.weapon.coolDown=currentTank.weapon.attackSpeed;
        }
        
        //loop for each buulet of this tank
        /* the repalcement of movebullet() function */
        for(var j=currentTank.weapon.bullets.length-1;j>=0;j--){
        	//console.log("tankbullet j:"+currentTank.weapon.bullets);
        	
        	
        	
        	var currentBullet=currentTank.weapon.bullets[j];
        	
        	
        	
        		
			if((currentBullet.x < mapWidth && currentBullet.x > 0) && (currentBullet.y > 0 && currentBullet.y < mapHeight)){
				 //Check if a bullet is out of bound
				var hitObject =Object();
				hitObject = colDetect('bullet',0,currentBullet);
				//console.log("hit:"+hitObject.type+" "+hitObject.id);
				var mytype =hitObject.type;
				var myid =hitObject.id;
				//console.log("mytype:"+mytype);
            	clearObject(currentBullet.x, currentBullet.y, "bullet", currentBullet);
				if(hitObject.type=='tank'){
					/* when the bullet hit the tank */	
					console.log("HIT!");				
					var hitIndex=0;
	            	for (var k=0; k<tanksArray.length; k++) {
	                	if (tanksArray[k].id ==myid) {
	                    	hitIndex = k;
	                	}
	            	}
	            	//Decrease numShots when bullets goes off
					currentTank.weapon.numShots = currentTank.numShots - 1;
					var hitTank=tanksArray[hitIndex];
					if(hitTank.status=='alive')
					{
					/*hits a tank*/
						hitTank.hp = hitTank.hp - currentTank.weapon.damage; // tdl: this 10 should be a variable - tanksArray[index].bulletDamage?				
                    	if (hitTank.hp <= 0) {
                        	hitTank.status = "dead";
                        	hitTank.destX = hitTank.x;
                        	hitTank.destY = hitTank.y;
                    	} 
                    	/*send updated status to all palyer*/            
                    	io.sockets.volatile.emit('updatePlayerStatus', tanksArray);                   
					}
					/*remove the bullet from the bullet array when it hits the target.*/
                	currentTank.weapon.bullets.splice(j, 1);
				}
				else if(mytype=='rock'){//water or rock;
					currentTank.weapon.bullets.splice(j, 1);
				}
				else{
					//bullet not hiting anything
					currentBullet.x = currentBullet.x + Math.cos(currentBullet.angle)*currentTank.weapon.velocity;
					currentBullet.y = currentBullet.y + Math.sin(currentBullet.angle)*currentTank.weapon.velocity;
					drawObject(currentBullet.x, currentBullet.y, "bullet", currentBullet);
				}
			}
			else{
				// out of bound
				//currentTank.weapon.numShots = currentTank.weapon.numShots - 1; //Decrease numShots when bullets goes off
				currentTank.weapon.bullets.splice(j, 1);
			}
        }
    }
};

//** collision detection fucntion , use for all puepose
//** if there is a collision, will return the object id. 
function colDetect(type,mapid,object){
	var emptyObj=Object();
	emptyObj.type='empty';
	emptyObj.id=-1;
	
	var pixelMap=worldMap[mapid][0];
	
	if(type=='bullet'){
		var bullet=object;
		//detect bullet hit
		for (var i=0; i < 5; i++) {
			for (var j=0; j < 5; j++) {
				var x=Math.floor(bullet.x)+i;
				var y=Math.floor(bullet.y)+j;
            //console.log("detecthit x" + x);
            //console.log("detecthit y" + y);
            //console.log("detectHit id " + pixelMap[x][y].id + " detectHit clientID " + bullet.clientID);
			//if(x<0||y<0)console.log("Zero!!");
				if(x<mapWidth&&y<mapHeight){
					//we dont want the bullet to hit the bullet
					if(pixelMap[x][y].type == "tank" && pixelMap[x][y].id != bullet.clientID){
						//hit tanks.
						console.log("detectHit Type " + pixelMap[x][y].type);
						console.log("detectHit id " + pixelMap[x][y].id);
						console.log("detectHit clientID " + bullet.clientID);
						return {type:"tank",id:pixelMap[x][y].id};
					}else if(pixelMap[x][y].type=="rock"){
						//hit object.
						return {type:'rock',id:-1};
						
					}
				}	
			}
		}
		return emptyObj;
	}else if(type=='tank'){
		
		var x=Math.floor(object.x);
		var y=Math.floor(object.y);
		
		for (var i=0; i < 42; i++) {
			for (var j=0; j < 31; j++) {
				if((Math.pow(i-21, 2) + Math.pow(j-15, 2)) < Math.pow(15, 2))
				{
					if(x+i > 0  && y+j > 0 && x+i < mapWidth && y+j < mapHeight){
						//check if is in the bound of the map;
						if(pixelMap[x+i][y+j].type!='empty'&& pixelMap[x+i][y+j].type!='bullet'){
							//run into objects.
							return {type:pixelMap[x+i][y+j].type,id:pixelMap[x+i][y+j].id};
							
						}
						
					}
				}
			}
		}
		return {type:'empty',id:-1};
		
	}
	
	
}
/*
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
*/
/*
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
			if(hitClientID != -1)// -1 means empty
			{
				//when the bullet hit the target 
				//console.log("HIT!");				
				var index;
	            for (j=0; j<tanksArray.length; j++) {
	                if (tanksArray[j].id == hitClientID) {
	                    index = j;
	                }
	            };
	            //Decrease numShots when bullets goes off
				tanksArray[clientIndex].numShots = tanksArray[clientIndex].numShots - 1;
				
				if(tanksArray[index].hp > 0)
				{
					tanksArray[index].hp = tanksArray[index].hp - 10; // tdl: this 10 should be a variable - tanksArray[index].bulletDamage?				
                    if (tanksArray[index].hp <= 0) {
                        tanksArray[index].status = "dead";
                        tanksArray[index].destX = tanksArray[index].x;
                        tanksArray[index].destY = tanksArray[index].y;
                    } 
                    //send updated status to all palyer            
                    io.sockets.volatile.emit('updatePlayerStatus', tanksArray);                   
				}
				//*remove the bullet from the bullet array when it hits the target.
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
*/
function respawn(index){

	mytank=tanksArray[index];
	if(mytank.status == "dead"){
		console.log("respawn!");
		clearObject(mytank.x,mytank.y,'tank');
		mytank.hp=100;
		randomX = Math.floor((Math.random()*mapWidth)+1);
	    randomY = Math.floor((Math.random()*mapHeight)+1);
		mytank.x=randomX;
		mytank.y=randomY;
		mytank.destX = mytank.x;
	    mytank.destY = mytank.y;
		mytank.status = "alive";
		
    	spawnTank(mytank);
		
		io.sockets.volatile.emit('updatePlayerStatus', tanksArray);
	}
}

function spawnTank(tank)
{
	while(colDetect('tank',0,tank).type!="emtpy")
	{
		var s=colDetect('tank',0,tank).type;
		if(s=="empty")break;
		console.log("x:"+colDetect('tank',0,tank).type);
		randomX = Math.floor((Math.random()*mapWidth)+1);
		randomY = Math.floor((Math.random()*mapHeight)+1);
	
		tank.x = randomX;  // tank coordinates
		tank.y = randomY;
		
		tank.destX=tank.x;
		tank.destY=tank.y;
	}
}

setInterval(function() {
    moveTank();
	//moveBullets();
    io.sockets.volatile.emit('draw', tanksArray, bulletArray);
}, fps);





console.log('Server running');
