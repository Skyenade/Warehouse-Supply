import React from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;

        console.log("Email:", emailVal); 
        try {
            await sendPasswordResetEmail(auth, emailVal);
            console.log("Email sent"); 
            alert("Check your Email");
            navigate('/signin');
        } catch (err) {
            console.log("Error:", err); 
            alert(err.code);
        }
    };

    return (
        <div>
            <h1><b>Forgot Password</b></h1>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" required />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
