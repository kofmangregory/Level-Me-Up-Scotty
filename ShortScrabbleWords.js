module.exports.init = function(db, words, callback) {
	var error = null;
	var operation = words.map(function(word) {
		var key = word.length + '!' + word;
		return {
			type: 'put',
			key: key,
			value: word
		}
	})
	db.batch(operation, callback);
}

module.exports.query = function(db, word, callback) {
	var words = [];
	var key = word.length + '!' + word.replace(/\*/, '');
	var error = null;
	db.createReadStream({start: key, end: key + '\xff'}).on('data', function(data) {
		words.push(data.value);
	}).on('error', function(err){
		error = err;
	}).on('end', function() {
		callback(error, words);
	}) 
 }