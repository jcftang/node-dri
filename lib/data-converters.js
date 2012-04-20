/**
 * @author Quirijn Groot Bluemink
 */
var dc = require('./convert_tables/dc-converter-table');
var mods = require('./convert_tables/mods-converter-table');
exports.toDC = function(json) {
	var dcString = "";
	var dcStart = '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">';

	//Add opening tag
	dcString += dcStart;

	//Add body
	for(var prop in json.properties) {
		if(json.properties.hasOwnProperty(prop)) {
			var tags = dc.getDCTags(prop)
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
	var dcEnd = '</oai_dc:dc>';
	dcString += dcEnd;
	return dcString;
}
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
function isArray(what) {
	return Object.prototype.toString.call(what) === '[object Array]';
}