"use strict";
var mongoose2 = require('mongoose');
mongoose2.connect('mongodb://localhost:27017/typescript-poc', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
    if (!err) {
        console.log('MongoDB Connection Succeeded..');
    }
    else {
        console.log('Error in DB connection : ' + err);
    }
});
module.exports = mongoose2;
