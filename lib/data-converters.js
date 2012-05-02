/**
 * @author Quirijn Groot Bluemink
 */
var dc = require('./convert_tables/dc-converter-table');
var mods = require('./convert_tables/mods-converter-table');
var _ = require('underscore');

// Converts the given JSON document to Dublin Core xml
exports.toDC = function(json) {
	var dcString = "";
	var dcStart = '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">';

	//Add opening tag
	dcString += dcStart;

	//Add body
	console.log(json.properties)
	for(var prop in json.properties) {
		if(json.properties.hasOwnProperty(prop)) {
			var tags = dc.getDCTags(prop)
			if(tags != undefined) {
				if(prop == "_id") {
					dcString += tags.start + json._id + tags.end;
				} else {
					//if(eval('json.properties.' + prop)) {
					dcString += tags.start + "eval('json.properties.' + prop)" + tags.end;
					//}
				}
			} else {
				dcString += "<dfdf>" + prop + "</dfdf>"
			}
		}
	}

	//Add closing tag
	var dcEnd = '</oai_dc:dc>';
	dcString += dcEnd;
	return dcString;
}
// Converts the given JSON document to MODS xml
exports.toMODS = function(json) {
	var dcString = "";
	var dcStart = '<mods version="3.4">';

	//Add opening tag
	dcString += dcStart;

	//Add body
	for(var prop in json.properties) {
		if(json.properties.hasOwnProperty(prop)) {
			var tags = mods.getMODSTags(prop)
			if(tags != undefined) {
				if(prop == "_id") {
					dcString += tags.start + json._id + tags.end;
				} else {
					if(eval('json.properties.' + prop)) {
						dcString += tags.start + eval('json.properties.' + prop) + tags.end;
					}
				}
			}
		}
	}
	//Add closing tag
	var dcEnd = '</mods>';
	dcString += dcEnd;
	return dcString;
}
// Checks if the object passed is an array
function isArray(what) {
	console.log(what)
	console.log("Is it an array?")
	return Object.prototype.toString.call(what) === '[object Array]';
}

exports.toDC2 = function(json) {
	var dcString = "";
	var dcStart = '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">';

	//Add opening tag
	dcString += dcStart;
	var properties = json.properties
	//console.log(properties)
	iterate(properties)

	//Add closing tag
	var dcEnd = '</oai_dc:dc>';
	dcString += dcEnd;
	return dcString;
}
function iterate(obj, dcString) {
	_.each(obj, function(val, key, list) {
		if(obj.hasOwnProperty(key)) {
			if( typeof obj[key] == 'object') {
				iterate(obj[key]);
			} else {
				if(obj[key] && obj[key] != undefined && obj[key] != 'undefined') {
					var tags = dc.getDCTags(key)
					if(tags) {
						dcString += tags.start + val + tags.end;
						console.log(tags)
					}
					// console.log(dcString)
					 console.log(key + "   " + obj[key] + " -- " + typeof obj[key]);
				}
			}
		}
	})
}

function actualFunction(key, val) {
	console.log(key + " -- " + val)
}
