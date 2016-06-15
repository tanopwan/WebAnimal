import express from 'express';
import {Case} from './database';
import multer from 'multer';
import sharp from 'sharp';
import passport from './auth.js'

var response_template = {code: 200, message: "", action: "", object: {}};

var upload_path = 'public/uploads/temp';
var upload_path_processed = 'uploads/processed';
var upload_path_processed_public = 'public/uploads/processed';
var upload = multer({ dest: upload_path });

var case_router = express.Router();
case_router.get("/", getCases);
case_router.route("/:id").get(getCase);

case_router.use(passport.authenticate('facebook-token'));

case_router.post("/addNewCase", [upload.single('profilePicture'), addNewCase]);
case_router.post("/updateCase", [upload.single('profilePicture'), updateCase]);
case_router.post("/comment", [upload.single('comment_picture'), addComment]);

function getCases(req, res) {
	console.log("cases.js - Request[GET /api/case]: " + JSON.stringify(req.query));
	var query = {};
	if (req.query.animal_types) {
		query.animalType = { $in:  req.query.animal_types };
	}
	var query1 = {};
	if (req.query.owner) {
		query1 = {'user' : { $elemMatch: { userId: req.query.owner } }};
	}
	Case.find(query, query1)
  	.limit(20)
  	.populate('user')
  	.sort({ caseDate: -1 })
  	.exec(function(err, results) {
  		var response = Object.assign({}, response_template, {object: results, action: "getCases"});
  		console.log("cases.js - Response[GET /api/case]: " + JSON.stringify(response));
		res.send(response);
	});
}

function getCase(req, res) {
	console.log("getCase: " + JSON.stringify(req.params));
	Case.findById(req.params.id)
  	.populate('user')
  	.exec(function(err, results) {
		var response = Object.assign({}, response_template, {object: results, action: "getCase"});
		res.send(response);
	});
}

function saveCase(req, res) {
	console.log("saveCase: " + JSON.stringify(req.body));
	response_template.object = "not implemented";
	response_template.action = "saveCase";
	res.send(response_template);
}

function addNewCase(req, res) {
	console.log("cases.js - [POST /api/addNewCase/] Request: " + JSON.stringify(req.body));
	if (req.body) {
		req.body.user = req.body.userId;
		if (req.file) {
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
			    	var response = Object.assign({}, response_template, {code: 500, object: err, action: "addNewCase", message: "save case failed"});
					res.send(response);
			  	} else {
			    	var response = Object.assign({}, response_template, {code: 500, object: result, action: "addNewCase", message: "save case success"});
			    	res.send(response);
			  	}
			  	
			})
	    }
	}
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
	    	var _case = new Case(req.body);

		    _case.save(function (err, result) {
			  	if (err) {
			    	var response = Object.assign({}, response_template, {code: 500, object: err, action: "addComment", message: "save case failed"});
					res.send(response);
			  	} else {
			    	var response = Object.assign({}, response_template, {code: 200, object: result, action: "addComment", message: "save case success"});
					res.send(response);
			  	}
			})
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
	    	var _case = new Case(req.body);
		    _case.save(function (err, result) {
			  	if (err) {
			    	var response = Object.assign({}, response_template, {code: 500, object: err, action: "addComment", message: "save comment failed"});
					res.send(response);
			  	} else {
			    	var response = Object.assign({}, response_template, {code: 200, object: result, action: "addComment", message: "save comment success"});
					res.send(response);
			  	}
			})
	    }
	}
}
module.exports = case_router;


