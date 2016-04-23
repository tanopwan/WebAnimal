import express from 'express';

var user_router = express.Router();
user_router.route("/user/:id?").get(getUser);

function getUser(req, res) {
	console.log(req);
	res.send("getUser");
}

module.exports = user_router;