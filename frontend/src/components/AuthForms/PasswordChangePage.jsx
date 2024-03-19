const PasswordChangePage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className="container mt-3 d-flex align-items-center justify-content-center">

            <div className="container">
                <div className="card  d-flex justify-content-center">
                    <div className="card-body auth-form-card">
                        <h1 className=" card-title form-header">Change Password</h1>
                        <form action="" className="signup-form" onSubmit={handleSubmit}>
                            <div className="form-outline mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="New password..." />
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
    )
}

export default PasswordChangePage