import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const encryptPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (e) {
        throw new Error(e);
    }
}

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            res.status(400).send({ message: `Email already in use` });
            return;
        }
    }
    catch (err) {
        return res.status(500).send({ message: err });
    }
    next();
}

const signupServices = { encryptPassword, checkDuplicateEmail };

export default signupServices;