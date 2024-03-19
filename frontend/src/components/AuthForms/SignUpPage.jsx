import "./css/form-styling.css";

const SignUpPage = () => {
    return (
        <>
            <div className="container mt-3 d-flex align-items-center justify-content-center">
                
                <div className="container">
                    <div className="card  d-flex justify-content-center">
                        <div className="card-body auth-form-card">
                        <h1 className=" card-title form-header">Create An Account</h1>
                            <form action="" className="signup-form">
                                <div className="form-outline mb-3">
                                    <input type="text" name="email" id="email" className="form-control"  placeholder="email@address.com" />
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Password..." />
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="confirm-password" id="confirm-password" className="form-control" placeholder="Confirm password..." />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type="submit" value="Create Account" className="btn auth-form-btn" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;