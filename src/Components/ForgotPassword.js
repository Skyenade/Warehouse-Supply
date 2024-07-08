import React from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Style.css';
import Header from './Header';

function ForgotPassword() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;

        console.log("Email:", emailVal); 
        try {
            await sendPasswordResetEmail(auth, emailVal);
            console.log("Email sent"); 
            alert("If you have an account, you will receive an email with instructions to change the password.");
            navigate('/signin');
        } catch (err) {
            console.log("Error:", err); 
            alert(err.code);
        }
    };

    return (
        <div className = 'container'>
            <Header/>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Enter your email" required />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
