import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Style.css';
import Header from './Header';

const UserManagement = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate('/', { state: { email: userCredential.user.email } })
        } catch (error) {
            setError(error.message);
        }
    };


return (
    <div className='container'>
        <Header email={email} />
        <h1>User Management - New Users</h1>
        <form onSubmit={handleConfirm}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit'>Confirm</button>
        </form>
       
    </div>
);
}

export default UserManagement;

