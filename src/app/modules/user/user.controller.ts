import { RequestHandler } from 'express';

import { UserService } from './user.service';

const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = await req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      massage: 'user create successfuly',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(400).json({
    //   error: err,
    //   // success: false,
    //   // massage: `faild to create user for this ${err} `,
    // });
  }
};

export const UserController = {
  createUserController,
};
