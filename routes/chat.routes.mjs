import { Router } from 'express';
const chatRouter = Router();

chatRouter.get('/chat', (req, res) => res.render('chat', { data: 'chat data' }));
chatRouter.get('/chat/:user_net_id', (req, res) => res.render('single_chat', { data: '' }));

export default chatRouter;
