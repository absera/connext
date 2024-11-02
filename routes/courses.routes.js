import { Router } from 'express';
const coursesRouter = Router();

coursesRouter.get('/courses', (req, res) => res.render('courses', { data: '' }));
coursesRouter.get('/course/:course_number', (req, res) => res.render('single-course', { data: '' }));
coursesRouter.get('/courses/add', (req, res) => res.render('add-course'));
coursesRouter.post('/courses/add', (req, res) => res.redirect('/courses'));
coursesRouter.post('/courses/join/:course_number', (req, res) => res.redirect('/courses'));

export default coursesRouter;