import { useContext, useState, createContext } from "react";
import { loginService } from "../services/authServices.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const handleLogin = async (credentials) => {
        //make an axios request to the server to login
        //if the request succeeds and we get back a token, set authToken to that token

        // const { email, password } = credentials;
        try {
            const response = await loginService(credentials);
            console.log(`logged in from authContext`);
            setAuthToken(response.data.authToken);
            return response;            
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleLogout = async () => {
        setAuthToken(null);
    }

    return(
        <AuthContext.Provider
        value={{ authToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}