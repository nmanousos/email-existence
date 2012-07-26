var dns = require('dns')
	, net = require('net');

exports.check = function (email, callback, timeout) {
	timeout = timeout || 5000
	dns.resolveMx(email.split('@')[1], function(err, addresses){
		if (err || addresses.length == 0) {
			callback(err, false);
			return;
		}
		var conn = net.createConnection(25, addresses[0].exchange);
		var commands = [ "helo " + addresses[0].exchange, "mail from: <"+email+">", "rcpt to: <"+email+">" ];
		var i = 0;
		conn.setEncoding('ascii');
		conn.setTimeout(timeout)
		conn.on('connect', function() {
			conn.on('prompt', function () {
				if(i < 3){
					console.log(i + ': ' + commands[i]);
					conn.write(commands[i]);
					conn.write('\n');
					i++;
				} else {
					console.log('true');
					callback(err, true);
				}
			});	
			conn.on('false', function () {
				console.log('false');
				callback(err, false);
			});
			conn.on('undetermined', function () {
				console.log('undetermined');
				callback(err, false, );
			});
			conn.on('data', function(data) {
				console.log("got: " + data);
				if(data.indexOf("220") != -1 || data.indexOf("250") != -1) {
					conn.emit('prompt');
				} else if(data.indexOf("550") != -1) {
					callback(err, false);
				} else {
					//in case of an unrecognisable response tell teh callback we're not sure
					callback(err, false, true)
				}
			});
		});
	});	
};
