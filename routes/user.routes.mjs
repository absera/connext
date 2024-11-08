import { Router } from 'express';
import * as userServices from '../services/user.service.mjs'
const userRouter = Router();

userRouter.get('/users/:user_net_id', async (req, res) => {
    const courses = await userServices.getEnrolledCourses(req.params.user_net_id)
    res.render('user', { user: req.session.user, courses: courses })
});

export default userRouter;
