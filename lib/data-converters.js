/**
 * @author Quirijn Groot Bluemink
 */
var dc = require('./convert_tables/dc-converter-table');
var mods = require('./convert_tables/mods-converter-table');
var _ = require('underscore');

// Converts the given JSON document to Dublin Core xml
exports.toDC = function(json) {
	var json = JSON.parse(JSON.stringify(json))
	
	var dcString = "";
	
	// Dublin Core root tag
	dcString += '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">';;

	// Add the Dublin Core body
	dcString += iterateChildrenDC(json)
	
	// Dublin Core root tag
	dcString += '</oai_dc:dc>';
	
	return dcString;
}
function iterateChildrenDC(json) {
	// console.log("	Check children")
	var str = ""
	_.each(json, function(val, key, list) {
		if(Object.prototype.toString.call(val) == "[object Object]") {
			// console.log("	" + key)
			// console.log("	" + val)
			_.each(val, function(val, key, list) {
				// console.log("		" + key)
				// console.log("		" + val[0])
				for(var i = 0, j = val.length; i < j; i++) {
					str += iterateChildrenDC(val[i])
				};
			})
		} else {
			str += dc.getDCTags(key, val)
		}
	})
	return str
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