import { Router } from 'express';
import * as courseService from '../services/course.service.mjs';

const coursesRouter = Router();

coursesRouter.get('/courses', async (req, res) => {
    try {
        const allCourses = await courseService.getAllCourses();
        console.log(allCourses);
        res.render('courses', {allCourses})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error while retrieving courses")
    }
});
coursesRouter.get('/course/:course_number', (req, res) => res.render('single-course', { data: '' }));
coursesRouter.get('/courses/add', (req, res) => res.render('add-course'));

coursesRouter.post('/courses/add', async (req, res) => {
    try {
        const creatorId = "req.session.userId";

        if (!creatorId) {
            return res.redirect('/login');
        }

        const courseData = {
            creatorId,
            courseNumber: req.body['course-number'],
            semester: req.body['semester'],
            courseName: req.body['course-name']
        };

        await courseService.addCourse(courseData);
        res.redirect('/courses');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while adding the course!');
    }
});

coursesRouter.post('/courses/join/:course_number', (req, res) => res.redirect('/courses'));

export default coursesRouter;