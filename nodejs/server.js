var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var port = 3000;

http.createServer(function(req,res){
  var pathname = url.parse(req.url).pathname;
  !!getType(pathname)? sendFile(res, pathname): setRandom(res);
}).listen(port);
console.log('server listen on', port);

function sendFile(res, pathname) {
  var filePath = __dirname + pathname;
  var mimeType = getType(pathname);
    fs.readFile(filePath, function(err, data){
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200,{"Content-Type": mimeType});
        res.end(data);
      }
    });
}

function setRandom(res) {
  var random_time = 1000 + getRandomNumber(2000);
  var random_num  = 1 + getRandomNumber(9);
  setTimeout(function(){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("" + random_num);
  }, random_time);
}

function getRandomNumber(limit) {
  return Math.round(Math.random() * limit);
}

function getType(pathname) {
  var validExtensions = {
    ".html" : "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png"
  };
  var Type = validExtensions[path.extname(pathname)];
  return Type;
}