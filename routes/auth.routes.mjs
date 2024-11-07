import { Router } from 'express';
import * as auth from '../services/auth.service.mjs'

const authRouter = Router();

authRouter.get('/register', (req, res) => {
    res.render('register')
});

authRouter.post('/register', async (req, res) => {
    try {
        const netId = req.body.net_id;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const classYear = req.body.class_year;
        const karma = 0;

        const newUser = await auth.register(netId, firstName, lastName, email, password, karma, classYear);
        await auth.startAuthenticatedSession(req, newUser);
        res.redirect('/')
    } catch (error) {
        console.log("REGISTERATION FAILED!", error)
        res.render('register')
    }
});

authRouter.get('/login', (req, res) => {
    res.render('login')
});

authRouter.post('/login', async (req, res) => {
    try {
        const netId = req.body.net_id;
        const password = req.body.password;

        const user = await auth.login(netId, password)
        await auth.startAuthenticatedSession(req, user);
        res.redirect('/')
    } catch (error) {
        console.log("LOGIN FAILED!", error)
        res.render('login')
    }

});

export default authRouter;