// Require dependencies
var app = require('http').createServer(handler)
, fs = require('fs')
, io = require('socket.io').listen(app);
 
// creating the server ( localhost:8000 )
app.listen(8080);


var ticker = 0;
var data=Object();
data.x=10;
data.y=10;

 
// on server started we can load our client.html page
function handler(req, res) {
  fs.readFile(__dirname + '/tanks.html', function(err, data) {
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
 
  setInterval(function(){
    io.sockets.volatile.emit( 'draw' , data);
  },1000);


  socket.on('user_click', function(data) { 
      ticker = ticker+1;
      io.sockets.volatile.emit( 'ticker_up' , 'Ticker: ' + ticker );
    });

 
});


