import { validationResult } from 'express-validator';
import configDotenvPath from '../helpers/dotenv-config.js';
import { loginUserService, signupUserService, } from '../services/auth.services.js';

configDotenvPath();
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
        return res.status(422).send({ message: `Request validation failed` });
    }
    return;
}

const signupController = async (req, res) => {

    validateRequest(req, res);
    try {
        const user = await signupUserService(req.body);
        res.status(201).send({ message: `User was successfully created` });
        return;
    }
    catch (err) {
        res.status(500).send({ message: `internal error is blocking user signup`, error: err });
        return;
    }
}

const loginController = async (req, res) => {

    validateRequest(req, res);

    try {
        const token = await loginUserService(req.body);
        res.status(200).send({
            message: `Login successful`,
            authToken: token
        });

    }
    catch (err) {
        if (err.message === `User not found`) {
            return res.status(404).send({ message: err.message });
        }
        if (err.message === `Unauthorised Access: Invalid password/email combination`)
        {
            return res.status(401).send( {
                message: err.message,
                authToken: null
            })
        }
        return res.status(500).send({ message: `internal error is blocking user login`, error: err.message });
    }

}

const authControllers = { signupController, loginController };
export default authControllers;