import { validationResult } from "express-validator";

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

const helperFunctions = { validateRequest };
export default helperFunctions;