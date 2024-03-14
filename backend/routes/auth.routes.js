import express from 'express';
import { body } from 'express-validator';
import authControllers from '../controllers/auth.controller.js';
const authRouter = express.Router();

const {signup} = authControllers;
authRouter.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();
});

authRouter.post('/signup', [
    body(`email`).notEmpty().normalizeEmail({ gmail_remove_dots: false}).escape().isEmail(),
    body(`password`).notEmpty().escape()
], signup);



export default authRouter;