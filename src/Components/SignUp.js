import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import './Style.css';
import Header from './Header';

const SignUp = ({setUserEmail }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await push(ref(database, 'currentEmails'), { email });
            setUserEmail(userCredential.user.email);
            
            if (email === "admin@gmail.com") {
                navigate('/homeadmin', { state: { email: userCredential.user.email } });
            } else {
                navigate('/homeuser', { state: { email: userCredential.user.email } });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container'>
            <Header email={email}/>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                <button type='submit'>Sign Up</button>
            </form>
            {error && <p className='error'>{error}</p>}
            <p className='link-btn' onClick={() => navigate("/signin")}>You already have an account? LogIn</p>
        </div>
    );
}

export default SignUp;
