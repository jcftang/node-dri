var assert = require('assert');
var data = require('dri');

module.exports = {
	'getAllSeries': function() {
		data.getAllSeries(function(data){
			console.log(data);
			assert.isDefined(data);
		});
	},

	'getAllItems': function() {
		data.getAllItems(function(data){
			console.log(data);
			assert.isDefined(data);
		});
	}
};
