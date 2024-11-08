import * as db from '../config/db.mjs';

export async function addCourse(courseData) {
    const newCourse = new db.Course(courseData);
    return await newCourse.save();
}

export async function getAllCourses() {
    const courses = await db.Course.find({});
    return courses;
}

export async function getSingleCourse(course_id) {
    const course = await db.Course.findOne({ _id: course_id });
    return course;
}

export async function getSearched(search_term) {
    const matchedCourses = await db.Course.find({
        $or: [
            { courseNumber: { $regex: search_term, $options: 'i' } },
            { courseName: { $regex: search_term, $options: 'i' } },
            { semester: { $regex: search_term, $options: 'i' } }
        ]
    });
    return matchedCourses;
}