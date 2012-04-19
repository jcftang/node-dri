/**
 * @author Quirijn Groot Bluemink
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var driProperties = require("./dri-properties");
var enumStatus = ["open", "closed", "approved"]
var enumType = ["item", "series", "collection"]

// dont forget to add new properties to the converter documents so they can be converted to the correct xml tags
var driObjectSchema= new Schema({
	properties : [driProperties.properties],
	parentId : String,
	type : {type:String, enum:enumType},
	status:{type:String, enum:enumStatus}
});
var driCollectionSchema= new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus}
});
var driSeriesSchema= new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus},
	parentId: String
});
var driItemSchema = new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus},
	parentId: String
});

mongoose.connect('mongodb://localhost/dri');

var driObject = mongoose.model('driObject', driObjectSchema);

var driCollection = mongoose.model('driCollection', driCollectionSchema);
var driSeries = mongoose.model('driSeries', driSeriesSchema);
var driItem = mongoose.model('driItem', driItemSchema);

exports.driObject = driObject;
exports.driCollection = driCollection;
exports.driSeries = driSeries;
exports.driItem = driItem;

exports.driTypes = enumType;
