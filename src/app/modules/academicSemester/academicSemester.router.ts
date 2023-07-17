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
router.get('/:id', AcademicSemesterController.getSingleSemesterController);
router.get('/', AcademicSemesterController.getAllSemesterController);

export const academicSemesterRouters = router;
