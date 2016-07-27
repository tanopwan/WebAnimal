import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import passport from './auth.js'

import Upload from './uploadDBController.js'

var response_template = {code: 200, message: "", action: "", object: {}};

var upload_path = 'public/uploads/temp';
var upload_path_processed = 'uploads/processed';
var upload_path_processed_public = 'public/uploads/processed';
var upload = multer({ dest: upload_path });

var upload_router = express.Router();

upload_router.use(passport.authenticate('facebook-token'));

upload_router.post("/", [upload.single('upload-file'), createUpload]);

function createUpload(req, res) {
	console.log("uploads.js - [POST /api/upload/] Request: " + JSON.stringify(req.body));
	var response = Object.assign({}, response_template);
	response.action = "upload";

	if (!req.file) {
		response.code = 1;
		response.message = "Invalid Parameters";
		res.send(response);
	}

	var actualImagePath = upload_path_processed_public + "/" + req.file.filename + ".webp";
	var image = sharp(req.file.path);
	image.resize(300)
	.toFormat(sharp.format.webp)
	.toFile(actualImagePath, function(err) {
		if (err) {
			response.code = 3;
			response.message = "Upload Image Failed";
			res.send(response);
		}
	});

	var imagePath = upload_path_processed + "/" + req.file.filename + ".webp"
	var userId = req.body.userId;
	if (userId && imagePath) {
		Upload.create(userId, imagePath).then(function(result) {
			response.code = 0;
			response.message = "success";
			response.object = {userId, imagePath};
			res.send(response);
		}, function(error) {
			response.code = 2;
			response.message = "Error saving an upload file";
			response.object = error;
			res.send(response);
		});
	}
	else {
		response.code = 1;
		response.message = "Invalid Parameters";
		res.send(response);
	}
}

module.exports = upload_router;
