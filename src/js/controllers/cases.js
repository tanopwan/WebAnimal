import express from 'express';
import passport from './auth.js'

import Case from './caseDBController.js'

var response_template = {code: 200, message: "", action: "", object: {}};


var case_router = express.Router();
case_router.get("/", getCases);
case_router.route("/:id").get(getCase);

case_router.use(passport.authenticate('facebook-token'));
case_router.use(function (req, res, next) {
  console.log('------> Request Type:', req.method);
  next();
});

case_router.post("/", createCase);
//case_router.post("/", [upload.single('profilePicture'), addNewCase]);
//case_router.post("/updateCase", [upload.single('profilePicture'), updateCase]);
//case_router.post("/comment", [upload.single('comment_picture'), addComment]);

var response_template = {code: 200, message: "", action: "", object: {}};

function checkUser(req, res) {

}

function getCases(req, res) {
	console.log("cases.js - Request[GET /api/case]: " + JSON.stringify(req.query));
	/*var query = {};
	if (req.query.animal_types) {
		query.animalType = { $in:  req.query.animal_types };
	}
	var query1 = {};
	if (req.query.owner) {
		query1 = {'user' : { $elemMatch: { userId: req.query.owner } }};
	}*/
    Case.getCases(20).then(function(results) {
        var response = Object.assign({}, response_template, {code: 0, object: results, action: "getCases"});
        res.send(response);
    }, function(error) {
        var response = Object.assign({}, response_template, {code: 2, object: error, action: "getCases"});
        res.send(response);
    })
}

function getCase(req, res) {
	console.log("getCase: " + JSON.stringify(req.params));

    Case.getCase(req.params.id).then(function(result) {
        var response = Object.assign({}, response_template, {code: 0, object: result, action: "getCase"});
        res.send(response);
    }, function(error) {
        var response = Object.assign({}, response_template, {code: 2, object: error, action: "getCase"});
        res.send(response);
    })
}

function saveCase(req, res) {
	console.log("saveCase: " + JSON.stringify(req.body));
	response_template.object = "not implemented";
	response_template.action = "saveCase";
	res.send(response_template);
}

function createCase(req, res) {
	console.log("cases.js - [POST /api/case/] Request: " + JSON.stringify(req.body));
	var response = Object.assign({}, response_template);
	response.action = "createCase";
	if (!req.body) {
		response.code = 1;
		response.message = "Invalid Parameters";
		res.send(response);
	}
	var userId = req.body.userId;
	var caseName = req.body.caseName;
	var description = req.body.description;
	var animalType = req.body.animalType;
	var animalName = req.body.animalName;
    var imagePath = req.body.imagePath;

	if (!caseName || !userId || !imagePath || !description || !animalType) {
		response.code = 1;
		response.message = "Invalid Parameters";
		res.send(response);
	}

	Case.createCase(userId, caseName, description, animalType, animalName, imagePath).then( function(result) {
		response.code = 0;
		response.message = "success";
		response.object = result;
		res.send(response);
	}, function(error) {
		response.code = 2;
		response.message = "Error saving a case";
		response.object = error;
		res.send(response);
	});
}

function updateCase(req, res) {
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
	    	/*var _case = new Case(req.body);

		    _case.save(function (err, result) {
			  	if (err) {
			    	var response = Object.assign({}, response_template, {code: 500, object: err, action: "addComment", message: "save case failed"});
					res.send(response);
			  	} else {
			    	var response = Object.assign({}, response_template, {code: 200, object: result, action: "addComment", message: "save case success"});
					res.send(response);
			  	}
			})*/
	    }
	}
}

//const addComment = (req, res) => {
function addComment(req, res) {
	if (req.body) {
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
	    	/*var _case = new Case(req.body);
		    _case.save(function (err, result) {
			  	if (err) {
			    	var response = Object.assign({}, response_template, {code: 500, object: err, action: "addComment", message: "save comment failed"});
					res.send(response);
			  	} else {
			    	var response = Object.assign({}, response_template, {code: 200, object: result, action: "addComment", message: "save comment success"});
					res.send(response);
			  	}
			})*/
	    }
	}
}

module.exports = case_router;
