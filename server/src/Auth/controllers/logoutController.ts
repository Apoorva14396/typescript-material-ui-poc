import { Request, Response } from 'express';

const User = require('../models/userModel');

const logoutController = async (req: Request, res: Response) => {
  try {
    User.findOne({ email: req.body.email }, (err: any, user: any) => {
      if (user) {
        user.loginToken = null;
        user.save();
        res.status(200).send('Logout Successfully');
      } else {
        res.status(400).send('User not found');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logoutController;
