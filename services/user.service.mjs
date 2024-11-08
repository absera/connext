import * as db from '../config/db.mjs'


export async function getEnrolledCourses(net_id) {
    const userObj = await db.User.findOne({
        netid: net_id
    });
    const enrolledCourses = await db.Enrollment.find({
        user: userObj._id
    }).populate('course').select('course');

    return enrolledCourses.map((elem) => {
        return elem.course
    })
}