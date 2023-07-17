/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/apiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

const globalErrrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('🚀GlobalErrorHandler', error)
    : errorLogger.error('🚀GlobalErrorHandler', error);

  let statusCode = 500;
  let message = 'somthing went worng';
  let errMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiError = handleValidationError(error);
    statusCode = simplifiError.statusCode;
    message = simplifiError.message;
    errMessages = simplifiError.errMessages;
  } else if (error instanceof ZodError) {
    const simplifiError = handleZodError(error);
    statusCode = simplifiError.statusCode;
    message = simplifiError.message;
    errMessages = simplifiError.errMessages;
  } else if (error?.name === 'CastError') {
    const simplifiError = handleCastError(error);
    statusCode = simplifiError.statusCode;
    message = simplifiError.message;
    errMessages = simplifiError.errMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });
  next();
};

export default globalErrrorHandler;
