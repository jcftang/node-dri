/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */
var res;
var meta;
var Mongolian = require("mongolian");
var ObjectId =  require('mongolian').ObjectId   // new ObjectId(byteBuffer or hexString)
var fs = require('fs');
var image;


/*
   Function: Save

   Saves the metadata object

   Parameters:

      data - the metadata object
      files - the files that are uploaded
*/
exports.update = function save(data,files){
	items =  getDatabaseCollection("series")
	//convert String id to bytes
	data._id = new ObjectId(data._id);
	//remove the surcheck value (checks if there is an image)
	var image = false;
	if(data["surcheck"]){
		image = true;
	}
    delete data["surcheck"]
    //saves the metadata in the items collection
	items.save(data, function(err, value) {
		if(image) {
			//if there is an image it needs to be stored
			gridfs(value._id.toString(), files)
		}
	});
}

exports.removeMedia = function removeMedia(query,onSuccess,onError) {
	items = getDatabaseCollection("series");
	//get gridfs object

	var gridfs = db.gridfs()// name defaults to 'fs'
	//search for a file with a certain name and an id
	//new ObjectId coverts the String version of the id into a byte one
	gridfs.files.remove(query, function(err, file) {
		if(err) {
			onError(err);
		} else {

			onSuccess(id);
		}
	});
}


/*
   Function: gridfs

   Stores the file into mongodb gridfs

   Parameters:

      id - id of the metadata object
      file - file that needs to be stored
*/
function gridfs(infoId,files) {
		// Create a server instance with default host and port
	var server = new Mongolian
	// Get database
	db = server.db("mydb");

	var gridfs = db.gridfs()// name defaults to 'fs'

	// Create new file write stream
	var stream = gridfs.create({
		filename : files.media.name,
		metadata : {id:infoId},
		contentType : files.media.type,
		
		
	}).writeStream()

	// Pipe file to gridfile
	fs.createReadStream(files.media.path).pipe(stream)

	//findId(infoId,files.media.name)
}


/*
   Function: getSeries

   Callbackfunction that returns all items of a certain type

   Parameters:

      callback - function to callback
      res - result object
*/
exports.getItemsByType = function getSeries(type,callback){
	items = getDatabaseCollection("series")
	items.find({type:type}).sort({ created: 1 }).toArray(function (err, array) {
		for(item in array){
			array[item]._id = array[item]._id.toString();
		}
		items.db.server.close();
		callback(array)
	});
}

/*
	Function: getSeriesItemsByID

	Callback: Returns an array containing all the items that correspond to the series

	Parameters:

		id - ID of the series
		callback - function to callback
*/
exports.getSeriesItemsByID = function getSeriesItemsByID(id, callback){
	series = getDatabaseCollection("series")

	series.find({parentId:id}).sort({ objectId: 1 }).toArray(function (err, array) {
	for(item in array){
			array[item]._id = array[item]._id.toString();
		}
		
		series.db.server.close();
		callback(array);
	})
}

/*
	Function: getItemByID

	Callback: Returns an item according to the ID

	Parameters:

		id - ID of the item
		callback - function to callback
*/
exports.getItemByID = function getItemByID(id, callback){
	series = getDatabaseCollection("series")

	series.findOne({_id:new ObjectId(id)},function (err, array) {
		array._id = array._id.toString();
		
		series.db.server.close();
		callback(array);
	})
}

function getDatabaseCollection(collectionName){
	var server = new Mongolian;	
	// Get database
	db = server.db("mydb");	
	// Get collections
	return db.collection(collectionName);
}
exports.getDatabaseCollection = function(data){return getDatabaseCollection(data)};
