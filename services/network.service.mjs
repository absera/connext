import * as db from '../config/db.mjs';

export async function getDirectConnectedUsers(user_id) {
    const userCounter = {}; // keeps {user, count} map of direct connections

    const enrollments = await db.Enrollment.find({ user: user_id }).populate('course');

    for (const enrollment of enrollments) {
        const courseId = enrollment.course._id;

        const courseEnrollments = await db.Enrollment.find({ course: courseId }).populate('user');

        for (const courseEnrollment of courseEnrollments) {
            const enrolledUser = courseEnrollment.user;

            if (enrolledUser._id.toString() === user_id.toString()) continue; // dont count current user

            if (userCounter[enrolledUser._id]) {
                userCounter[enrolledUser._id]++;
            } else {
                userCounter[enrolledUser._id] = 1;
            }
        }
    }

    // create {id: count} array to be sorted and then populated 
    const userCountArray = Object.keys(userCounter).map(userId => ({
        userId,
        count: userCounter[userId],
    }));

    userCountArray.sort((a, b) => b.count - a.count);

    const topDirectConnections = userCountArray.slice(0, 15);

    // populate the map with actual user details and return
    const topDirectConnectionsDetails = await Promise.all(topDirectConnections.map(async (entry) => {
        const userDetails = await db.User.findById(entry.userId);
        return {
            user: userDetails,
            count: entry.count
        };
    }));

    return topDirectConnectionsDetails;
}
