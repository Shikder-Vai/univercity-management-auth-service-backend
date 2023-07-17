import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../Helper/paginationHelper';
import ApiError from '../../../errors/apiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/paginationOption';
import {
  academicSemesterSearchableFields,
  academicSemesterTilesCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
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

const getAllSemesterService = async (
  fillter: IAcademicSemesterFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const { searchTerm, ...fillterData } = fillter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(fillterData).length) {
    andConditions.push({
      $and: Object.entries(fillterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  // {
  //   $expr: {
  //     $regexMatch: {
  //       input: { $toString: '$year' },
  //       regex: searchTerm,
  //       options: 'i',
  //     },
  //   },
  // },
  //     ],
  //   },
  // ];

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemesterService = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTilesCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid semester title or code!'
    );
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemesterService,
  getAllSemesterService,
  getSingleSemesterService,
  updateSemesterService,
  deleteSemesterService,
};
