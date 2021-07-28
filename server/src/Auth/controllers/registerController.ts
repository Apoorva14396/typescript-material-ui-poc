import { Request, Response } from 'express';

const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const saltRounds = 10;

const register = async (req: Request, res: Response) => {
  try {
    let hash: any, hash1: any;
    if (req.body.password && req.body.confirmPassword) {
      hash = await bcrypt.hash(req.body.password, saltRounds);
      hash1 = await bcrypt.hash(req.body.confirmPassword, saltRounds);
    } else {
      return res.status(401).send('No password entered');
    }

    var user = new UserModel({
      email: req.body.email,
      password: hash,
      confirmPassword: hash1,
      firstName: req.body.firstName,
      phone: req.body.phone,
      address: req.body.address,
      image: req.file.buffer,
      description: req.body.description,
      gender: req.body.gender,
      department: req.body.department,
      role: 'user'
    });

    user.save((err: any, doc: any) => {
      if (!err) {
        res.status(200).send({ message: 'Registered Successfully' });
      } else {
        res.status(400).send('Error in saving :' + JSON.stringify(err, undefined, 2));
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;
