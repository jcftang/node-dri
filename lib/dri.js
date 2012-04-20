/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */
var fedora = require("fedora")
var image
var mongoose = require("mongoose")
var schemas = require("./dri-schemas")
var dri = this

function connectToMongoose(){
	mongoose.connect('mongodb://localhost/dri')
}
/*
 Function: getChildren

 Gets all the children of this item

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 array of the corresponding items.
 */
exports.getChildren = function getChildren(id, onSuccess, onError){
	schemas.driObject.find({parentId:id}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
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

 Get the item with the ID

 Parameters:

 id - mongo id of the item
 callback - callback function

 Returns:

 data array of the item
 */
exports.getAllItems = function(id, onSuccess, onError) {
	schemas.driObject.find({type:"item"}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
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
	schemas.driObject.find({type:"series"}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
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
	schemas.driObject.find({type:"collection"}, function(err, doc) {
		if(err) {
			onError(err)
		} else {
			onSuccess(doc)
		}
	})
}

/*
 Function: createObject

 Creates a new item with the given data

 Parameters:

 data - data for the new item
 onSuccess - callback function when successfull
 onError - callback function when error occurse

 Returns:

 ID of the newly created item
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

 Updates an item

 Parameters:

 id - ID of the item to be update
 body - the new set of data for the object
 onSuccess - callback function when successfull
 onError - callback function when error occurs

 Returns:

 Number of affected items
 */
exports.updateObject = function(id, body, onSuccess, onError) {
	var conditions = {
		_id : id
	}, update = body, options = {
		multi : false
	}

	schemas.driObject.update(conditions, update, options,
		function(err, numAffected) {
			if(err){
				onError(err)
			}else{
				onSuccess(numAffected)
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
exports.removeObject = function(id, onSuccess, onError) {
	this.getObject(id, function(result) {
		result.remove()
		onSuccess(result._id)
	}, function(e) {
		onError(e)
	})
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
exports.getObjectTypes = function getObjectTypes(onSuccess, onError) {
	if(schemas.driTypes){
		onSuccess(schemas.driTypes)
	}else{
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
 onError - callback function when error occurse

 Returns:

 ID of the deleted item
 */
exports.approveItem = function approveItem(id, namespace, onSuccess, onError) {
	var item = ''
	this.getObject(id, function(data) {
		fedora.createFedoraObject(namespace, data.properties.title, function(response) {
			onSuccess(response)
		}, function(e) {
			console.log(e)
			onError(e)
		})
	}, function(err) {
		onError(err)
	})
}
