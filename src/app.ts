import cors from 'cors';
import express, { Application } from 'express';

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

//error handling by class

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('this is for testing perpase');
// });

//global error handling
app.use(globalErrrorHandler);

export default app;
