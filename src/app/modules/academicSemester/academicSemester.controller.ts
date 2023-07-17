import { Request, Response } from 'express';

import httpStatus from 'http-status';
import { paginationFields } from '../../../constans/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFillterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
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

const getAllSemesterController = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFillterableFields);
  const paginationOption = pick(req.query, paginationFields);

  // console.log(paginationOption);
  const result = await AcademicSemesterService.getAllSemesterService(
    filters,
    paginationOption
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester Retrive Successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemesterController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemesterService(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Retrive Successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemesterController,
  getAllSemesterController,
  getSingleSemesterController,
};

// res.status(200).json({
//   success: true,
//   massage: 'Academic Semester create successfuly',
//   data: result,
// });
