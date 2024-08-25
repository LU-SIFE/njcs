const net = require("net");
const fs = require("node:fs");

var string_client0 = '';
var string_client1 = '';

// read variable from file
fs.readFile('./var0', 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	string_client0 = data;
});

fs.readFile('./var1', 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	string_client1 = data;
})

var server = net.createServer(function(socket) {

	// Socket data recieve
	socket.on('data', function(data) {
		var string = data.toString().slice(8);
		var client_id = data.toString().slice(0,7);

		if (client_id == 'client0') {
			if (string == '-l') {
				socket.write(string_client1)
			} else {
				string_client0 = string;
				fs.writeFile('.var0', string, err => {
					if (err) {console.error(err)}
				});
			}

		} else if (client_id == 'client1') {
			if (string == '-l') {
				socket.write(string_client0)
			} else {
				string_client1 = string;
				fs.writeFile('./var1', string, err => {
					if (err) {console.error(err)}
				});
			}
		}

	});

}).listen(3000, '127.0.0.1');
