import { Router } from 'express';
const userRouter = Router();

userRouter.get('/users/:user_net_id', (req, res) => res.render('user', { user: 'user_net_id' }));

export default userRouter;
