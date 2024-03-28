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

authRouter.post(`/check-verification`, [
    body(`authToken`).notEmpty(),
    verificationMiddleware.checkTokenFollowsFormat
], authenticateTokenController);

export default authRouter;