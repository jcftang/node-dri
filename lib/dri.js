/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */
var fedora = require("fedora")
var mongoose = require("mongoose")
var schemas = require("./dri-schemas")
var converter = require("./data-converters");

var util = require('util')
//var fs = require('fs')
var mime = require("mime")
var fs = require("node-fs");
var dri = this

// Configuration info recieved from the configuration module
var config

function connectToMongoose() {
	mongoose.connect('mongodb://localhost/dri')
}

exports.configure = function configure(config){
	this.config = config
	fedora.configure(config)
	console.log("DRI package configured")
	console.log(this.config)
}
/*
 Function: getChildren

 Gets all the children of this object

 Parameters:

 id - mongo id of the object
 callback - callback function

 Returns:

 array of the corresponding objects.
 */
exports.getChildren = function getChildren(id, onSuccess, onError) {
	schemas.driObject.find({
		parentId : id
	}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: getObject

 Get the object with the ID

 Parameters:

 id - mongo id of the object
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 data array of the object
 */
exports.getObject = function(id, onSuccess, onError) {
	schemas.driObject.findById(id, function(err, doc) {
		if(err) {
			console.log(err)
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: getAllItems

 Gets all the objects of type "item"

 Parameters:

 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 data array of objects of type "item"
 */
exports.getAllItems = function(onSuccess, onError) {
	schemas.driObject.find({
		type : "item"
	}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: getAllSeries

 Gets all the objects of type "series"

 Parameters:

 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 data array of objects of type "series"
 */
exports.getAllSeries = function(onSuccess, onError) {
	schemas.driObject.find({
		type : "series"
	}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: getAllCollections

 Gets all the objects of type "collection"

 Parameters:

 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 data array of objects of type "collection"
 */
exports.getAllCollections = function(onSuccess, onError) {
	schemas.driObject.find({
		type : "collection"
	}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}
/*
 Function: createObject

 Creates a new object with the given data

 Parameters:

 data - data for the new object
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 ID of the newly created object
 */
exports.createObject = function(data, onSuccess, onError) {
	var newItem = new schemas.driObject(data)

	newItem.save(function(err, data) {
		if(err) {
			console.log(err)
			onError(err)
		} else {
			//console.log("Success")
			onSuccess(data._id.toString())
		}
	})
}
/*
 Function: updateObject

 Updates an object

 Parameters:

 id - ID of the object to be update
 body - the new set of data for the object
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 Number of affected objects
 */
exports.updateObject = function(id, body, onSuccess, onError) {
	var conditions = {
		_id : id
	}, update = body, options = {
		multi : false
	}

	schemas.driObject.update(conditions, update, options, function(err, numAffected) {
		if(err) {
			onError(err)
		} else {
			onSuccess(numAffected)
		}
	})
}
/*
 Function: removeObject

 Removes an object

 Parameters:

 id - ID of the object to be deleted
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 ID of the deleted object
 */
exports.removeObject = function(id, onSuccess, onError) {
	this.getObject(id, function(result) {
		result.remove()
		onSuccess(result._id)
	}, function(e) {
		onError(e)
	})
}
/*
 Function: getObjectTypes

 Returns all the different types an object can be

 Parameters:

 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 An array containing the types
 */
exports.getObjectTypes = function getObjectTypes(onSuccess, onError) {
	if(schemas.driTypes) {
		onSuccess(schemas.driTypes)
	} else {
		onError("No data")
	}
}
/*
 Function: approveItem

 Approves an item. Retrieves the item from MongoDB and ingests it
 into the Fedora repository

 Parameters:

 id - ID of the item to be approved
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 pID of the approved item
 */
exports.approveItem = function approveItem(id, namespace, onSuccess, onError) {
	var item = ''
	this.getObject(id, function(data) {
		fedora.createFedoraObject(namespace, data.properties.title, function(response) {
			var pid = response;
			var dc = dri.convertToDC(data)
			fedora.addDatastream(pid, "DC", dc, function(result) {
				onSuccess(pid)
				//console.log(pid)
			}, function(e) {
				console.log(e)
				onError(e)
			})
		}, function(e) {
			console.log(e)
			onError(e)
		})
	}, function(err) {
		onError(err)
	})
}
/*
 Function: convertToDC

 Converts the JSON to Dublin Core

 Parameters:

 json - The JSON to be converted to DC

 Returns:

 A string of Dublin Core
 */
exports.convertToDC = function converToDC(json) {
	return converter.toDC(json)
}
/*
 Function: convertToMODS

 Converts the JSON to MODS

 Parameters:

 json - The JSON to be converted to MODS

 Returns:

 A string of MODS
 */
exports.convertToMODS = function converToMODS(json) {
	return converter.toMODS(json)
}
function createDirectory(path, uploadDirectory, onSuccess, onError) {
	fs.mkdir(uploadDirectory + path, 0777, true, function(err) {
		if(err) {
			console.log(err);
			onError(err)
		} else {
			onSuccess(1)
		}
	});
}

exports.uploadFile = function uploadFile(files, onSuccess, onError) {
	console.log(this.config.uploadDirectory)
	var dri = this
	if(files.upload.size != 0) {
		createDirectory('', dri.config.uploadDirectory, function() {
			var is = fs.createReadStream(files.upload.path)
			var os = fs.createWriteStream(dri.config.uploadDirectory + files.upload.name);

			util.pump(is, os, function() {
				fs.unlink(files.upload.path, function(err) {
					if(err) {
						onError(err)
					}
					onSuccess(dri.config.uploadDirectory + files.upload.name);
				});
			});
		}, function(err) {
			onError(err)
		})
	} else {
		onError("No files")
	}
}
