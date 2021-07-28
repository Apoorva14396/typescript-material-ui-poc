import { Request, Response } from 'express';

require('dotenv').config();

const User = require('../models/userModel');

const analyticsController = async (req: Request, res: Response) => {
  try {
    User.aggregate([
      {
        $match: { role: 'user' }
      },

      { $group: { _id: { department: '$department', gender: '$gender' }, count: { $sum: 1 } } }
    ]).exec(function (err: any, doc: any) {
      if (!err) {
        let result: any = {},
          result1 = [];
        doc.map((t: any) => {
          if (!result[t._id.department]) {
            result[t._id.department] = [];
            result[t._id.department].push(t._id.department);
            result[t._id.department].push(t._id.gender === 'male' ? t.count : 0);
            result[t._id.department].push(t._id.gender === 'female' ? t.count : 0);
          } else {
            result[t._id.department];
            if (t._id.gender == 'male') {
              result[t._id.department][1] = t.count;
            } else if (t._id.gender == 'female') {
              result[t._id.department][2] = t.count;
            }
          }
        });
        result1 = Object.values(result);
        result1.unshift(['Department', 'Male', 'Female']);
        res.status(200).send({ data: result1 });
      } else {
        res.status(200).send({});
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = analyticsController;
