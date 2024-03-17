import jwt from "jsonwebtoken";
import configDotenvPath from "../helpers/dotenv-config.js";

configDotenvPath();
const checkTokenFollowsFormat = (req, res, next) => {
    const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    const token = req.body.authToken;
    if (!jwtRegex.test(token)) {
        return res.status(422).send({ error: `Authentication token is not in correct format`} );
    }
    next();    
}

const verifyToken = (token) => {
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {complete: true});
        return decodedToken;
    }
    catch (err) {
        throw new Error(err);
    }
}

const verificationMiddleware = { checkTokenFollowsFormat, verifyToken };

export default verificationMiddleware;