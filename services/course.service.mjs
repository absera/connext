import * as db from '../db.mjs';

export async function addCourse(courseData) {
    const newCourse = new db.Course(courseData);
    return await newCourse.save();
}

export async function getAllCourses() {
    try {
        const courses = await db.Course.find({});
        return courses;
    } catch (error) {
        console.error("Error retrieving all courses:", error);
        throw error;
    }
}
