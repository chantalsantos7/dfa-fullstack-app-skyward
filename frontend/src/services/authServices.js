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