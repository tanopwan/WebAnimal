import express from 'express';
import passport from './auth.js'

import User from './userDBController.js'

var user_router = express.Router();

user_router.use(passport.authenticate('facebook-token-login'));

user_router.post("/login", userLogin);
user_router.post("/logout", userLogout);
user_router.post("/login/status", userLoginStatus);
user_router.post("/update", updateUser);
user_router.delete("/:id", deleteUser);
user_router.post("/facebook/login", facebookLogin);
user_router.post("/facebook/create", facebookCreate);

var response_template = {code: 200, message: "", action: "", object: {}};

//conn.end();

function facebookLogin(req, res) {
	console.log("user.js - facebookLogin: " + JSON.stringify(req.body));
	let fbId = req.body.fbId;
	let username = req.body.username;

	if (fbId && username) {
		User.getFbId(fbId)
		.then( resolve => {
			res.status(200).send({ code: 0, message: resolve });
		})
		.catch( reject => {
			res.status(500).send({ code: 1100, message: reject });
		});
	}
	else {
		res.status(400).send({ code: 1001, message: "Invalid parameters" });
	}
}

function facebookCreate(req, res) {
	console.log("user.js - facebookCreate: " + JSON.stringify(req.body));
	let fbId = req.body.fbId;
	let username = req.body.username;

	if (fbId && username) {
		User.createFBRecord(fbId)
		.then( resolve => {
			res.status(200).send({ code: 0, message: resolve });
		})
		.catch( reject => {
			res.status(500).send({ code: 1100, message: reject });
		});
	}
	else {
		res.status(400).send({ code: 1001, message: "Invalid parameters" });
	}
}

function createUser(req, res) {
	console.log("user.js - createUser: " + JSON.stringify(req.body));

	User.createUser().then(resolve => {
		res.status(200).send({ code: 0, message: resolve });
	})
	.catch( reject => {
		res.status(500).send({ code: 1100, message: reject });
	});
}

function deleteUser(req, res) {
	console.log("user.js - deleteUser: " + req.params.id);

	User.deleteFBRecord(req.params.id).then(resolve => {
		return User.deleteUser(req.params.id);
	})
	.then(resolve => {
		res.status(200).send({ code: 0, message: resolve });
	})
	.catch(reject => {
		res.status(500).send({ code: 1100, message: reject });
	});
}

function updateUser(req, res) {
	console.log("user.js - updateUser: " + JSON.stringify(req.body));
	var response = JSON.parse(JSON.stringify(response_template));
	response.action = "updateUser";

	var userId = req.body.userId;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var lineId = req.body.lineId;

	if (!userId) {
		response.code = 1;
		response.message = "Invalid userId";
		res.send(response);
	}
	User.updateUserByUserId(userId, email, mobile, lineId).then(function(result) {
		response.code = 0;
		response.message = "Success";
		response.object = result;
		res.send(response);
	}, function(error) {
		response.code = 2;
		response.message = "Error update user!";
		response.object = error;
		res.send(response);
	});
}

function userLogout(req, res) {
	console.log("user.js - userLogout: " + JSON.stringify(req.body));
	var userId = req.body.userId;

	User.updateUserOnLogout(userId).then( function(resolve) {
		res.send({ code:0, message: "success" });
	}, function(reject) {
		res.status(500).send({ code: 1100, message: "Cannot get userId" });
	});
}

function userLogin(req, res) {
	console.log("user.js - userLogin: " + JSON.stringify(req.body));
	let fbId = req.body.fbId;
 	let username = req.body.username;

	if (fbId && username) {
		new Promise( function(resolve, reject) {
			User.getUserByFbId(fbId).then(resolve, reject);
		})
		.then( function(resolve) {
			if (resolve.length == 0) {
				// Sign up
				return User.createUser();
			}
			return Promise.resolve(resolve);
		})
		.then( resolve => {
			if (resolve.id && !resolve.fbId) {
				return User.createFBUser(resolve.id, fbId, username);
			}
			return User.updateFBUserOnLogin(fbId);
		})
		.then(() => {
			return User.getUserByFbId(fbId);
		})
		.then( resolve => {
			var userId = resolve[0].userId;
			var lastLogin = resolve[0].lastLogin;
			var email = resolve[0].email;
			var mobile = resolve[0].mobile;
			var lineId = resolve[0].lineId;
			var response = { code:0, message: "success", object: {fbId, username, userId, lastLogin, email, mobile, lineId} };
			res.status(200).send(response);
		})
		.catch( function(reject) {
			console.log(reject);
			res.status(500).send({ code: 1100, message: reject });
		})
	}
	else {
		res.status(400).send({ code: 1001, message: "Invalid parameters" });
		return;
	}
}

function userLoginStatus(req, res) {
	console.log("user.js - userLoginStatus: " + JSON.stringify(req.body));
	var fbId = req.body.fbId;
	var username = req.body.username;

	if (fbId && username) {
		User.validateFBUserSession(fbId, username).then( function(resolve) {
			var userId = resolve.userId;
			var lastLogin = resolve.lastLogin;
			var email = resolve.email;
			var mobile = resolve.mobile;
			var lineId = resolve.lineId;
			res.send({ code: 0, message: "success", object: {fbId, username, userId, lastLogin, email, mobile, lineId} });
		}, function(reject) {
			res.send({ code: 1, message: "User is not logged in" });
		});
	}
	else {
		res.status(400).send({ code: 1001, message: "Invalid parameters" });
	}
}

module.exports = user_router;
