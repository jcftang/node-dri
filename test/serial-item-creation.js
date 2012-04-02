var assert = require('assert');
var dri = require('dri');

var collId = "";
var seriesId = "";
var itemId = "";
var arrItems = new Array()
var rnd = Math.floor(Math.random()*11);
var start = 1;
module.exports = {
	'createCollection': function(done) {
		data = {};
		data.Title = "AutoTestColl"+rnd;
		data.type="colection";
		dri.createCollection(data,function(result){
			assert.isDefined(result);
			collId = result;
			done();
		}, function(e){
			done();
		});
	},
	'createSeries': function(done) {
		data = {
			collection:collId,
			Title:"AutoTestSeries"+rnd,
			author:"AutoBot",
			type:"series"
			};
		dri.createSeries(data,function(result){
			assert.isDefined(result);
			seriesId = result
			done();
		}, function(e){
			done();
		});
	},
	'createItem': function(done) {
		//setTimeout(function()
			data = {
				parentId:seriesId,
				Title:"AutoBotTitle"+rnd,
				Subtitle:"AutoBotSubitle"+rnd,
				objectId:rnd,
				type:"item"
			};
			dri.createItem(data,function(result){
				assert.isDefined(result);
				itemId = result;
				done();
				
			}, function(e){
				if(arrItems.length == 2){
					console.log(e);
					done();
				}
			});
	},
	'getItem': function(done) {
			dri.getItem(itemId,function(result){
				console.log(result._id);
				assert.eql(itemId, result._id);
				done();
			}, function(e){
				console.log(e);
					assert.isDefined(e);
					done();
			});
	},
	'getItems': function(done) {
			dri.getItems(seriesId,function(result){
				str = result[0].parentId;
				console.log(str);
				assert.eql(str, seriesId);
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
				assert.includes(pid,":");
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
	},
	'getAllRecordsByType': function(done) {
			dri.getAllRecordsByType("series", function(data){
				assert.eql(data[0].type, "series");
				done();
			});
	},
	'removeItem': function(done) {
			dri.removeItem(itemId, function(id){
				assert.includes(itemId, id);
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
				assert.includes(seriesId, id);
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
				assert.includes(collId, id);
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
				assert.eql(data[0].type, "series");
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

























