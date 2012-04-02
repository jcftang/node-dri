var assert = require('chai').assert
var dri = require('dri');

var collId = "";
var seriesId = "";
var itemId = "";
var arrItems = new Array()
var rnd = Math.floor(Math.random()*11);
var start = 1;
module.exports = {
	'createCollection': function(done) {
		var data = {};
		data.Title = "AutoTestColl"+rnd;
		data.type="collection";
		dri.createCollection(data,function(result){
			assert.ok(result);
			collId = result;
			done();
		}, function(e){
			done();
		});
	},
	'createSeries': function(done) {
		var data = {
			collection:collId,
			Title:"AutoTestSeries"+rnd,
			author:"AutoBot",
			type:"series"
			};
		dri.createSeries(data,function(result){
			assert.ok(result);
			seriesId = result
			done();
		}, function(e){
			done();
		});
	},
	'createItem': function(done) {
		//setTimeout(function()
			var data = {
				parentId:seriesId,
				Title:"AutoBotTitle"+rnd,
				Subtitle:"AutoBotSubitle"+rnd,
				objectId:rnd,
				type:"item"
			};
			dri.createItem(data,function(result){
				assert.ok(result);
				itemId = result;
				done();
				
			}, function(e){
				done();
			});
	},
	'getItem': function(done) {
			dri.getItem(itemId,function(result){
				console.log(result._id);
				assert.equal(itemId, result._id);
				done();
			}, function(e){
				console.log(e);
				done();
			});
	},
	'getItems': function(done) {
			dri.getItems(seriesId,function(result){
				var str = result[0].parentId;
				console.log(str);
				assert.equal(str, seriesId);
				done();
			}, function(e){
				console.log(e);
				assert.isDefined(e);
				done();
			});
	},
	'approveItem': function(done) {
			dri.approveItem(itemId, "cfedoraLib", function(pid){
				console.log("-" +pid);
				assert.include(pid,":");
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
	},
	'getAllRecordsByType': function(done) {
			dri.getAllRecordsByType("series", function(data){
				assert.equal(data[0].type, "series");
				done();
			});
	},
	'removeItem': function(done) {
			dri.removeItem(itemId, function(id){
				assert.include(itemId, id);
				console.log("remove");
				done();
			}, function(err){
				console.log("RemoveItem");
				console.log(err);
				done();
			});
	},
	'removeSeries': function(done) {
			dri.removeItem(seriesId, function(id){
				assert.include(seriesId, id);
				console.log("remove");
				done();
			}, function(err){
				console.log("RemoveSeries");
				console.log(err);
				done();
			});
	},
	'removeCollection': function(done) {
			dri.removeItem(collId, function(id){
				assert.include(collId, id);
				console.log("remove");
				done();
			}, function(err){
				console.log(err);
				done();
			});
	},
	'getAllRecordsByType': function(done) {
			dri.getAllRecordsByType("series", function(data){
				//console.log("nja");
				//console.log(data[0].type);
				assert.equal(data[0].type, "series");
				done();
			});
	},
	'getAllMediaItems': function(done) {
			dri.getAllMediaItems(function(data){
				//console.log(data[0]);
				assert.isDefined(data);
				done();
			});
	}
};

























