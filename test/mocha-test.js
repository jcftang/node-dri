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
	}),describe('Removing an item and children items', function() {
		it('should return the id of the removed item', function(done) {
			dri.removeItem(itemId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
			});
		})
	}),describe('Removing a series and children items', function() {
		it('should return the id of the removed series', function(done) {
			dri.removeSeries(seriesId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
			});
		})
	}), describe('Removing a Dri-Collection and children series or items', function() {
		it('should return the id of the removed Dri-Collection', function(done) {
			dri.removeCollection(collId, function(id) {
				should.equal(1, id);
				done();
			}, function(err) {
				should.not.exist(e);
			});
		})
	})
})





