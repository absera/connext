import { Router } from 'express';
import * as userServices from '../services/user.service.mjs'
import * as courseServices from '../services/course.service.mjs'
const userRouter = Router();

userRouter.get('/users/:user_net_id', async (req, res) => {
    const courses = await userServices.getEnrolledCourses(req.params.user_net_id)
    const courses_contributed = await courseServices.getContributedBy(req.params.user_net_id)
    const profiledUser = await userServices.getByNetid(req.params.user_net_id)
    res.render('user', { user: req.session.user, profiledUser: profiledUser, courses: courses, courses_contributed: courses_contributed })
});

userRouter.get('/users/', async (req, res) => {
    const courses = await userServices.getEnrolledCourses(req.session.user.netid)
    const courses_contributed = await courseServices.getContributedBy(req.session.user.netid)
    res.render('user', { user: req.session.user, profiledUser: req.session.user, courses: courses, courses_contributed: courses_contributed })
});

export default userRouter;
