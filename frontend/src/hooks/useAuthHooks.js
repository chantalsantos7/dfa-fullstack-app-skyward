import axios from 'axios';
import dotenv from 'dotenv';
// import { configDotenvPath } from '../utils/helpers.js';

// configDotenvPath();

export const useSignup = async (credentials) => {
    const { email, password } = credentials;
    const signupRoute = "http://localhost:5000/auth/signup";
    console.log(email);
    console.log(password)
    // console.log(process.env.NODE_ENV);
    //Send a request using axios to the server, creating the account;
    try {
        const response = await axios.post(signupRoute, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
    }
    catch (err) {
        if (err.response) {
            console.log(err.response.data);
            return err.response;
        }
        throw err;
        // console.error(err);
    }
}