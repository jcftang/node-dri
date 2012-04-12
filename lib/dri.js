/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */

var Mongolian = require("mongolian");
var ObjectId = require('mongolian').ObjectId// new ObjectId(byteBuffer or hexString)
var fedora = require("fedora");
var helper = require('./helpers');
var fs = require('fs');
var image;
var mongoose = require("mongoose");
var schemas = require("./dri-schemas");
var dri = this;

exports.updateItem = function(body, files, onSuccess, onError) {
	helper.update(body, files, function(data) {
		onSuccess(data);
	}, function(err) {
		onError(err)
	});
}
/*
 Function: globalEdit

 Searches for an images and displays it.

 Parameters:

 data - the set of properties with the value
 files - files that need to be connected with them
 onSuccess - callback function for success
 onError - callback function for error

 Returns:

 0 if successful

 */
exports.globalEdit = function(data, files) {
	var items = helper.getDatabaseCollection("series");
	helper.getSeriesItemsByID(data._id, function(array) {
		for(var item in array) {
			console.log(array[item]);
			for(var i in array[item]) {
				if(i != "_id" && i != "type" && data[i] != undefined) {
					array[item][i] = data[i]
				}
			}
			array[item]._id = array[item]._id.toString();
			helper.update(array[item]);
		}
		items.db.server.close();
	})
}
/*
 Function: loadImg

 Searches for an images and displays it.

 Parameters:

 id - the id of the file
 name - the filenameshutdownServer
 res - the view object (res)

 */
exports.loadImg = function loadImg(id, res) {
	//setup connection with mongodb
	var server = new Mongolian
	db = server.db("mydb");
	items = db.collection("items")
	//get gridfs object
	var gridfs = db.gridfs()// name defaults to 'fs'
	//search for a file with a certain name and an id
	//new ObjectId coverts the String version of the id into a byte one
	gridfs.findOne({
		_id : new ObjectId(id)
	}, function(err, file) {
		//sends back the image to the view
		if(!err && file) {
			res.writeHead(200, {
				'Content-Type' : 'image/jpeg'
			});
			var stream = file.readStream();
			//incase the file couldn't be loaded it logs an error
			stream.on("error", function(err) {
				console.log(err);
			}).pipe(res);
		}
		//runs if there is an error with finding the file
		else {
			res.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			res.write('404 Not Found\n');
			res.end();
		}
	})
}
/*
 Function: findImages

 Searches for all files linked to a metadata object

 Parameters:

 req - request objectshutdownServer
 res - result object

 Returns:

 array of the corresponding files.
 */
exports.findMediaItem = function findMediaItem(itemId, callback) {
	//setting up connection with the server
	var items = helper.getDatabaseCollection("series");
	var gridfs = items.db.gridfs()
	var files = new Array();
	//search for a file with the id that is provided in the request (in url)
	gridfs.find({
		metadata : {
			id : itemId
		}
	}).forEach(function(file) {
		//converting the id from bytes to a string id
		file._id = file._id.toString();
		//create a small object which contains the filename and the id of the file.
		var data = {};
		data._id = file._id;
		data.filename = file.filename;
		data.contentType = file.contentType;
		//add it to the array of files
		files.push(data);
		//executes this function when forEach is ready
	}, function() {
		//send back the files to the client
		//items.db.server.close();
		callback(files);
	});
}
/*
 Function: getAllMediaItems

 Gets all the media items

 */
exports.getAllMediaItems = function getAllMediaItems(callback) {
	var server = new Mongolian
	//get gridfs object

	var db = server.db("mydb");

	var gridfs = db.gridfs()//
	var arr = new Array();
	gridfs.find().forEach(function(file) {
		// do something with a single post
		arr.push(file);
	}, function() {
		callback(arr);
	})
}
/*
 Function: removeMedia

 Removes a media object

 Parameters:

 id - id of the media object
 callback - callback function for success
 callback - callback function for error

 Returns:

 array of the corresponding files.
 */
exports.removeMedia = function removeMedia(id, onSuccess, onError) {
	helper.removeMedia({
		_id : new ObjectId(id)
	}, function(msg) {
		onSuccess(id);
	}, function(err) {
		onError(err);
	})
}
/*
 Function: getAllRecordsByType

 Gets all the records of a certain type

 Parameters:

 type - String name of the type
 callback - callback function

 Returns:

 array of the corresponding files.
 */
exports.getAllRecordsByType = function getAllRecordsByType(type, callback) {
	helper.getItemsByType(type, function(data) {
		callback(data);
	});
}
/*
 Function: updateIdOrder

 Gets all the records of a certain type

 Parameters:

 pid - parentId
 oId - objectId
 inc - incrementation level
 callback - callback function
 Returns:

 Number of items that is modified
 */
