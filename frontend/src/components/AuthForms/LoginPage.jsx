import "./css/form-styling.css";
import { useLoginHandler } from "../../hooks/useAuthHooks.js";

const LoginPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        useLoginHandler();
    }

    return (
        <>
            <div className="container mt-3 d-flex align-items-center justify-content-center">

                <div className="container">
                    <div className="card  d-flex justify-content-center">
                        <div className="card-body auth-form-card">
                            <h1 className=" card-title form-header">Login</h1>
                            <form action="" className="login-form" onSubmit={handleSubmit}>
                                <div className="form-outline mb-3">
                                    <input type="text" name="email" id="email" className="form-control" placeholder="email@address.com" />
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Password..." />
                                </div>
                               
                                <div className="d-flex justify-content-center">
                                    <input type="submit" value="Login" className="btn auth-form-btn" />
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