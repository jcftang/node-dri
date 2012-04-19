/**
 * @author Quirijn Groot Bluemink
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var driPropertiesSchema = new Schema({
	title : String,
	subtitle : String,
	author : String
});
mongoose.connect('mongodb://localhost/dri');

var driProperties = mongoose.model('driProperties', driPropertiesSchema);

exports.properties = driProperties;
