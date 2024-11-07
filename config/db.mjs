import { mongoose } from 'mongoose'
import '../src/config.mjs'

mongoose.connect(process.env.DSN)

const userSchema = new mongoose.Schema({
    netid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => /^[a-zA-Z0-9._%+-]+@nyu.edu$/.test(v),
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // min length for passwords
    },
    classYear: {
        type: Number,
        required: true
    },
    karma: {
        type: Number,
        default: 0
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const courseSchema = new mongoose.Schema({
    // TODO below is commented for test purposes, uncomment and remove line below is
    // creatorId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    creatorId: {
        type: String,
    },
    courseNumber: {
        type: String,
        required: true,
        unique: true
    },
    semester: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    }
});


const enrollmentSchema = new mongoose.Schema({
    courseNumber: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

enrollmentSchema.index({ courseNumber: 1, semester: 1, userId: 1 }, { unique: true });


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: String,
        required: true,
        minlength: 1, // min length for messages
        maxlength: 500
    },
    timeSent: {
        type: Date,
        default: Date.now
    }
});


const activityFeedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: ['course created', 'new user joined your class']
    }
});


export const User = mongoose.model('User', userSchema);
export const Course = mongoose.model('Course', courseSchema);
export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export const Message = mongoose.model('Message', messageSchema);
export const ActivityFeed = mongoose.model('ActivityFeed', activityFeedSchema);