import { useContext, useState, createContext } from "react";
import { loginService } from "../services/authServices.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (credentials) => {
        //make an axios request to the server to login
        //if the request succeeds and we get back a token, set authToken to that token

        // const { email, password } = credentials;
        try {
            const response = await loginService(credentials);
            setLoggedIn(true);
            setAuthToken(response.data.authToken);
            localStorage.setItem('authToken', authToken);
            return response;            
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleLogout = async () => {
        setLoggedIn(false);
        setAuthToken(null);
    }

    return(
        <AuthContext.Provider
        value={{ loggedIn, authToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}