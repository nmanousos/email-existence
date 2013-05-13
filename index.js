var dns = require('dns'),
	net = require('net');

module.exports = function (email, callback, timeout) {
	timeout = timeout || 5000;
	if (!/^\S+@\S+$/.test(email)) {
		callback(null, false);
		return;
	}
	dns.resolveMx(email.split('@')[1], function(err, addresses){
		if (err || addresses.length === 0) {
			callback(err, false);
			return;
		}
		var conn = net.createConnection(25, addresses[0].exchange);
		var commands = [ "helo " + addresses[0].exchange, "mail from: <"+email+">", "rcpt to: <"+email+">" ];
		var i = 0;
		conn.setEncoding('ascii');
		conn.setTimeout(timeout);
		conn.on('error', function() {
			conn.emit('false');
		});
		conn.on('false', function () {
			callback(err, false);
			conn.removeAllListeners();
		});
		conn.on('connect', function() {
			conn.on('prompt', function () {
				if(i < 3){
					conn.write(commands[i]);
					conn.write('\n');
					i++;
				} else {
					callback(err, true);
					conn.removeAllListeners();
				}
			});
			conn.on('undetermined', function () {
				//in case of an unrecognisable response tell the callback we're not sure
				callback(err, false, true);
				conn.removeAllListeners();
			});
			conn.on('timeout', function () {
				conn.emit('undetermined');
			});
			conn.on('data', function(data) {
				if(data.indexOf("220") != -1 || data.indexOf("250") != -1) {
					conn.emit('prompt');
				} else if(data.indexOf("550") != -1) {
					conn.emit('false');
				} else {
					conn.emit('undetermined');
				}
			});
		});
	});
};

// compatibility
module.exports.check = module.exports;
