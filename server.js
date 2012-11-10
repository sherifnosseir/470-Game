
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , path = require('path')

app.listen(8000);

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

io.sockets.on('connection', function (socket) {



});

console.log('Server running');