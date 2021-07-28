const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

/* Please enter email password provided by client */

const admin = {
  email: 'admin@admin.com',
  password: 'admin@1234',
  role: 'admin'
};

function seeder() {
  bcrypt.hash(admin.password, 10, (err: any, hash: any) => {
    if (err) {
      return false;
    }
    const user = new UserModel({
      _id: mongoose.Types.ObjectId(),
      email: admin.email,
      password: hash,
      role: admin.role
    });

    user.save().then((result: any) => {
      return true;
    });
  });
}

module.exports = seeder;
