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
			//console.log(result);
			assert.isDefined(result);
			collId = result;
			done();
		}, function(e){
			//console.log(e);
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
			//console.log(result);
			assert.isDefined(result);
			seriesId = result
			done();
		}, function(e){
			//console.log(e);
			done();
		});
	},
	'createItem': function(done) {
		//setTimeout(function(){
			data = {
				parentId:seriesId,
				Title:"AutoBotTitle"+rnd,
				Subtitle:"AutoBotSubitle"+rnd,
				objectId:rnd,
				type:"item"
			};
			dri.createItem(data,function(result){
				//console.log(i + " ------" + j);
				assert.isDefined(result);
				itemId = result;
				done();
				
			}, function(e){
				if(arrItems.length == 2){
					console.log(e);
					done();
				}
			});
		//}, 100);
	},
	'getItem': function(done) {
		//setTimeout(function(){
			dri.getItem(itemId,function(result){
				console.log(result._id);
				assert.eql(itemId, result._id);
				done();
			}, function(e){
				console.log(e);
					assert.isDefined(e);
					done();
			});
		//}, 100);
	},
	'getItems': function(done) {
		//setTimeout(function(){
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
		//}, 100);
	},
	'approveItem': function(done) {
		//setTimeout(function(){
			dri.approveItem(itemId, "cfedoraLib", function(pid){
				console.log("-" +pid);
				assert.includes(pid,":");
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
		//}, 100);
	},
	'removeItem': function(done) {
		//setTimeout(function(){
			dri.removeItem(itemId, function(id){
				assert.includes(itemId, id);
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
		//}, 100);
	},
	'removeSeries': function(done) {
		//setTimeout(function(){
			dri.removeItem(seriesId, function(id){
				assert.includes(seriesId, id);
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
		//}, 100);
	},
	'removeCollection': function(done) {
		//setTimeout(function(){
			dri.removeItem(collId, function(id){
				assert.includes(collId, id);
				console.log("remove");
				done();
			}, function(){
				console.log("errr");
				done();
			});
		//}, 100);
	},
	'getAllRecordsByType': function(done) {
		//setTimeout(function(){
			dri.getAllRecordsByType("series", function(data){
				//console.log(data[0].type);
				assert.eql(data[0].type, "series");
				done();
			});
		//}, 100);
	},
	'getAllMediaItems': function(done) {
		//setTimeout(function(){
			dri.getAllMediaItems(function(data){
				//console.log(data[0]);
				assert.isDefined(data);
				done();
			});
		//}, 100);
	}/*,
	'findMedia': function(done) {
		//setTimeout(function(){
			dri.findMediaItem('4f71d50d000000580e000007',function(data){
				//console.log(data[0].filename);
				assert.isDefined(data);
				done();
			});
		//}, 100);
	}*/
};

























