"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var jwt = require('jsonwebtoken');
var verifyToken = function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        var token = req.headers.authorization;
        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        var payload = jwt.verify(token, process.env.JWT_SECRET, function (err, response) {
            if (err) {
                return res.status(401).send('Unauthorized request');
            }
            // req.email = res.user;
            next();
        });
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = verifyToken;
