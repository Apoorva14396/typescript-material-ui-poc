"use strict";
require('dotenv').config();
require('./config/db.js');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var seedUser = require('./Auth/seed/userSeeder');
var User = require('./Auth/models/userModel');
var authRouter = require('./Auth/authRoute');
var userRouter = require('./App/routes/userRoute');
var app = express();
var port = process.env.PORT || 3004;
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/', authRouter);
app.use('/user', userRouter);
User.find()
    .exec()
    .then(function (users) {
    if (!users.length) {
        seedUser();
    }
    else {
        return true;
    }
})
    .catch(function (err) {
    console.log(err);
});
app.listen(port, function () {
    console.log("server started at " + port);
});
