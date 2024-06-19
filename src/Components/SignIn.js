import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Style.css';
import Header from "./Header";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate('/', { state: { email: userCredential.user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <Header email={email}/>
            <h1>Login</h1>
            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={() => navigate("/signup")} className="link-btn">
                You don't have an account? Sign up here
            </button>
        </div>
    );
};

export default SignIn;
