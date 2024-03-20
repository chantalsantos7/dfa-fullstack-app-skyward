import "./css/form-styling.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const LoginPage = () => {
    const { handleLogin } = useAuth();
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(loginCredentials);
    }

    const handleChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value});
    }

    //TODO: navigate to HomePage if logged in/authToken has been set
    return (
        <>
        
            <div className="container mt-3 d-flex align-items-center justify-content-center">

                <div className="container">
                    <div className="card  d-flex justify-content-center">
                        <div className="card-body auth-form-card">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage