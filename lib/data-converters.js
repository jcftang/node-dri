/**
 * @author Quirijn Groot Bluemink
 */
var mods = require('./convert_tables/mods-converter-table');
var _ = require('underscore');


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


exports.toDC = function(json) {
	var json = JSON.parse(JSON.stringify(json))
	var properties = json.properties
	var dcString = "";

	// Dublin Core root tag
	dcString += '<oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">'

	// Add the Dublin Core body
	// Add mongoID
	dcString += '<dc:identifier>' + json._id + '</dc:identifier>'

	if(properties) {
		// title info
		_.each(properties.titleInfo, function(val, key, list) {
			var infoTag = "<dc:title>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:title>"
			dcString += infoTag
		})
		// name info
		_.each(properties.name, function(val, key, list) {
			var infoTag = "<dc:creator>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:creator>"
			dcString += infoTag
		})
		// typeOfResource info
		_.each(properties.typeOfResource, function(val, key, list) {
			var infoTag = "<dc:type>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:type>"
			dcString += infoTag
		})
		// genre info
		_.each(properties.genre, function(val, key, list) {
			var infoTag = "<dc:type>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:type>"
			dcString += infoTag
		})
		// origin info
		_.each(properties.originInfo, function(val, key, list) {
			var infoTag = ""
			_.each(val, function(val, key, list) {
				console.log(val)
				if(key == "publisher") {
					infoTag += "<dc:publisher>" + val + "</dc:publisher>"
				} else if(key.indexOf("date") != -1) {
					infoTag += "<dc:date>" + val + "</dc:date>"
				} else if(key.indexOf("date") != -1 && val.toString == '[object Object]') {
					infoTag += "<dc:date>"
					_.each(val, function(val, key, list) {
						infoTag += val + ", "
					})
					infoTag += "</dc:date>"
				}
			})
			dcString += infoTag
		})
		// physicalDescription info
		_.each(properties.physicalDescription, function(val, key, list) {
			var infoTag = "<dc:format>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:format>"
			dcString += infoTag
		})
		// note info
		_.each(properties.note, function(val, key, list) {
			var infoTag = "<dc:description>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:description>"
			dcString += infoTag
		})
		// subject info
		_.each(properties.subject, function(val, key, list) {
			var infoTag = "<dc:subject>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:subject>"
			dcString += infoTag
		})
		// identifier info
		_.each(properties.identifier, function(val, key, list) {
			var infoTag = "<dc:identifier>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:identifier>"
			dcString += infoTag
		})
		// location info
		_.each(properties.location, function(val, key, list) {
			var infoTag = "<dc:identifier>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:identifier>"
			dcString += infoTag
		})
		// accessCondition info
		_.each(properties.accessCondition, function(val, key, list) {
			var infoTag = "<dc:rights>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:rights>"
			dcString += infoTag
		})
		// relatedItem info
		_.each(properties.relatedItem, function(val, key, list) {
			var infoTag = "<dc:relation>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:relation>"
			dcString += infoTag
		})
		// tableOfContents info
		_.each(properties.tableOfContents, function(val, key, list) {
			var infoTag = "<dc:description>"
			_.each(val, function(val, key, list) {
				infoTag += val + ", "
			})
			infoTag += "</dc:description>"
			dcString += infoTag
		})
	}
	// Dublin Core root tag
	dcString += '</oai_dc:dc>';

	return dcString;
}

