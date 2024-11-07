import * as db from '../db.mjs';
import bcrypt from 'bcryptjs';

const startAuthenticatedSession = (req, user) => {
    return new Promise((fulfill, reject) => {
        req.session.regenerate((err) => {
            if (!err) {
                req.session.user = user;
                fulfill(user);
            } else {
                reject(err);
            }
        });
    });
};

const endAuthenticatedSession = req => {
    return new Promise((fulfill, reject) => {
        req.session.destroy(err => err ? reject(err) : fulfill(null));
    });
};


const register = async (netid, firstName, lastName, email, password, karma, classYear) => {
    if (password.length > 5) {
        const matchedUser = await db.User.find({ netid: netid });
        if (matchedUser.length > 0) {
            throw { message: 'USERNAME ALREADY EXISTS' };
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const user = new db.User({ netid: netid, firstName: firstName, lastName: lastName, email: email, password: hash, karma: karma, classYear: classYear });
            if (await user.save()) {
                return user;
            }
        }

    } else {
        throw { message: 'USERNAME PASSWORD TOO SHORT' };
    }
};

const login = async (netid, password) => {
    const matchedUser = await db.User.find({ netid: netid });
    if (matchedUser.length === 0) {
        throw { message: "USER NOT FOUND" };
    } else if (bcrypt.compareSync(password, matchedUser[0].password)) {
        return matchedUser[0];
    } else {
        throw { message: "PASSWORDS DO NOT MATCH" };
    }
};

export {
    startAuthenticatedSession,
    endAuthenticatedSession,
    register,
    login
};
