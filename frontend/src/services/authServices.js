import axios from "axios";

export const loginService = async (credentials) => {
    const LOGIN_ROUTE = `http://localhost:5000/auth/login`;
    
    try {
        // console.log("reached login service");
        const response = await axios.post(LOGIN_ROUTE, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}

export const verifyTokenService = async (authToken) => {
    const VERIFICATION_ROUTE = `http://localhost:5000/auth/check-verification`;

    try {
        const response = await axios.post(VERIFICATION_ROUTE, authToken, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}