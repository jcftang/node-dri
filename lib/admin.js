/**
 * @author Quirijn Groot Bluemink
 */
var res;
var helpers = require("./helpers");
var fedora = require("fedora");
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
