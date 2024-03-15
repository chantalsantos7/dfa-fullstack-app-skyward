import User from "../models/user.model.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const { signupServices } = authMiddleware;
const { encryptPassword } = signupServices;

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