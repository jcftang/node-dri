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
	'_id' : 'dc:identifier',
	'author' : 'dc:creator'
}
exports.getDCTags = function(id) {
	var tags = {};
	var tag = dc_map[id];
	if(tag) {
		tags.start = '<' + dc_map[id] + '>'
		tags.end = '</' + dc_map[id] + '>'
		return tags;
	}else{
		return undefined;
	}
}