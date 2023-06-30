import express from 'express';
import { UserController } from './user.controller';
import { zodUserValidation } from './user.validation';
import validationRequest from '../../middleware/validationRequest';

const router = express.Router();

router.post(
  '/create-user',
  validationRequest(zodUserValidation.createUserZodShcema),
  UserController.createUserController
);

export const userRouters = router;
