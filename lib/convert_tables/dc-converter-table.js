/**
 * @author Quirijn Groot Bluemink
 */

// Dublin Core Tags
// ================
// Title
// Creator
// Subject
// Description
// Publisher
// Contributor
// Date
// Type
// Format
// Identifier
// Source
// Language
// Relation
// Coverage
// Rights

//Add the key value here and make sure the key is also in the schema in the dri package (dri-schemas.js)
var dc_map = {
	//  json_value:xml_value
	'title' : 'dc:title',
	'subtitle' : 'dc:title',
	'type' : 'dc:type',
	'_id' : 'dc:identifier',
	'fedoraId' : 'dc:identifier',
	'author' : 'dc:creator',
	'namePart' : 'dc:partofName'
}
exports.getDCTags = function(key, value) {
	// console.log(key + " === "+ value)
	var tags = "";
	var tag = dc_map[key];
	// console.log("Tag++++" + tag)
	if(tag) {
		//console.log("Tag++++" + tag + "   " + value)
		if(value == "undefined" || value == undefined) {
			tags += ''
		} else {
			tags += '<' + tag + '>'
			tags += value
			tags += '</' + tag + '>'
		}
		return tags;
	} else {
		return "";
	}
}