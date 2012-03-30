/**
 * @author mvanwamb
 * @author Quirijn Groot Bluemink
 */

var Mongolian = require("mongolian");
var ObjectId =  require('mongolian').ObjectId   // new ObjectId(byteBuffer or hexString)
var fedora = require("fedora");
var helper = require('./helpers');
var fs = require('fs');
var image;


exports.updateItem = function(req){

	var meta = req.body;
	var files = req.files;

	//console.log(items);
	helper.update(meta,files);
	//gridfs();
}


/*
   Function: loadImg

   Searches for an images and displays it.

   Parameters:

      id - the id of the file
      name - the filenameshutdownServer
      res - the view object (res)

*/
exports.loadImg = function loadImg(id,name,res){
	//setup connection with mongodb
	var server = new Mongolian
	db = server.db("mydb");
	items = db.collection("items")
	//get gridfs object
	var gridfs = db.gridfs()// name defaults to 'fs'
	//search for a file with a certain name and an id
	//new ObjectId coverts the String version of the id into a byte one
	gridfs.findOne({filename:name,_id:new ObjectId(id)}, function(err, file) {
			//sends back the image to the view
			if (!err && file) {
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
                var stream = file.readStream();
                //incase the file couldn't be loaded it logs an error
                stream.on("error", function(err){
                    console.log(err); 
                    
                }).pipe(res);
            }
            //runs if there is an error with finding the file
            else
            {
                res.writeHead(404, {'Content-Type': 'text/plain'});
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
exports.findMediaItem = function findMediaItem(itemId,callback){
	//setting up connection with the server
	items = helper.getDatabaseCollection("series");
	var gridfs = db.gridfs()
	var files = new Array();
	//search for a file with the id that is provided in the request (in url)
	gridfs.find({metadata:{id:itemId}}).forEach(function(file) {
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
		items.db.server.close();
		callback(files);
	});

}


//gets all the files related to an item
exports.getAllMediaItems = function getAllMediaItems(callback){
	//setup a connection
	items = helper.getDatabaseCollection("series");
	
	var gridfs = db.gridfs()// 
	var arr = new Array();
	gridfs.find().forEach(function(file) {
		// do something with a single post
		arr.push(file);
	}, function() {
		items.db.server.close();
		callback(arr);
	})


}
exports.getAllRecordsByType= function getAllRecordsByType(type, callback) {
		helper.getItemsByType(type,function(data){
			callback(data);
		});
}
/*
   Function: getItems

   Searches for all files linked to a metadata object

   Parameters:

      req - request object
      res - result object

   Returns:

      array of the corresponding files.
*/
exports.getItems = function getItems(id,callback){

	items = helper.getDatabaseCollection("series");
			
	items.find({parentId:id}).sort({ objectId: 1 }).toArray(function (err, array) {
	for(item in array){
			array[item]._id = array[item]._id.toString();
		}
		items.db.server.close();
		callback(array);
	})
}


exports.getItem = function(id, onSuccess, onError){

	items = helper.getDatabaseCollection("series");
			
	items.findOne({_id:new ObjectId(id)},function (err, array) {
		if(err){
			onError(err)
		}else{
			array._id = array._id.toString();
			items.db.server.close();
			onSuccess(array)
		}
	})
}


exports.createSeries = function(data, onSuccess, onError){

	var items = helper.getDatabaseCollection("series");
	var rootItem = {}
	
	rootItem.type = "serie"
	rootItem.parentId = data.collection;
	for(var i in data) {
		if(i != "collection"){
			rootItem[i] = data[i];
		}
	}
	items.insert(rootItem, function(err, value) {
		id = value._id.toString();
		if(err) {
			console.log(err);
			items.db.server.close();
			onError(err)
		} else {
			items.db.server.close();
			onSuccess(id);
		}

	});
	


}

exports.createCollection = function(data, onSuccess, onError){

	var items = helper.getDatabaseCollection("series");
	var rootItem = {}
	//console.log(data);
	
	rootItem.type = "collection"
	for(var i in data) {
			rootItem[i] = data[i];
	}
	items.insert(rootItem, function(err, value) {
		id = value._id.toString();
		if(err) {
			console.log(err);
			
			items.db.server.close();
			onError(err);
		} else {
			items.db.server.close();
			onSuccess(id);
		}

	});
	

}
exports.createItem = function(data, onSuccess, onError){
	var item = {};
	var items = helper.getDatabaseCollection("series");
	for(var i in data) {
		if(i != 'amount' && i!= "series") {
			item[i] = data[i];
		}

	}
	item.type = "item";
	
	items.insert(item, function(err, value) {
		//console.log(value);
		id = value._id.toString();
		if(err) {
			console.log(err);
			items.db.server.close();
			onError(err);
		}else{
			items.db.server.close();
			onSuccess(id);
		}
	});
	
}


exports.removeItem = function(id, onSuccess, onError){
	items = helper.getDatabaseCollection("series");
	items.remove({_id:new ObjectId(id)},function(err,value){
		if(err){
			items.db.server.close();
			onError(err);
		}else{
			items.db.server.close();
			items.remove({parentId:new ObjectId(id)},function(err,value){
				if(err){
					items.db.server.close();
					onError(err);
				}else{
					items.db.server.close();
					onSuccess(id);
				}	
			});
		}	
	});
}
exports.approveItem = function approveItem(id, namespace, onSuccess, onError){
	var item = '';
	helper.getItemByID(id, function(array){
		console.log("got item");
		console.log(array);
		item = array;
		if(item.type == "item"){	
			fedora.createFedoraObject(namespace, item.Title, 
				function(response){
					//on success
					console.log("New object PID: " + response);
					onSuccess(response);
				}, 
				function(e){
					//on error
					console.log(e);
					onError(e);
				}
			);
		}else{
			onError("Please approve an item");
		}
	});
}
