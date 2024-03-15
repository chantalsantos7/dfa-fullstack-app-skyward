import jwt from 'jsonwebtoken';
import configDotenvPath from '../helpers/dotenv-config.js';

configDotenvPath();
const generateJWT = (user) => {

    const tokenPayload = {
        id: user._id
    }

    return jwt.sign(tokenPayload, process.env.JWT_SECRET, {expiresIn: `2d`});
}

const loginServices = { generateJWT };

export default loginServices;