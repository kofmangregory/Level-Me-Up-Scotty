var level = require("level");

module.exports = function(databaseDir, obj, callback) {
	var db = level(databaseDir);
	var error = null;
	for (var key in obj) {
		db.put(key, obj[key], function(err) {
			if (err) {
				error = err;
			}
		});
	}
	db.close (function () {
		callback(error);
	})
}