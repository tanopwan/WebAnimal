import express from 'express';
import mongodb from 'mongodb';

var url = 'mongodb://localhost:27017/webanimal';
var db;
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function(err, database) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to ', url);
		≈ = database;
	}
});

var user_router = express.Router();
user_router.route("/user/:id?").get(getUser).post(saveUser);

function getUser(req, res) {
	res.send("getUser");
}

function saveUser(req, res) {
	console.log("saveUser: " + JSON.stringify(req.body));
	var fbId = req.body.id;
	var username = req.body.name;
	var userObject = {
		fbId: fbId;
		username = username;
	};
	db.collections('user').save(userObject).then(function(data) {
		res.send({action: "saveUser", fbId: fbId, username: username});
	});
	
}

module.exports = user_router;


