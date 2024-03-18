import { validationResult } from 'express-validator';
import configDotenvPath from '../helpers/dotenv-config.js';
import helperFunctions from '../helpers/helpers.js';
import { authenticateTokenService, changePasswordAuthenticatorService, changePasswordService, loginUserService, signupUserService,  } from '../services/auth.services.js';

const { validateRequest } = helperFunctions;

configDotenvPath();

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

const changePasswordAuthenticatorController = async (req, res) => {
try {
        const userId = await changePasswordAuthenticatorService(req.body);
        return res.status(200).send({ message: "User found", id: userId });
    }
    catch (err) {
        if (err.message === "User not found") {
            return res.status(404).send({ error: err.message });
        }
    }
}

const changePasswordController = async (req, res) => {
    validateRequest(req, res);
    const userId = req.params.id;
    console.log(`Simme's id: ${userId}`)
    try {
        await changePasswordService(userId, req.body.newPassword);
        return res.status(200).send({ message: `Password successfully updated` });
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }
}

const authenticateTokenController = async (req, res) => {
    // console.log("Route successful!");
    try {
        const token = await authenticateTokenService(req.body.authToken);
        // console.log(token.payload.id);
        return res.status(200).send({ message: "Token authenticated", userId: token.payload.id});
    }
    catch (err) {
        return res.status(400).send({ error: err.message });
    }

}

const authControllers = { signupController, loginController, changePasswordController, changePasswordAuthenticatorController, authenticateTokenController };
export default authControllers;