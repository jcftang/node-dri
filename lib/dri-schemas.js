/**
 * @author Quirijn Groot Bluemink
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var enumStatus = ["Open", "Closed", "Approved"]

var DRIobject= new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	type : String
});
var driCollection= new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus}
});
var driSeries= new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus},
	parentId: String
});
var driItem = new Schema({
	properties : {
		title:String,
		subtitle:String
	},
	status:{type:String, enum:enumStatus},
	parentId: String
});

mongoose.connect('mongodb://localhost/dri');

var DRIobjects = mongoose.model('DRIobject', DRIobject);

var driCollection = mongoose.model('driCollection', driCollection);
var driSeries = mongoose.model('driSeries', driSeries);
var driItem = mongoose.model('driItem', driItem);

exports.DRIobjects = DRIobjects;
exports.driCollection = driCollection;
exports.driSeries = driSeries;
exports.driItem = driItem;