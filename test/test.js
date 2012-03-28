var assert = require('assert');
var data = require('dri');

module.exports = {
	'getSeries': function() {
		data.getAllSeries(function(data){
			console.log(data);
			assert.isDefined(data);
		});
	}
};
