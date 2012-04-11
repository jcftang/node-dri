var assert = require('chai').assert
var should = require('should')
var dri = require('dri');

var collId = "";
var seriesId = "";
var itemId = "";
var arrItems = new Array();
var rnd = Math.floor(Math.random() * 1001);

describe('Test cases for node-dri package', function() {
	describe('Creating a Dri-Collection', function() {
		it('should create a Dri-Collection and return the id of the Dri-Collection', function(done) {
			var data = {
				properties:{
					title:"AutoTestColl" + rnd,
					subtitle:"AutoTestColl" + rnd
				},
				status : "Open"
			};
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
				properties:{
					title:"AutoTestColl" + rnd,
					subtitle:"AutoTestColl" + rnd
				},
				status : "Open"
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
				properties:{
					title:"AutoTestColl" + rnd,
					subtitle:"AutoTestColl" + rnd
				},
				status : "Approved"
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
				assert.equal(itemId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Getting a Series', function() {
		it('should get an Series and return the Series', function(done) {
			dri.getSeries(seriesId, function(result) {
				assert.equal(seriesId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Getting a Dri-Collection', function() {
		it('should get an Dri-Collection and return the Dri-Collection', function(done) {
			dri.getCollection(collId, function(result) {
				assert.equal(collId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), /*describe('Inserting an Item', function() {
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
	}), */describe('Pushing the item into fedora', function() {
		it('should push the item into fedora and return the fedora id from that item', function(done) {
			dri.approveItem(itemId, "cfedoraLib", function(pid) {
				pid.should.include(":");
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}),describe('Removing an item and children items', function() {
		it('should return the id of the removed item', function(done) {
			dri.removeItem(itemId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}),describe('Removing a series and children items', function() {
		it('should return the id of the removed series', function(done) {
			dri.removeSeries(seriesId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Removing a Dri-Collection and children series or items', function() {
		it('should return the id of the removed Dri-Collection', function(done) {
			dri.removeCollection(collId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	})/*, describe('Getting all media files', function() {
		it('should return an array with the media files metadata', function(done) {
			dri.getAllMediaItems(function(data) {
				should.exist(data);
				done();
			});
		})
	})*/
})
