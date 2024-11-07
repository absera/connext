import { Router } from 'express';
const feedRouter = Router();

feedRouter.get('/', (req, res) => res.redirect('/feed'));
feedRouter.get('/feed', (req, res) => res.render('feed', { data: ' ', user: req.session.user }));

export default feedRouter;
