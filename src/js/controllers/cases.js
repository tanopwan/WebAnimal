import express from 'express';
import {Case} from './database';
import multer from 'multer';
import sharp from 'sharp';

var response_template = {code: 200, message: "", action: "", object: {}};

var upload_path = 'public/uploads/temp';
var upload_path_processed = 'uploads/processed';
var upload_path_processed_public = 'public/uploads/processed';
var upload = multer({ dest: upload_path });

var case_router = express.Router();
case_router.route("/").get(getCases).post(saveCase);
case_router.route("/:id").get(getCase);

case_router.post("/addNewCase", [upload.single('profile_picture'), function (req, res) {
	response_template.action = "addNewCase";
	if (req.body) {
		req.body.user = req.body.userId;
		if (req.file) {
	    	console.log(req.file);
	    	var imagePath = upload_path_processed_public + "/" + req.file.filename + ".webp";
		    var image = sharp(req.file.path);
		    image
		    	.resize(300)
		    	.toFormat(sharp.format.webp)
		    	.toFile(imagePath, function(err) {
			        if (err) {
			        	throw err;
			        }
				});

		    req.body.imagePath = upload_path_processed + "/" + req.file.filename + ".webp"
	    }
	    
	    if (req.body.caseName) {
	    	var _case = new Case(req.body);
		    _case.save(function (err, result) {
			  	if (err) {
			    	response_template.code = 500;
			    	response_template.message = "save case failed";
			    	response_template.object = err;
			  	} else {
			  		response_template.message = "save case success";
			    	response_template.object = result;
			  	}
			  	res.send(response_template);
			})
	    }
	}

    

	/*image.metadata()
		.then(function(metadata) {
			console.log(metadata);
	    	return image
	      		.resize(Math.round(metadata.width / 2))
	      		.webp()
	  			.toFile(upload_path_processed + "/" + req.file.filename, function(err) {
	        		if (err) {
			        	throw err;
			        }
			    });
	    });*/
}]);

function getCases(req, res) {
	console.log("getCases: " + JSON.stringify(req.query));
	var query = {};
	if (req.query.animal_types) {
		query.animalType = { $in:  req.query.animal_types };
	}
	Case.find(query)
  	.limit(20)
  	.populate('user')
  	.sort({ caseDate: -1 })
  	.exec(function(err, results) {
		response_template.object = results;
		response_template.action = "getCases";
		res.send(response_template);
	});
}

function getCase(req, res) {
	console.log("getCase: " + JSON.stringify(req.params));
	Case.findById(req.params.id)
  	.populate('user')
  	.exec(function(err, results) {
		response_template.object = results;
		response_template.action = "getCase";
		res.send(response_template);
	});
}

function saveCase(req, res) {
	console.log("saveCase: " + JSON.stringify(req.body));
	response_template.object = "not implemented";
	response_template.action = "saveCase";
	res.send(response_template);
}

module.exports = case_router;


