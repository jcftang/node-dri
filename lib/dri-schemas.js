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
			titleInfo : {
				title : String,
				subtitle : String,
				partNumer : String,
				nonSort : String
			},
			name : {
				namePart : String,
				displayForm : String,
				affiliation : String,
				role : String,
				description : String
			},
			typeOfResource : {
				typeOfResource : String
			},
			genre : {
				genre : String
			},
			originInfo : {
				place : String,
				publisher : String,
				dateIssued : String,
				dateCreated : String,
				dateCaptured : String,
				dateValid : String,
				dateModified : String,
				copyrightDate : String,
				dateOther : String,
				edition : String,
				issuance : String,
				frequency : String
			},
			physicalDescription : {
				extent : String,
				note : String,
				internetMediaType : String,
				digitalOrigin : String
			},
			abstract : {
				abstract : String
			},
			note : {
				note : String
			},
			subject : {
				topic : String,
				geographic : String,
				temporal : String,
				titleInfo : String,
				name : String,
				/*genre: String,*/
				hierarchicalGeographic : String,
				cartographics : String,
				geographicCode : String,
				occupation : String,
			},
			identifier : {
				identifier : String
			}
		},
		parentId : String,
		fedoraId : String,
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
