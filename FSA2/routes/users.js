var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var fs = require('fs');

/*
 * GET userlist.
 */
 
router.get('/Todo', function(req, res) {
    Todo.find().lean().exec(function (err, docs) {
		var dbOutput = './/public/ajax/db_output.txt';
	var outValue = '{"data":' + JSON.stringify(docs, null, 4) + '}';
		fs.writeFile(dbOutput, outValue, function (err) {
			if (err) return console.log(err);
		console.log('Hello World > db_output.txt');
});
    return res.end(outValue);
});
   /*  Todo.find({}, {}, function(e, docs){
        res.json(docs);
    }); */
});

module.exports = router;