import express from 'express';
import { academicSemesterRouters } from '../modules/academicSemester/academicSemester.router';
import { userRouters } from '../modules/user/user.router';

const router = express.Router();

const modulesRouters = [
  {
    path: '/user',
    route: userRouters,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouters,
  },
];

modulesRouters.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRouters);
// router.use('/academic-semester', academicSemesterRouters);

export default router;
