var level = require("level");

module.exports = function(databaseDir, callback) {
	var db = level(databaseDir);
	var error = null;
	var result = [];
	for (var i = 0; i < 100; i++) {
		var key = "key" + i;
		db.get(key, function(err, value) {
			if (err) {
				if (!err.notFound) {
					error = err;
				} 
			}
			else {
				result.push(value);
			}
		})
	}
	db.close(function() {
		callback(error, result);
	})
}