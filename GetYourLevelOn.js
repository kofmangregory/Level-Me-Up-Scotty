var level = require('level');

module.exports = function (databaseDir, key, callback) {
	var db = level(databaseDir);
	db.get(key, function(error, value) {
		db.close(function(err) {
			callback(err || error, value);
		})
	});
}