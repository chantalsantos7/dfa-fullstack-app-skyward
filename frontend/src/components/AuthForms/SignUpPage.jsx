import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./css/form-styling.css";
import { useSignup } from "../../hooks/useAuthHooks";

const SignUpPage = () => {
    
    //Sign up lives on this page - It is only needed once for each account, so no need to be available anywhere else - redirect to the login page after the account has been created

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await useSignup({ email, password });
        //redirect to login after successful signup
        // console.log(response);
        setEmailInUse(response.data.message === "Email already in use");
        if (response.status === 201) 
        {
            setSubmitted(true);
        }
    }

    const handleEmailChange = (e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isInvalidEmail = !emailRegex.test(e.target.value);
        setInvalidEmail(isInvalidEmail);
        if (!isInvalidEmail) setEmail(e.target.value);

    }

    const handlePasswordChange = (e) => {
    
        const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,20}$/;
        const isInvalidPassword = !passwordRegex.test(e.target.value);
        setInvalidPassword(isInvalidPassword);
        if (!isInvalidPassword) setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        // setConfirmPassword(e.target.value);
        const isInvalidConfirmPassword = password !== e.target.value;
        setInvalidConfirmPassword(isInvalidConfirmPassword);
        if (password === e.target.value) {
            setPassword(e.target.value);
        }
    }

    return (
        <>
        {submitted && <Navigate to='/login'/> }
            <div className="container mt-3 d-flex align-items-center justify-content-center">

                <div className="container">
                    <div className="card  d-flex justify-content-center">
                        <div className="card-body auth-form-card">
                            <h1 className=" card-title form-header">Create An Account</h1>
                            <form action="" className="signup-form" onSubmit={handleSubmit}>
                                <div className="form-outline mb-3">
                                    <input type="text" name="email" id="email" className="form-control" placeholder="email@address.com" onChange={handleEmailChange} required />
                                    {!!invalidEmail && <label htmlFor="">Invalid email address - please follow format 'username@domain.com' </label>}
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Password..." onChange={handlePasswordChange} required />
                                    {!!invalidPassword && <label htmlFor="password" className="invalid-input">Password must be at least 8 characters, should have at least 1 uppercase letter, 1 lowercase letter, and a number</label>}
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" name="confirm-password" id="confirm-password" className="form-control" placeholder="Confirm password..." onChange={handleConfirmPasswordChange} required />
                                    {!!invalidConfirmPassword && <label htmlFor="confirm-password" className="invalid-input">Passwords do not match</label>}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type="submit" value="Create Account" className="btn auth-form-btn" disabled = {invalidEmail || invalidPassword || invalidConfirmPassword} />
                                </div>
                            </form>
                            {!!emailInUse && <p className="error-text">Account could not be created - email is already in use - <a href="http://">login?</a> </p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage;