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
  // Now we are subscribed to both the 'news' and 'music' channels. 
  // `count` represents the number of channels we are currently subscribed to. 
 
  pub.publish('*', 'Hello world!');
});
 
redis.on('message', function (channel, message) {
  // Receive message Hello world! from channel news 
  // Receive message Hello again! from channel music 
  console.log('Receive message %s from channel %s', message, channel);
});
 
// There's also an event called 'messageBuffer', which is the same as 'message' except 
// it returns buffers instead of strings. 
redis.on('messageBuffer', function (channel, message) {
  // Both `channel` and `message` are buffers. 
});