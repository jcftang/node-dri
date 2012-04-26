/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */
var assert = require('chai').assert
var should = require('should')
var dri = require('dri');
var request = require('request');

var collId = "";
var seriesId = "";
var itemId = "";
var rnd = Math.floor(Math.random() * 1001);


// Create mock config file to configure the package
var config ={
    "uploadDirectory": "/tmp/uploads/"
  , "fedoraURL": "howest-server.tchpc.tcd.ie"
  , "fedoraPort": 9191
  , "fedoraAuth": "fedoraAdmin:admin"
}
dri.configure(config)

describe('Test cases for node-dri package', function() {
	describe('Calling getObjectTypes(onSuccess, onError), will get object types', function() {
		it('should return an array of all the object types', function(done) {
			dri.getObjectTypes(function(result) {
				result.should.be.ok
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling createObject(data, onSuccess, onError) to create a collection', function() {
		it('should create a collection and return the id of the collection', function(done) {
			var data = {
				properties : {
					title : "AutoTestColl" + rnd,
					subtitle : "SubAutoTestColl" + rnd
				},
				status : "open",
				type : "collection"
			};
			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.length(result, 24)
				collId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling createObject(data, onSuccess, onError) to create a series', function() {
		it('should create a series and return the id of the series', function(done) {
			var data = {
				properties : {
					title : "AutoTestSeries" + rnd,
					subtitle : "SubAutoTestSeries" + rnd
				},
				status : "open",
				type : "series",
				parentId : collId
			};
			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.length(result, 24)
				seriesId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling createObject(data, onSuccess, onError) to create an item', function() {
		it('should create an Item and return the id of the Item', function(done) {
			var data = {
				properties : {
					title : "AutoTestItem" + rnd,
					subtitle : "SubAutoTestItem" + rnd
				},
				status : "open",
				type : "item",
				parentId : seriesId
			};
			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.length(result, 24)
				itemId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling getObject(id, onSuccess, onError) to get an item', function() {
		it('should get an Item and return the Item', function(done) {
			dri.getObject(itemId, function(result) {
				assert.include(result._id, itemId)
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling getObject(id, onSuccess, onError) to get a Series', function() {
		it('should get an series and return the series', function(done) {
			dri.getObject(seriesId, function(result) {
				assert.equal(seriesId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling getChildren(parentId, onSuccess, onError) to get the children of a series', function() {
		it('should get the series and return the children', function(done) {
			dri.getChildren(seriesId, function(result) {
				assert.include(result[0], itemId);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling getObject(id, onSuccess, onError) to get a collection', function() {
		it('should get a collection and return the collection', function(done) {
			dri.getObject(collId, function(result) {
				assert.equal(collId, result._id);
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling approveItem(id, fedoraNamespace, onSuccess, onError) with a item id', function() {
		it('should push the item into fedora and return the fedora id from that item', function(done) {
			dri.approveItem(itemId, "afedoraLib", function(pid) {
				pid.should.include(":");
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling removeObject(id, onSuccess, onError) with a item id', function() {
		it('should remove the item from MongoDB', function(done) {
			dri.removeObject(itemId, function(result) {
				assert.include(result, itemId)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('calling removeObject(id, onSuccess, onError) with a series id', function() {
		it('should remove the series from MongoDB', function(done) {
			dri.removeObject(seriesId, function(result) {
				assert.include(result, seriesId)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling removeObject(id, onSuccess, onError) with a collection id', function() {
		it('should remove the collection from MongoDB', function(done) {
			dri.removeObject(collId, function(result) {
				assert.include(result, collId)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	})
})
