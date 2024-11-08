import * as db from '../config/db.mjs'
import { mongoose } from 'mongoose';

export async function enroll(course_number, userId) {
    const courseId = new mongoose.Types.ObjectId(course_number);

    const existingEnrollment = await db.Enrollment.findOne({
        user: userId,
        course: courseId
    });

    if (existingEnrollment) {
        throw { message: "User is already enrolled" }
    } else {
        const enrollment = new db.Enrollment({
            user: userId,
            course: courseId
        });

        return await enrollment.save();
    }
}

export async function unenroll(course_number, userId) {
    const courseId = new mongoose.Types.ObjectId(course_number);

    const existingEnrollment = await db.Enrollment.findOne({
        user: userId,
        course: courseId
    });

    if (existingEnrollment) {
        await db.Enrollment.deleteOne({
            user: userId,
            course: courseId
        });
        return { message: "Enrollment removed successfully" };
    } else {
        throw { message: "User is not enrolled" }
    }
}