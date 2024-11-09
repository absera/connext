import { Router } from 'express';
import * as courseService from '../services/course.service.mjs';
import * as enrollmentService from '../services/enrollment.service.mjs';

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

// TOODO: discontinue single course view until i add more course information
// coursesRouter.get('/course/:course_id', async (req, res) => {
//     console.log(req.params.course_id)
//     const singleCourse = await courseService.getSingleCourse(req.params.course_id);
//     res.render('single-course', { user: req.session.user, singleCourse: singleCourse })
// });

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

coursesRouter.get('/courses/delete/:course_id', async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.course_id);
    } catch (error) {
        console.log("error occured while deleting a course", error)
    }
    res.redirect('/users/' + req.session.user.netid);

});

coursesRouter.get('/courses/join/:course_id', async (req, res) => {
    const userId = req.session.user._id;
    try {
        const enrolled = await enrollmentService.enroll(req.params.course_id, userId)
    } catch (error) {
        console.log("couldn't enrolled", error)
    }
    res.redirect('/users/' + req.session.user.netid)
});

coursesRouter.get('/courses/leave/:course_id', async (req, res) => {
    const userId = req.session.user._id;
    try {
        const enrolled = await enrollmentService.unenroll(req.params.course_id, userId)
    } catch (error) {
        console.log("couldn't unenrolled", error)
    }
    res.redirect('/users/' + req.session.user.netid)
});


export default coursesRouter;