var multilevel = require('multilevel');
var net = require('net');

module.exports = function(callback) {
	var db = multilevel.client();
	var connection = net.connect(4545);
	connection.pipe(db.createRpcStream()).pipe(connection);
	db.get('multilevelmeup', function(err, value) {
		connection.end(function() {
			callback(err, value);
		})
	})
}