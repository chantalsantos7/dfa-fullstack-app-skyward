import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import configDotenvPath from '../helpers/dotenv-config.js';
import User from '../models/user.model.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { signupUserService } from '../services/signup.services.js';

configDotenvPath();
const { loginServices } = authMiddleware;
const { generateJWT } = loginServices;


const validateRequest = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error(`Request validation failed`);
            err.data = errors.array();
            throw err;
        }
    }
    catch (err) {
        return res.status(422).send({ message: `Request validation failed`});
    }
    return;
}

const signupController = async (req, res) => {
    
    validateRequest(req, res);
    try {
        const user = await signupUserService(req.body);
        res.status(201).send({ message: `User was successfully created`});
        return;
    }
    catch (err) {
        res.status(500).send({message: `internal error is blocking user signup`, error: err});
        return;
    }
}

const loginController = async (req, res) => {

    validateRequest(req, res);

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            console.log(user);
            return res.status(404).send({ message: `User not found`});
        }
        
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatches) {
            return res.status(401).send( {
                message: `Unauthorised Access: Invalid password/email combination`,
                authToken: null
            })
        }

        const token = generateJWT(user);

        res.status(200).send({
            message: `Login successful`,
            authToken: token
        });
    }
    catch (err) {
        return res.status(500).send({ message: `internal error is blocking user login`, error: err });
    }

}

const authControllers = { signupController, loginController };
export default authControllers;