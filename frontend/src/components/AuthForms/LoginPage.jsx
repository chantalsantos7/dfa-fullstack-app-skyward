import "./css/form-styling.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFaves } from "../../contexts/FavesContext";

const LoginPage = () => {
    const { authToken, handleLogin } = useAuth();
    const { getSavedFavourites } = useFaves();
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(loginCredentials);
        // if (authToken) {
        //     getSavedFavourites(authToken);
        // }
    }

    const handleChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value});
    }

    return (
        <>
            {!!authToken && <Navigate to='/'/>}
            <div className="container mt-3 d-flex align-items-center justify-content-center">

                <div className="container">
                    <div className="card  d-flex justify-content-center">
                        <div className="card-body auth-form-card text-center">
                            <h1 className=" card-title form-header">Login</h1>
                            <form action="" className="login-form" onSubmit={handleSubmit}>
                                <div className="form-outline mb-3">
                                    <input 
                                        type="text" 
                                        name="email" 
                                        id="email" 
                                        // value={loginCredentials.email}
                                        className="form-control" 
                                        placeholder="email@address.com" 
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-outline mb-3">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        // value={loginCredentials.password}
                                        className="form-control" 
                                        placeholder="Password..." 
                                        onChange={handleChange}
                                    />
                                </div>
                               
                                <div className="d-flex justify-content-center">
                                    <input 
                                        type="submit" 
                                        value="Login" 
                                        className="btn auth-form-btn" 
                                    />
                                </div>
                            </form>
                            <div className="container mt-3">
                                <Link to={"/signup"} >Sign up for an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage