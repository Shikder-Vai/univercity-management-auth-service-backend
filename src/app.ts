import cors from 'cors';
import express, { Application } from 'express';

import globalErrrorHandler from './app/middleware/globalErrorHandler';
import { UserRouters } from './app/modules/user/user.router';

const app: Application = express();

//cors setup
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user routers
app.use('/api/v1/user', UserRouters);

//error handling by class

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('this is for testing perpase');
// });

//global error handling
app.use(globalErrrorHandler);

export default app;
