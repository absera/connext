import { Router } from 'express';
const networkRouter = Router();

networkRouter.get('/network/:user_id', (req, res) => res.render('network', { data: ' ' }));

export default networkRouter;
