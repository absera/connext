import { Router } from 'express';
const networkRouter = Router();

networkRouter.get('/network/:user_id', (req, res) => res.render('network', { user: req.session.user }));

export default networkRouter;
