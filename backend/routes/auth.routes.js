import express from 'express';
import { body } from 'express-validator';
import authControllers from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

const { signupController, loginController, changePasswordController, changePasswordAuthenticatorController, authenticateTokenController } = authControllers;
const { signupServices, verificationMiddleware } = authMiddleware;

authRouter.post('/signup', [
    body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail(),
    body(`password`).notEmpty().escape(),
    signupServices.checkDuplicateEmail
], signupController);

authRouter.post('/login', [
    body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail(),
    body(`password`).notEmpty().escape()
], loginController);

//First need to authenticate the user email and get their id, to update the password
authRouter.post(`/password-change`, [
    body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail()
], changePasswordAuthenticatorController);

authRouter.patch(`/password-change/user/:id`, [
    body(`newPassword`).notEmpty().escape()
], changePasswordController);

authRouter.post(`/check-verification`, [
    body(`authToken`).notEmpty(),
    verificationMiddleware.checkTokenFollowsFormat
], authenticateTokenController);

export default authRouter;