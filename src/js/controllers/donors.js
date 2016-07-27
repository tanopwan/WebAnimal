import express from 'express';
//import {Donor} from './database';
import multer from 'multer';
import sharp from 'sharp';
import passport from './auth.js'

var response_template = {code: 200, message: "", action: "", object: {}};

var upload_path = 'public/uploads/temp';
var upload_path_processed = 'uploads/processed';
var upload_path_processed_public = 'public/uploads/processed';
var upload = multer({ dest: upload_path });

var donor_router = express.Router();
donor_router.get("/", getDonors);
donor_router.get("/:id", getDonor);

donor_router.use(passport.authenticate('facebook-token'));

donor_router.post("/", [upload.single('profilePicture'), addDonor]);
donor_router.post("/:id/update", [upload.single('profilePicture'), updateDonor]);
donor_router.post("/:id/comment", [upload.single('comment_picture'), addComment]);

function getDonors(req, res) {
	var response = Object.assign({}, response_template, {object: {}, action: "getDonors"});
	res.send(response);
}

function getDonor(req, res) {
	var response = Object.assign({}, response_template, {object: {}, action: "getDonor"});
	res.send(response);
}

function addDonor(req, res) {
	var response = Object.assign({}, response_template, {object: {}, action: "addDonor"});
	res.send(response);
}

function updateDonor(req, res) {
	var response = Object.assign({}, response_template, {object: {}, action: "updateDonor"});
	res.send(response);
}

function addComment(req, res) {
	var response = Object.assign({}, response_template, {object: {}, action: "addComment"});
	res.send(response);
}

module.exports = donor_router;
