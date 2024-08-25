const net = require("net");

// Get command line arguments
var args = process.argv.slice(2);
var client_id = 0;

var client = new net.Socket();

client.connect(3000, '127.0.0.1', function() {
	console.log('Online!\n');

	if (client_id == 0) {
		client.write('client0 ' + args[0]);
	} else if (client_id == 1) {
		client.write('client1 ' + args[0]);
	}

	if (args[0] !== '-l') {
		client.end();
	}
	
	client.on('data', function(data) {
		var string = data.toString();
		console.log(string);
		client.end();
	});
});
