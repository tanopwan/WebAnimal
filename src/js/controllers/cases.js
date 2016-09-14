import express from 'express';
import passport from './common/auth.js'

import Case from './caseDBController.js'

var response_template = {code: 200, message: "", action: "", object: {}};

var case_router = express.Router();
case_router.get("/", getCases);
case_router.route("/:id").get(getCase);
case_router.route("/:id/comment").get(getComments);

case_router.use(passport.authenticate('facebook-token'));
case_router.use(function (req, res, next) {
  //console.log('------> Request Type:', req.method);
  next();
});

case_router.post("/", createCase);
case_router.post("/comment", addComment);

var response_template = {code: 200, message: "", action: "", object: {}};

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

function getComments(req, res) {
    console.log("getComments: " + JSON.stringify(req.params) + ", limit: " + req.query.limit);
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    Case.getComments(req.params.id, limit).then(function(result) {
        var response = Object.assign({}, response_template, {code: 0, object: result, action: "getComments"});
        res.send(response);
    }, function(error) {
        var response = Object.assign({}, response_template, {code: 2, object: error, action: "getComments"});
        res.send(response);
    })
}

function createCase(req, res) {
	console.log("cases.js - [POST /api/case/] Request: " + JSON.stringify(req.body));
	var response = Object.assign({}, response_template);
	response.action = "createCase";
	if (!req.body) {
		response.code = 1;
		response.message = "Invalid Parameters, Missing body";
		res.send(response);
        return;
	}
	var userId = req.body.userId;
	var caseName = req.body.caseName;
	var description = req.body.description;
	var animalType = req.body.animalType;
	var animalName = req.body.animalName;
    var imagePath = req.body.imagePath;

	if (!caseName || !userId || !description || !animalType) {
		response.code = 1;
		response.message = "Invalid Parameters, Missing required fields";
		res.send(response);
        return;
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

function addComment(req, res) {
    console.log("cases.js - [POST /api/case/comment] Request: " + JSON.stringify(req.body));
	var response = Object.assign({}, response_template);
	response.action = "addComment";
	if (!req.body) {
		response.code = 1;
		response.message = "Invalid Parameters, Missing body";
		res.send(response);
        return;
	}
	var userId = req.body.userId;
	var caseId = req.body.caseId;
	var comment = req.body.comment;
    var uploadId = req.body.uploadId;

	if (!caseId || !userId || !comment) {
		response.code = 1;
		response.message = "Invalid Parameters, Missing required fields";
		res.send(response);
        return;
	}

	Case.addComment(userId, caseId, comment, uploadId).then( function(result) {
		response.code = 0;
		response.message = "success";
		response.object = result;
		res.send(response);
	}, function(error) {
		response.code = 2;
		response.message = "Error saving a comment";
		response.object = error;
		res.send(response);
	});
}

module.exports = case_router;
