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
			type : String,
			title : String,
			subtitle : String,
			partNumber : String,
			nonSort : String
		},
		name : {
			type : String,
			name : String,
			authority : String,
			role : String
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
			dateCaptured : String,
			dateValid : String,
			copyrightDate : String,
			dateOther : String,
			edition : String,
			issuance : String,
			frequency : String
		},
		language : {
			languageTerm : String
		},
		physicalDescription : {
			type : String,
			extent : String,
			note : String,
			internetMediaType : String,
			digitalOrigin : String
		},
		abstract : {
			abstract : String
		},
		note : {
			type : String,
			note : String
		},
		tableOfContents : {
			type : String,
			text : String
		},
		subject : {
			name : String,
			topic : String,

		},
		relatedItem : {
			type : String,
			title : String
		},
		identifier : {
			type : String,
			identifier : String
		},
		location : {
			physicalLocation : String,
			shelfLocator : String,
			enumerationAndChronology : String,
			url : String
		},
		accessCondition : {
			accessCondition : String
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
