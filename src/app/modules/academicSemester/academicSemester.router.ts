import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { zodAcademicSemesterValidation } from './academicSemester.Validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(
    zodAcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.createSemesterController
);

export const academicSemesterRouters = router;
