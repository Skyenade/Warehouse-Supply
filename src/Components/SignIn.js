import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { auth } from "./firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import './Style.css'


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSingin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // await comes to async
            console.log(userCredential);
            navigate('/', { state: { email: userCredential.user.email } });
        } catch (error) {
            setError(error.message);
        }



    }

    return (
        <div className="container">

            <h1>Login</h1>
            <form onSubmit={handleSingin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required />
                <button type="submit">Login</button>

            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={() => navigate("/signup")} className="link-btn">
                You already dont have an account? Login here   </button>
        </div>
    );
};

export default SignIn;
