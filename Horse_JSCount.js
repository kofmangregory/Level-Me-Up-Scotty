var level = require("level");

module.exports = function (databaseDir, date, callback) {
	var error = null;
	var tweetCount = 0;
	var db = level(databaseDir);
	db.createReadStream({gte: date}).on("error", function(err) {
		error = err;
	}).on("data", function(data) {
		tweetCount++;
	}).on("end", function() {
		db.close(function(){
			callback(error, tweetCount);
		})
	})
}