import { Request, Response } from 'express';
require('dotenv').config();

const User = require('../models/userModel');

const analyticsController = async (req: Request, res: Response) => {
  try {
    let result: any = [];
    User.aggregate([
      {
        $match: { role: 'user' }
      },
      {
        $project: {
          h: { $hour: '$createdAt' },
          sum: 1
        }
      },
      {
        $group: {
          _id: { hour: '$h' },
          count: { $sum: 1 }
        }
      }
    ]).exec(function (err: any, doc: any) {
      if (!err) {
        doc.map((d: any) => {
          result.push([`${JSON.stringify(d._id.hour)} hour`, d.count]);
          result.sort((a: any, b: any) => a[0].split(' ')[0] - b[0].split(' ')[0]);
        });
        result.unshift(['Hour', 'count']);
        res.status(200).send({ data: result });
      } else {
        res.status(200).send({});
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = analyticsController;
