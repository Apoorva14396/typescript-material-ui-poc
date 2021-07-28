import { Request, Response } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcryptPassword = require('bcrypt');
const User = require('../models/userModel');

const loginController = async (req: Request, res: Response) => {
  try {
    User.findOne(
      {
        email: req.body.email
      },
      async (err: any, user: any) => {
        if (!user) {
          res.status(200).send({ message: 'User not found', err: 'No user' });
        } else {
          const passwordMatch = await bcryptPassword.compare(req.body.password, user.password);
          if (!passwordMatch) {
            res.status(200).send({ message: "Password doesn't match", err: 'Wrong password' });
          } else {
            let token = jwt.sign({ user: user.email }, 'secret_key', {
              expiresIn: '24hr'
            });
            user.loginToken = token;
            user.save((err: any, user: any) => {
              if (err) {
                res.status(500).send();
              } else {
                res.status(200).send({ loginToken: token, message: 'Successful login', user: user });
              }
            });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = loginController;
