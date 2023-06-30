import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { academicSemesterTilesCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemesterService = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTilesCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const resutl = await AcademicSemester.create(payload);
  return resutl;
};

export const AcademicSemesterService = {
  createSemesterService,
};
