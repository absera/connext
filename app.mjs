import './src/config.mjs'
import express from 'express'
import session from 'express-session';
import path from 'path'
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo' // for persistent session storage

// ROUTES
import authRouter from './routes/auth.routes.mjs';
import coursesRouter from './routes/courses.routes.mjs';
import networkRouter from './routes/network.routes.mjs';
import userRouter from './routes/user.routes.mjs';
import chatRouter from './routes/chat.routes.mjs';

// INITIALIZATION
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DSN,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, // 14 days
    }),
}));

// ENGINE MIDDLEWARES
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// AUTH MIDDLEWARES
const publicPaths = ['/login', '/register']
app.use((req, res, next) => {
    if (!publicPaths.includes(req.path)) {
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
app.use(networkRouter);       // Routes for viewing user networks
app.use(userRouter);          // Routes for user profiles
app.use(chatRouter);          // Routes for chat list and messaging 

// START
app.listen(process.env.PORT || 3000);
