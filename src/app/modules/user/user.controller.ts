import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { user } = await req.body;
  const result = await UserService.createUser(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user create successfuly',
    data: result,
  });
});

export const UserController = {
  createUserController,
};

/*catch (err) {
  next(err);
   res.status(400).json({
     error: err,
      success: false,
      massage: `faild to create user for this ${err} `,
   });
}*/
