"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserModel = require('../models/userModel');
/* Please enter email password provided by client */
var admin = {
    email: 'admin@admin.com',
    password: 'admin@1234',
    role: 'admin'
};
function seeder() {
    bcrypt.hash(admin.password, 10, function (err, hash) {
        if (err) {
            return false;
        }
        var user = new UserModel({
            _id: mongoose.Types.ObjectId(),
            email: admin.email,
            password: hash,
            role: admin.role
        });
        user.save().then(function (result) {
            return true;
        });
    });
}
module.exports = seeder;
