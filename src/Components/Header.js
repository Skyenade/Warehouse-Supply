import React from "react";
import './Style.css';
import logo from './logo.jpg';
import { useLocation } from "react-router-dom";

const Header = ({ email, handleSignOut }) => {
    const location = useLocation();

    const showHeaderRight = location.pathname === "/" && email;

    return (
        <div className="header-container">
            <img src={logo} alt="Logo" className="logo-header" />
            <h2 className="header-title">Warehouse Management</h2>
            {showHeaderRight && (
                <div className="header-right">
                    <button onClick={handleSignOut} className="sign-out">Sign Out</button>
                    <div className="email-in-use">{email}</div>
                </div>
            )}
        </div>
    );
};

export default Header;
