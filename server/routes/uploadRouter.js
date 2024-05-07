const express = require('express');
const {configureMulter} = require("../services/fileUploadService");
const {uploadFile} = require("../controllers/uploadController");
const {createUploadDirectory} = require("../services/fileUploadService");
const uploadRouter = express.Router();

createUploadDirectory();

uploadRouter.post('/',configureMulter().single('image'), uploadFile);

module.exports = uploadRouter;