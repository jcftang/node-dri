var assert = require('chai').assert
var should = require('should')
var dri = require('dri');

var collId = "";
var seriesId = "";
var itemId = "";
var arrItems = new Array();
var rnd = Math.floor(Math.random() * 1001);

describe('Test cases for node-dri package', function() {
	describe('Creating a Collection', function() {
		it('should create a collection and return the id of the collection', function(done) {
			var data = {};
			data.Title = "AutoTestColl" + rnd;
			data.type = "collection";
			dri.createCollection(data, function(result) {
				result.should.be.ok
				collId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Creating a Series', function() {
		it('should create a series and return the id of the series', function(done) {
			var data = {
				collection : collId,
				Title : "AutoTestSeries" + rnd,
				author : "AutoBot",
				type : "series"
			};
			dri.createSeries(data, function(result) {
				result.should.be.ok
				seriesId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Creating an Item', function() {
		it('should create an Item and return the id of the Item', function(done) {
			var data = {
				parentId : seriesId,
				Title : "AutoBotTitle" + rnd,
				Subtitle : "AutoBotSubitle" + rnd,
				objectId : rnd,
				type : "item"
			};
			dri.createItem(data, function(result) {
				result.should.be.ok
				itemId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Getting an Item', function() {
		it('should get an Item and return the Item', function(done) {
			dri.getItem(itemId, function(result) {
				should.equal(itemId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Inserting an Item', function() {
		it('Should create the new item, update the position of the other items and return the id of the created item', function(done) {
			var data = {
				amount : 10,
				parentId : seriesId,
				objectId : 0,
				Title : "AutoBotTitle" + rnd,
				Subtitle : "AutoBotSubitle" + rnd,
				type : "item"
			};
			for(var i = 0; i < data.amount; i++) {
				data.objectId = data.objectId +i;
				dri.createItem(data, function(result) {
					result.should.be.ok;
				}, function(e) {
					should.not.exist(e);
				});
			}
			data.objectId = 3;
			dri.updateIdOrder(data.parentId, data.objectId, 1, function(amount) {
				amount.should.be.a("number");
				dri.createItem(data, function(id) {
					dri.getItems(seriesId, function(result) {
						var str = result.length;
						should.equal(str, 12);
						done();
					}, function(e) {
						should.not.exist(e);
						done();
					});
				}, function(e) {
					should.not.exist(e);
					done();
				});
			})
		})
	}), describe('Getting all children of a parent item', function() {
		it('should get an array of children', function(done) {
			dri.getItems(seriesId, function(result) {
				var str = result[0].parentId;
				should.equal(str, seriesId);
				done();
			}, function(e) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Pushing the item into fedora', function() {
		it('should push the item into fedora and return the fedora id from that item', function(done) {
			dri.approveItem(itemId, "cfedoraLib", function(pid) {
				pid.should.include(":");
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Getting items from a certain type', function() {
		it('should return an array of items from a certain type (here series)', function(done) {
			dri.getAllRecordsByType("series", function(data) {
				should.equal(data[0].type, "series");
				done();
			});
		})
	}), describe('Removing an item and children items', function() {
		it('should return the id of the removed item', function() {
			dri.removeItem(seriesId, function(id) {
				should.equal(seriesId, id);
			}, function(err) {
				should.not.exist(e);
			});
		})
	}), describe('Removing an item and children items', function() {
		it('should return the id of the removed item', function() {
			dri.removeItem(itemId, function(id) {
				should.equal(itemId, id);
			}, function(err) {
				should.not.exist(e);

			});
		})
	}), describe('Removing a collection and children series and/or items', function() {
		it('should return the id of the removed collection', function() {
			
				dri.removeItem(collId, function(id) {
				should.equal(collId, id);
			}, function(err) {
				should.not.exist(e);

			});
		
			
		})
	}), describe('Getting all media files', function() {
		it('should return an array with the media files metadata', function(done) {
			dri.getAllMediaItems(function(data) {
				should.exist(data);
				done();
			});
		})
	})
})

function createTestObjects(callback) {
	var idCol;
	var data = {};
	data.Title = "AutoTestColl" + rnd;
	data.type = "collection";
	dri.createCollection(data, function(result) {
		idCol = result;
		var data = {
			collection : result,
			Title : "AutoTestSeries" + rnd,
			author : "AutoBot",
			type : "series"
		};
		dri.createSeries(data, function(result) {
			var data = {
				amount : 10,
				parentId : result,
				objectId : 0,
				Title : "AutoBotTitle" + rnd,
				Subtitle : "AutoBotSubitle" + rnd,
				type : "item"
			};
			for(var i = 0; i < data.amount; i++) {
				data.objectId = data.objectId + i;
				dri.createItem(data, function(result) {
					callback( idCol);
				}, function(e) {
					should.not.exist(e);
				});
			}
		}, function(e) {
			should.not.exist(e);
		});
	}, function(e) {
		should.not.exist(e);
	});
}




