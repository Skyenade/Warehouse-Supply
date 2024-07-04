import React, { useState } from "react";
import './Style.css';
import logo from './logo.jpg';
import { useNavigate } from "react-router-dom";

const Home = ({ email, setEmail }) => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    const handleSignOut = () => {
        setEmail("");
        navigate('/');
    };

    return (
        <div className="home-container">
            <div>
                <img src={logo} alt="Logo" className="logo-home" />
                <button onClick={handleSignIn} className="home-buttons">Sign In</button>
                <p onClick={handleSignUp} className="home-text">Don't have an account?</p>
                <button onClick={handleSignUp} className="home-buttons">Sign Up</button>
            </div>
        </div>
    );
};

export default Home;
