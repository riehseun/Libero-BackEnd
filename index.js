var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
  	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){ 
	var address = socket.handshake.address;
 	console.log('New connection from ' + address.address + ':' + address.port);
	
	/*
   	socket.on('msg', function(msg){
		var arr = msg.split(":");
		var count = arr[0];
		var user = arr[1];
		//console.log(user + " has " + count + " push ups");
		if (users.indexOf(user) == -1) {
			users.push(user);	
		}
	});
	*/
    	//console.log(msg);
    	//io.emit('user', msg);
	
	socket.on('msg', function(msg) {
		console.log("ready to broadcast");
		var arr = msg.split(":");
		var count = arr[0];
		var user = arr[1];
		console.log(user + " has " + count + " push ups");
		socket.broadcast.emit('msg', {
			users: user,
			counts: count
		});
 	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
