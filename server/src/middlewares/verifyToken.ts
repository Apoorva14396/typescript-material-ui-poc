import { Request, Response } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req: Request, res: Response, next: any) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization;
    if (token === 'null') {
      return res.status(401).send('Unauthorized request');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET, (err: any, response: any) => {
      if (err) {
        return res.status(401).send('Unauthorized request');
      }
      // req.email = res.user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyToken;
