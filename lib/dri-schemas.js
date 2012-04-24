/**
 * @author Quirijn Groot Bluemink
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var driProperties = require("./dri-properties");
var enumStatus = ["open", "closed", "approved"]
var enumType = ["item", "series", "collection"]

// dont forget to add new properties to the converter documents so they can be converted to the correct xml tags
var driObjectSchema = new Schema({
	properties : {
		title : String,
		subtitle : String,
		author : String,
		projectId : String
	},
	parentId : String,
	type : {
		type : String,
		enum : enumType
	},
	status : {
		type : String,
		enum : enumStatus
	}
});

mongoose.connect('mongodb://localhost/dri');

var driObject = mongoose.model('driObject', driObjectSchema);

exports.driObject = driObject;

exports.driTypes = enumType;
