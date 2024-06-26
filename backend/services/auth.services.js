import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const { signupServices, loginServices, verificationMiddleware } = authMiddleware;
const { encryptPassword } = signupServices;
const { generateJWT } = loginServices;
const { verifyToken } = verificationMiddleware;

export const signupUserService = async (userData) => {

    const user = {
        email: userData.email,
        password: await encryptPassword(userData.password)
    };

    try {
        const newUser = new User(user);
        return await newUser.save();
    }
    catch (e) {
        throw e;
    }
}

export const loginUserService = async (userData) => {
    const user = await User.findOne({ email: userData.email }).exec();
    if (!user) {
        throw new Error(`User not found`);
    }

    const passwordMatches = await bcrypt.compare(userData.password, user.password);
    if (!passwordMatches) {
        throw new Error(`Unauthorised Access: Invalid password/email combination`);
    }

    const token = generateJWT(user);
    return token;
}

export const authenticateTokenService = async (token) => {
    try {
        return verifyToken(token);
    }
    catch (err) {
        throw err;
    }
}