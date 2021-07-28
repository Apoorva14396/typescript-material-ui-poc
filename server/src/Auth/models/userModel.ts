const mongoose1 = require('mongoose');
const schema = mongoose1.Schema;

var UserSchema = new schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    phone: { type: String },
    address: { type: String },
    loginToken: { type: String },
    role: { type: String },
    image: { type: Buffer },
    gender: { type: String },
    department: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose1.model('User', UserSchema);
