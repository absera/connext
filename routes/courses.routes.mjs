import { Router } from 'express';
import * as courseService from '../services/course.service.mjs';

const coursesRouter = Router();

// explore all courses in the databse
coursesRouter.get('/courses', async (req, res) => {
    try {
        const allCourses = await courseService.getAllCourses();
        res.render('courses', { allCourses: allCourses, user: req.session.user })
    } catch (error) {
        res.render('courses', { message: "Failed to load courses!" })
    }
});

coursesRouter.post('/courses', async (req, res) => {
    try {
        const matchedCourses = await courseService.getSearched(req.body.search_term);
        res.render('courses', { allCourses: matchedCourses, user: req.session.user, search_term: req.body.search_term })
    } catch {
        res.render('courses', { message: "Failed while retrieving courses" })
    }
})

coursesRouter.get('/course/:course_id', async (req, res) => {
    console.log(req.params.course_id)
    const singleCourse = await courseService.getSingleCourse(req.params.course_id);
    res.render('single-course', { user: req.session.user, singleCourse: singleCourse })
});

coursesRouter.get('/courses/add', (req, res) => {
    res.render('add-course', { user: req.session.user })
});

coursesRouter.post('/courses/add', async (req, res) => {
    try {
        const courseData = {
            creatorId: req.session.user._id,
            courseNumber: req.body['course-number'],
            semester: req.body['semester'],
            courseName: req.body['course-name']
        };

        await courseService.addCourse(courseData);
        res.redirect('/courses');
    } catch (error) {
        res.render('add-course', { user: req.session.user, message: 'Error while adding the course!' })
    }
});

coursesRouter.post('/courses/join/:course_number', (req, res) => {
    res.redirect('/courses')
});

export default coursesRouter;