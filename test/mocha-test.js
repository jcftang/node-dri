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
var config = {
	"uploadDirectory" : "/tmp/uploads/",
	"fedoraURL" : "howest-server.tchpc.tcd.ie",
	"fedoraPort" : 9191,
	"fedoraAuth" : "fedoraAdmin:admin",
	"mongoDBURL" : "mongodb://localhost/dri" /*URL to the mongoDB instance*/
}
dri.configure(config)
var data = {
	status : "open",
	type : "item",
	properties : {
		relatedItem : [{
			title : "hsthshsshsf",
			type : "series"
		}],
		tableOfContents : [{
			texttableOfContentsDescription : "yrshs5yfgh",
			type : "text"
		}],
		language : [{
			languageTerm : [{
				authority : "iso639-2b4",
				language : "English",
				type : "text"
			}]
		}],
		accessCondition : [{
			type : "restriction"
		}],
		location : [{
			url : "srysrysrysr",
			enumerationAndChronology : "5yr5ysrysry",
			shelfLocator : "ys5ys",
			physicalLocation : "shtsrhstr5"
		}],
		identifier : [{
			identifier : "shtrshsrhsrh",
			type : "dris"
		}],
		subject : [{
			topic : [{
				topic : "4s5yserys5ys5ryrs",
				authority : "lcsh"
			}],
			authority : "naf",
			type : "personal",
			name : "hdfghdfdfgh"
		}],
		note : [{
			note : "hdhgdhdfgggg",
			type : "acquisition"
		}],
		abstract : [{
			abstract : [{
				abstract : "2344654635",
				type : "text"
			}]
		}],
		physicalDescription : [{
			internetMediaType : [{
				internetMediaType : "image/tiff"
			}],
			type : [{
				typeDescription : "2345",
				type : "condition"
			}],
			digitalOrigin : "reformatted",
			note : "2345",
			extent : "2345"
		}],
		originInfo : [{
			dateOther : [{
				dateOther : "2345",
				point : "beginning"
			}],
			frequency : "2345",
			issuance : "2345",
			edition : "2345",
			copyrightDate : "2345",
			dateValid : "2345",
			dateCaptured : "2345",
			dateIssued : "2345",
			publisher : "123`",
			place : "1234"
		}, {
			dateOther : [{
				dateOther : "jdgj",
				point : "beginning"
			}],
			frequency : "dgyjyjdg",
			issuance : "jdgj",
			edition : "dgjdg",
			copyrightDate : "jdgjdg",
			dateValid : "dgyjdg",
			dateCaptured : "jdgj",
			dateIssued : "dgyjdg",
			publisher : "dyjjjydgjd",
			place : "f7fiujmdg"
		}],
		genre : [{
			genre : "advertisements",
			authority : "aat"
		}],
		typeOfResource : [{
			typeOfResource : "text"
		}],
		name : [{
			role : "arc",
			authority : "naf",
			name : "1234",
			type : "personal"
		}],
		titleInfo : [{
			nonSort : "1234",
			partNumber : "1234",
			subtitle : "1234",
			title : "1234",
			type : "title"
		}]
	}
}

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
			data.type = "collection"
			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.lengthOf(result, 24)
				collId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling createObject(data, onSuccess, onError) to create a series', function() {
		it('should create a series and return the id of the series', function(done) {

			data.type = "series"
			data.parentId = collId

			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.lengthOf(result, 24)
				seriesId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling createObject(data, onSuccess, onError) to create an item', function() {
		it('should create an Item and return the id of the Item', function(done) {

			data.type = "item"
			data.parentId = seriesId
			dri.createObject(data, function(result) {
				result.should.be.ok
				assert.lengthOf(result, 24)
				itemId = result;
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling updateObject(id, data, onSuccess, onError) to create an item', function() {
		it('should updat an Item and return the id of the Item', function(done) {
			data.properties.titleInfo[0].title = "updated title"
			dri.updateObject(itemId ,data, function(result) {
				result.should.be.ok
				assert.include(result._id, itemId)
				assert.include(result, "updated title")
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
	}), describe('Calling getObject(id, onSuccess, onError) to get an item and convert to Dublin Core', function() {
		it('should get an Item and return the Item in DC', function(done) {
			dri.getObject(itemId, function(result) {
				var dc = dri.convertToDC(result)
				assert.include(dc, itemId)
				done();
			}, function(e) {
				should.not.exist(e);
			});
		})
	}), describe('Calling getObject(id, onSuccess, onError) to get an item and convert to MODS', function() {
		it('should get an Item and return the Item in MODS', function(done) {
			dri.getObject(itemId, function(result) {
				var dc = dri.convertToMODS(result)
				assert.include(dc, itemId)
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
			dri.getChildren(seriesId, 0, 20, function(result) {
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
	}), describe('Calling countObjects(options, onSuccess, onError) with no options', function() {
		it('should return the amount of objects in MongoDB', function(done) {
			dri.countObjects({}, function(amount) {
				assert.isNumber(amount)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling query(field, value, onSuccess, onError) ', function() {
		it('should return an array containing objects that contain the searched field', function(done) {
			dri.query("label", "50c25df5b", function(data) {
				should.exist(data)
				assert.include(data[0], "label");
				assert.include(data[0], "e2f");
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling lastCreated(onSuccess, onError) ', function() {
		it('should return an array containing the last 5 created objects', function(done) {
			dri.lastCreated(function(data) {
				should.exist(data)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling lastEdited(onSuccess, onError) ', function() {
		it('should return an array containing the last 5 edited objects', function(done) {
			dri.lastEdited(function(data) {
				should.exist(data)
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling lastCreatedByType(type, onSuccess, onError) ', function() {
		it('should return an array containing the last 5 created items', function(done) {
			dri.lastCreatedByType("item", function(data) {
				should.exist(data)
				assert.include(data[0], "item");
				done();
			}, function(err) {
				should.not.exist(e);
				done();
			});
		})
	}), describe('Calling lastEditedByType(type, onSuccess, onError) ', function() {
		it('should return an array containing the last 5 edited items', function(done) {
			dri.lastEditedByType("item", function(data) {
				should.exist(data)
				assert.include(data[0], "item");
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
	}), describe('Calling removeObject(id, onSuccess, onError) with a series id', function() {
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
