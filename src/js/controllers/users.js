import express from 'express';
import {User} from './database';
import passport from './auth.js'

var user_router = express.Router();

user_router.get("/:fbId?", getUser);

user_router.use(passport.authenticate('facebook-token'));

user_router.post("/login", userLogin);
user_router.post("/update", updateUser);


function getUser(req, res) {
	res.send("getUser");
}

var response_template = {code: 200, message: "", action: "", object: {}};

function updateUser(req, res) {
	console.log("updateUser: " + JSON.stringify(req.body));
	var fbId = req.body.fbId;
	var username = req.body.username;

	var updateData = {
		email,
		mobile,
		line,
		address
	};
	
	User.findOneAndUpdate({fbId}, updateData, null, (err, result) => {
		console.log("updateUser");
		console.log(err);
		console.log(result);
	});
	var response = JSON.parse(JSON.stringify(response_template));
	response.action = "updateUser";
	res.send(response);
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

	//The upsert = true option creates the object if it doesn't exist. defaults to false.
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


