import './config.mjs'
import express from 'express'
import session from 'express-session';
import path from 'path'
import { fileURLToPath } from 'url';

// ROUTES
import authRouter from './routes/auth.routes.mjs';
import coursesRouter from './routes/courses.routes.mjs';
import feedRouter from './routes/feed.routes.mjs';
import networkRouter from './routes/network.routes.mjs';
import userRouter from './routes/user.routes.mjs';
import chatRouter from './routes/chat.routes.mjs';

// INITIALIZATION
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// SESSION: TODO: use persistent session storage
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// ENGINE MIDDLEWARES
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// AUTH MIDDLEWARES
const authRequiredPaths = ['/', '/courses']
app.use((req, res, next) => {
    if (authRequiredPaths.includes(req.path)) {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

// ROUTE MIDDLEWARES
app.use(authRouter);          // Routes for authentication (register, login)
app.use(coursesRouter);       // Routes for course-related operations
app.use(feedRouter);          // Routes for main feed and homepage
app.use(networkRouter);       // Routes for viewing user networks
app.use(userRouter);          // Routes for user profiles
app.use(chatRouter);          // Routes for chat list and messaging 

// START
app.listen(process.env.PORT || 3000);
