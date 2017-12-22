var level = require("level");

module.exports = function(databaseDir, date, callback) {
	var error = null;
	var lteStr = date + "\xff";
	var tweetArr = [];
	var db = level(databaseDir);
	db.createReadStream({gte: date, lte: lteStr}).on("error", function(err){
		 error = err;
	}).on("data", function(data){
	 	tweetArr.push(data.value);
	}).on("end", function() {
	 	db.close(function() {
	 		callback(error, tweetArr);
	 	})
	})
}