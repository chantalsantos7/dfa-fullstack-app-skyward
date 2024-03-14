import express from 'express';
import { body } from 'express-validator';
import authControllers from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

const { signup, login } = authControllers;
const { signupServices } = authMiddleware;

authRouter.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();
});

authRouter.post('/signup', [
    body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail(),
    body(`password`).notEmpty().escape(),
    signupServices.checkDuplicateEmail
], signup);

// authRouter.post('/login', [
//     body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail(),
//     body(`password`).notEmpty().escape()
// ], login);

export default authRouter;