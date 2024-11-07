import * as db from '../config/db.mjs';

export async function addCourse(courseData) {
    try {
        const newCourse = new db.Course(courseData);
        return await newCourse.save();
    }
    catch {
        throw { message: "Some error occured while adding a course!" }
    }
}

export async function getAllCourses() {
    try {
        const courses = await db.Course.find({});
        return courses;
    } catch (error) {
        throw { message: "Error retrieving all courses" };
    }
}

export async function getSingleCourse(course_id) {
    try {
        const course = await db.Course.findOne({ _id: course_id }).populate('creatorId');
        return course;
    } catch (error) {
        throw { message: "Error while retrieving course" }
    }
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