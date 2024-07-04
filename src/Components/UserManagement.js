import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ref, set, get, child } from 'firebase/database';
import { database } from '../firebase';
import './Style.css';
import Header from './Header';

const UserManagement = ({ email, setEmail }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [bannedEmail, setBannedEmail] = useState("");

    const handleBanUser = async (e) => {
        e.preventDefault();
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `currentEmails`));
            
            if (snapshot.exists()) {
                const currentEmails = snapshot.val();
                const emailList = Object.values(currentEmails).map(item => item.email);

                if (emailList.includes(bannedEmail)) {
                    await set(ref(database, 'bannedUsers/' + bannedEmail.replace('.', '_')), { email: bannedEmail });
                    console.log("User banned");
                    setError("User banned successfully.");
                } else {
                    setError("The email doesn't exist.");
                }
            } else {
                setError("No currentEmails list found.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignOut = () => {
        setEmail("");
        navigate('/');
    };

    return (
        <div className='container'>
            <Header email={email} handleSignOut={handleSignOut} />
            <h1>User Management - Ban Users</h1>
            <form onSubmit={handleBanUser}>
                <input
                    type='email'
                    value={bannedEmail}
                    onChange={(e) => setBannedEmail(e.target.value)}
                    placeholder='Email'
                    required
                />
                <button type='submit'>Ban User</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default UserManagement;
