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
        if (error.message == 'USERNAME ALREADY EXISTS') {
            res.render('register', { message: 'Failed: NetID already registered' })
        } else {
            res.render('register', { message: "Registration Failed!" })
        }
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
        if (error.message == 'USER NOT FOUND') {
            res.render('login', { message: "Login Failed: NetID not Registered" })
        } else if (error.message == 'PASSWORDS DO NOT MATCH') {
            res.render('login', { message: 'Login Failed: Incorrect Password' })
        } else {
            res.render('login', { message: "Login Failed!" })
        }
    }

});

authRouter.get('/logout', (req, res) => {
    auth.endAuthenticatedSession(req);
    res.redirect('login')
});

export default authRouter;