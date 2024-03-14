import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import configDotenvPath from '../helpers/dotenv-config.js';
import User from '../models/user.model.js';
import signupServices from '../middlewares/signupServices.js';

configDotenvPath();
const { encryptPassword } = signupServices;


const signup = async (req, res) => {
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

    const user = new User({
        email: req.body.email,
        password: await encryptPassword( req.body.password)
    })

    try {
        user.save();
        res.status(201).send({ email: user.email, message: `User was successfully created`});
        return;
    }

    catch (err) {
        res.status(500).send({message: err});
        return;
    }
}

const login = async (req, res) => {

}

const authControllers = { signup, login };
export default authControllers;