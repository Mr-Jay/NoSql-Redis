var http = require('http');

var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);

redis.subscribe('*', function (err, count) {
  pub.publish('*', 'Hello world!');
});
 
redis.on('message', function (channel, message) {
  console.log('Receive message %s from channel %s', message, channel);
});
 
redis.on('messageBuffer', function (channel, message) {
});