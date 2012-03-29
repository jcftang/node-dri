var assert = require('assert');
var dri = require('dri');

var collId = "";
var seriesId = "";
var rnd = Math.floor(Math.random()*101);
module.exports = {
	'createCollection': function(done) {
		data = {};
		data.name = "AutoTestColl"+rnd;
		dri.createCollection(data,function(result){
			console.log(result);
			assert.isDefined(result);
			collId = result;
			done();
		}, function(e){
			console.log(e);
			done();
		});
	},
	'createSeries': function(done) {
		data = {
			collection:collId,
			name:"AutoTestSeries"+rnd,
			author:"AutoBot"
			};
		dri.createSeries(data,function(result){
			console.log(result);
			assert.isDefined(result);
			seriesId = result
			done();
		}, function(e){
			console.log(e);
			done();
		});
	},
	'createItem': function(done) {
		data = {
			parentId:seriesId,
			Title:"AutoBotTitle"+rnd,
			Subtitle:"AutoBotSubitle"+rnd
			};
		for (var i=1, j=rnd; i <= j; i++) {
			data.objectId = i;
			dri.createItem(data,function(result){
				console.log(result);
				assert.isDefined(result);
				if( i = j)
					done();
			}, function(e){
				console.log(e);
				if( i = j)
					done();
			});
		};
	}
};

























