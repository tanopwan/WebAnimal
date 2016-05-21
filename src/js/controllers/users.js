import express from 'express';
import {User} from './database';

var user_router = express.Router();

user_router.route("/login").post(userLogin);
user_router.route("/:id?").get(getUser).post(saveUser);

function getUser(req, res) {
	res.send("getUser");
}

var response_template = {code: 200, message: "", action: "", object: {}};

function saveUser(req, res) {
	console.log("saveUser: " + JSON.stringify(req.body));
	var fbId = req.body.fbId;
	var username = req.body.username;

	var userObject = {
		fbId: fbId,
		username: username,
	};
	/*db.collection('user').findOneAndReplace({fbId: fbId} , userObject, function(err, result) {
		var response = JSON.parse(JSON.stringify(response_template));
		response.action = "replace";
		if (err) {
			console.log("('user').save => " + JSON.stringify(err));
			response.code = 500;
			response.object = err;
		}
		else {
			console.log("('user').save => saved " + fbId);
			response.object = {
				fbId: fbId,
				username: username
			}
		}
		res.send(response);
	});*/
	res.send(response_template);
}

function userLogin(req, res) {
	console.log("userLogin: " + JSON.stringify(req.body));
	var fbId = req.body.fbId;
	var username = req.body.username;

	var userObject = {
		fbId: fbId,
		username: username,
	};

	var user = new User({ fbId: fbId, username: username });

	User.findOneAndUpdate({fbId: fbId}, {$setOnInsert: userObject}, {upsert: true, new: true}, function(err, result) {
		var response = JSON.parse(JSON.stringify(response_template));
		response.action = "findOneAndUpdate";
		if (err) {
			console.log("('user').save => error " + JSON.stringify(err));
			response.code = 500;
			response.object = err;
			
		}
		else {
			console.log("('user').save => saved " + JSON.stringify(result));
			response.object = {
				userId: result._id,
				fbId: fbId,
				username: username,
				updatedExisting: result.updatedExisting
			}
		}
		res.send(response);
	});
}

module.exports = user_router;


