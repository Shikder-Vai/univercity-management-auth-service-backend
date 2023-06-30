import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = await req.body;
    const result = await AcademicSemesterService.createSemesterService(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester create successfuly',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemesterController,
};

// res.status(200).json({
//   success: true,
//   massage: 'Academic Semester create successfuly',
//   data: result,
// });
