import { Router } from 'express';
const authRouter = Router();

authRouter.get('/register', (req, res) => res.render('register'));
authRouter.post('/register', (req, res) => res.redirect('/'));
authRouter.get('/login', (req, res) => res.render('login'));
authRouter.post('/login', (req, res) => res.redirect('/'));

export default authRouter;