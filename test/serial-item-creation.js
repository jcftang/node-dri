var assert = require('chai').assert
var dri = require('dri');

var collId = "";
var seriesId = "";
var itemId = "";
var arrItems = new Array()
var rnd = Math.floor(Math.random() * 1001);
var start = 1;
module.exports = {
	'createCollection' : function(done) {
		var data = {};
		data.Title = "AutoTestColl" + rnd;
		data.type = "collection";
		dri.createCollection(data, function(result) {
			assert.ok(result);
			collId = result;
			done();
		}, function(e) {
			console.log(e);
			done();
		});
	},
	'createSeries' : function(done) {
		var data = {
			collection : collId,
			Title : "AutoTestSeries" + rnd,
			author : "AutoBot",
			type : "series"
		};
		dri.createSeries(data, function(result) {
			assert.ok(result);
			seriesId = result
			done();
		}, function(e) {
			console.log(e);
			done();
		});
	},
	'createItem' : function(done) {
		//setTimeout(function()
		var data = {
			parentId : seriesId,
			Title : "AutoBotTitle" + rnd,
			Subtitle : "AutoBotSubitle" + rnd,
			objectId : rnd,
			type : "item"
		};
		dri.createItem(data, function(result) {
			assert.ok(result);
			itemId = result;
			done();

		}, function(e) {
			console.log(e);
			done();
		});
	},
	'getItem' : function(done) {
		dri.getItem(itemId, function(result) {
			assert.equal(itemId, result._id);
			done();
		}, function(e) {
			console.log(e);
			done();
		});
	},
	'getItems' : function(done) {
		dri.getItems(seriesId, function(result) {
			var str = result[0].parentId;
			assert.equal(str, seriesId);
			done();
		}, function(e) {
			console.log(e);
			assert.isDefined(e);
			done();
		});
	},
	'approveItem' : function(done) {
		dri.approveItem(itemId, "cfedoraLib", function(pid) {
			assert.include(pid, ":");
			done();
		}, function(err) {
			console.log(err);
			done();
		});
	},
	'getAllRecordsByType' : function(done) {
		dri.getAllRecordsByType("series", function(data) {
			assert.equal(data[0].type, "series");
			done();
		});
	},
	'removeItem' : function(done) {
		dri.removeItem(itemId, function(id) {
			assert.include(itemId, id);
			done();
		}, function(err) {
			console.log(err);
			done();
		});
	},
	'removeSeries' : function(done) {
		dri.removeItem(seriesId, function(id) {
			assert.include(seriesId, id);
			done();
		}, function(err) {
			console.log(err);
			done();
		});
	},
	'removeCollection' : function(done) {
		dri.removeItem(collId, function(id) {
			assert.include(collId, id);
			done();
		}, function(err) {
			console.log(err);
			done();
		});
	},
	'getAllRecordsByType' : function(done) {
		dri.getAllRecordsByType("series", function(data) {
			assert.equal(data[0].type, "series");
			done();
		});
	},
	'getAllMediaItems' : function(done) {
		dri.getAllMediaItems(function(data) {
			assert.isDefined(data);
			done();
		});
	}
};
