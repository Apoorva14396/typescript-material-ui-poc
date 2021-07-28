import { Request, Response } from 'express';

const User = require('../../Auth/models/userModel');

const getUser = async (req: Request, res: Response, next: any) => {
  try {
    let findUser = await User.findOne({ _id: req.params.id });
    if (findUser) {
      return res.status(200).send(findUser);
    } else {
      return res.status(400).send('No user found.');
    }
  } catch (error) {
    console.log(error);
    res.send('User not found');
  }
};

const updateUser = async (req: Request, res: Response, next: any) => {
  try {
    let result;
    if (req.file === undefined) {
      delete req.body.image;
      result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body } },
        { upsert: true, new: true },
        (error: any, obj: any) => {
          if (!error) {
            console.log(obj);
          }
        }
      );
    } else {
      result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { ...req.body, image: req.file.buffer } },
        { upsert: true, new: true },
        (error: any, obj: any) => {
          if (!error) {
            console.log(obj);
          }
        }
      );
    }

    if (result) {
      return res.status(200).send({ message: 'User updated successfully.' });
    } else return res.status(400).send({ message: 'Cannot update' });
  } catch (error) {
    return next(error);
  }
};
const deleteUser = async (req: Request, res: Response, next: any) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id }, (error: any, obj: any) => {
      if (!error) {
        return res.status(200).send({ message: 'User deleted successfully.' });
      } else {
        return res.status(400).send({ message: 'Cannot delete' });
      }
    });
  } catch (error) {
    return next(error);
  }
};
const getAllUsers = async (req: Request, res: Response, next: any) => {
  try {
    let findUsers = await User.find({});
    if (findUsers.length) {
      return res.status(200).send(findUsers.filter((f: any) => f.role !== 'admin'));
    } else {
      return res.status(400).send('No user found.');
    }
  } catch (error) {
    console.log(error);
    res.send('User not found');
  }
};

module.exports = { getUser, updateUser, deleteUser, getAllUsers };
