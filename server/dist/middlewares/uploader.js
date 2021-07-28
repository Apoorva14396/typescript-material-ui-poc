"use strict";
var crypto = require('crypto');
var multer = require('multer');
var storage = multer.memoryStorage({});
var upload = multer({ storage: storage });
module.exports = upload;
