// Require dependencies
var app = require('http').createServer(handler)
, fs = require('fs')
, io = require('socket.io').listen(app);

var environment = "development" 
// creating the server ( localhost:8000 )
if(environment == "production")
{
	app.listen(8080);
}
else
{
	app.listen(8000);
}

var ticker = 0;
var data=Object();
data.x=10;
data.y=10;

 
// on server started we can load our client.html page
function handler(req, res) {
  fs.readFile(__dirname + '/tankView.html', function(err, data) {
    if(err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading tanks.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
 
// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {
 
  setInterval(function()
{   	
	if(data.y>200)data.y=10;
	data.y++;
    io.sockets.volatile.emit( 'draw' , data);
  },100);

  socket.on('move_left',function(){
	data.x=data.x-5;});
  socket.on('move_right',function(){
	data.x=data.x+5;});

  socket.on('user_click', function(data) { 
      ticker = ticker+1;
      io.sockets.volatile.emit( 'ticker_up' , 'Ticker: ' + ticker );
    });

 
});


