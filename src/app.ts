import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import globalErrrorHandler from './app/middleware/globalErrorHandler';
import routers from './app/routes/routesIndex';

const app: Application = express();

//cors setup
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routers
app.use('/api/v1', routers);
// app.use('/api/v1/user', UserRouters);
// app.use('/api/v1/academic-semester', academicSemesterRouters);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('this is for testing perpase');
// });

//global error handling
app.use(globalErrrorHandler);
//handle api not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    // statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'API Not found',
    errMessages: {
      path: req.originalUrl,
      message: 'This API not found on this website !',
    },
  });
  next();
});

export default app;