exports.updateIdOrder = function(pid, oId, increment, onSuccess) {
	//lower the boejct id with one since it's greater then
	oId = parseInt(oId) - 1
	var items = helper.getDatabaseCollection("series");
	items.update({
		parentId : pid,
		objectId : {
			$gt : oId
		}
	}, {
		$inc : {
			"objectId" : increment
		}
	}, false, true, function(err, doc) {
		if(err) {
			console.log(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: getItems

 Gets all the children of this item

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 array of the corresponding items.
 */
exports.getItems = function getItems(id, callback) {
	var items = helper.getDatabaseCollection("series");

	items.find({
		parentId : id
	}).sort({
		objectId : 1
	}).toArray(function(err, array) {
		for(var item in array) {
			array[item]._id = array[item]._id.toString();
		}
		callback(array);
	})
}
/*
 Function: getItem

 Get the item with the ID

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 data array of the item
 */
exports.getItem = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driItem.findById(id, function(err, doc) {
		if(err) {
			console.log(err)
			onError(err)
		} else {
			//console.log(doc)
			//doc._id = doc._id.toString();
			onSuccess(doc)
		}
	});
}
/*
 Function: getAllItems

 Get the item with the ID

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 data array of the item
 */
exports.getAllItems = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driItem.find({}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	});
}
/*
 Function: getSeries

 Get the series with the ID

 Parameters:

 id - mongo id of the series
 callback - callback function

 Returns:

 data array of the item
 */
exports.getSeries = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driSeries.findById(id, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			doc._id = doc._id.toString();
			onSuccess(doc)
		}
	});
}
/*
 Function: getAllSeries

 Get the item with the ID

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 data array of the item
 */
exports.getAllSeries = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driSeries.find({}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	});
}
/*
 Function: getCollection

 Get the collection with the ID

 Parameters:

 id - mongo id of the collection
 callback - callback function

 Returns:

 data array of the item
 */
exports.getCollection = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driCollection.findById(id, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			doc._id = doc._id.toString();
			onSuccess(doc)
		}
	});
}
/*
 Function: getAllCollections

 Get the item with the ID

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 data array of the item
 */
exports.getAllCollections = function(id, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	schemas.driCollection.find({}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	});
}
/*
 Function: createSeries

 Creates a new series with the given data

 Parameters:

 data - data for the new item
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the newly created series
 */
exports.createSeries = function(data, onSuccess, onError) {
	mongoose.connect('mongodb://localhost/dri');
	//var DRIobject = mongoose.model('DRIobject');

	var newItem = new schemas.driSeries(data);

	newItem.save(function(err, data) {
		if(err) {
			console.log(err)
			onError(err);
		} else {
			//console.log("Success")
			onSuccess(data._id.toString());
		}
	})
}
/*
 Function: createCollection

 Creates a new collection with the given data

 Parameters:

 data - data for the new item
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the newly created collection
 */
exports.createCollection = function(data, onSuccess, onError) {

	mongoose.connect('mongodb://localhost/dri');
	//var DRIobject = mongoose.model('DRIobject');

	var newItem = new schemas.driCollection(data);

	newItem.save(function(err, data) {
		if(err) {
			console.log(err)
			onError(err);
		} else {
			//console.log("Success")
			onSuccess(data._id.toString());
		}
	})
}
/*
 Function: createItem

 Creates a new item with the given data

 Parameters:

 data - data for the new item
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the newly created item
 */
exports.createItem = function(data, onSuccess, onError) {

	mongoose.connect('mongodb://localhost/dri');
	//var DRIobject = mongoose.model('DRIobject');

	var newItem = new schemas.driItem(data);

	newItem.save(function(err, data) {
		if(err) {
			console.log(err)
			onError(err);
		} else {
			//console.log("Success")
			onSuccess(data._id.toString());
		}
	})
}

/*
 Function: removeItem

 Removes an item

 Parameters:

 id - ID of the item to be deleted
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the deleted item
 */
exports.removeItem = function(id, onSuccess, onError) {
	this.getItem(id, function(result) {
		result.remove();
		onSuccess(result._id)
	}, function(e) {
		onError(e);
	});
}
/*
 Function: removeItem

 Removes an item

 Parameters:

 id - ID of the item to be deleted
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the deleted item
 */
exports.removeSeries = function(id, onSuccess, onError) {
	this.getSeries(id, function(result) {
		result.remove();
		onSuccess(result._id)
	}, function(e) {
		onError(e);
	});

}
/*
 Function: removeItem

 Removes an item

 Parameters:

 id - ID of the item to be deleted
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the deleted item
 */
exports.removeCollection = function(id, onSuccess, onError) {

	this.getCollection(id, function(result) {
		result.remove();
		onSuccess(result._id)
	}, function(e) {
		onError(e);
	});
}
/*
 Function: approveItem

 Approves an item. Retrieves the item from MongoDB and ingests it
 into the Fedora repository

 Parameters:

 id - ID of the item to be approved
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the deleted item
 */
exports.approveItem = function approveItem(id, namespace, onSuccess, onError) {
	var item = '';
	this.getItem(id, function(data) {
		fedora.createFedoraObject(namespace, item.Title, function(response) {
			onSuccess(response);
		}, function(e) {
			console.log(e);
			onError(e);
		});
	}, function(err) {

	});
}