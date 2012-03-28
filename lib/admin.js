/**
 * @author Quirijn Groot Bluemink
 */
var res;
var helpers = require("./helpers");
var fedora = require("fedora");



exports.getSeries = function getSeries(req,res){
	

	helpers.getItemsByType("serie",function(array){	
		res.render('admin', 
			{title : "Admin series"
			, id:"getSeries"
			, series:array
			, layout:"_layouts/layoutAdmin"}
		)
	});
}

exports.getItems = function getItems(req,res){
	id = req.params.id;
	helpers.getSeriesItemsByID(id, function(array){
		console.log(array);
		res.render('_includes/adminItems', 
			{title: "Admin series"
			, id: "getSeries"
			, series: array
			, layout: "_layouts/layoutAdmin"}
		)
	});
}
exports.approveItem = function approveItem(req,res){
	var item = ''
	id = req.params.id;
	helpers.getItemByID(id, function(array){
		item = array;
		if(item.type == "item"){	
			fedora.createFedoraObject("cfedoraLib", item.Title, 
				function(response){
					//on success
					console.log("New object PID: " + response);
					res.send(response);
				}, 
				function(e){
					//on error
					console.log(e);
				}
			);
		}else{
			res.send("Approve an item");
		}
	});
}
